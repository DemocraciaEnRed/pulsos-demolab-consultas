import React from 'react'
import { Link } from 'react-router'
import urlBuilder from 'lib/backend/url-builder'
import forumStore from 'ext/lib/stores/forum-store/forum-store'
import ComunidadContainer from '../comunidad-container/component'
import Flickity from 'ext/node_modules/flickity'

Flickity.prototype._createResizeClass = function() {
  this.element.classList.add('flickity-resize');
};

Flickity.createMethods.push('_createResizeClass');

const resize = Flickity.prototype.resize;
Flickity.prototype.resize = function() {
  this.element.classList.remove('flickity-resize');
  resize.call( this );
  this.element.classList.add('flickity-resize');
};

class Comunidades extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 0,
      activeFilter: 'byDate',
      forums: [],
      selected: null,
      loading: null,
      options: {
        cellAlign: 'center',
        draggable: false,
        // wrapAround: true,
        contain: true,
        pageDots: false,
        groupCells: window.matchMedia('(min-width: 1024px)').matches ? 3 : 1,
        autoPlay: false,
        adaptiveHeight: true
      }
    }
    this.flkty = null
  }

  componentWillMount = () => {
    console.log('-----------')
    const {
      activeFilter
    } = this.state
    if (this.flkty) this.flkty.destroy()
    forumStore
      .findAll()
      .then((forums) => {
        this.setState({
          forums,
          // las páginas son de a 3 (definido en ext/lib/api/filter.js), entonces si devuelve 3, tal vez hay más
          showMore: forums.length === 3
        })
        this.flkty = new Flickity(this.refs.carruselComunidades, this.state.options)
        this.flkty.resize();
      })
      .catch(console.error)
  }

  componentWillUnmount () {
    if (this.flkty) this.flkty.destroy()
  }

  selectForum = (index) => {
    this.setState({
      selected: index
    })
  }

  render () {
    let { forums, selected } = this.state
    return (
      <div>
        <section className="intro-comunidades bg-primary">
          <div className="container">
            <div className='row'>
              <div className='col-lg-4'>
                <img className="logo" src="/lib/frontend/site/home-multiforum/logo-footer.svg" alt="Deliberata" />
              </div>
              <div className='col-lg-8'>
                <h2 className='text-center'>Comunidades activas</h2>
                <p className="text-justify">Las Comunidades Activas están compuestas por diversos liderazgos de Buenaventura, que construyen propuestas para el territorio de manera colaborativa. Puedes interactuar con estas propuestas votando, apoyando, participando en las encuestas, comentando y compartiendo en tus redes sociales.</p> 
                <p className="text-center">¡Participa en DeliberaTura!</p>
                {/* <img className="arrow-rotate" src="lib/frontend/site/home-multiforum/right-arrow.svg" alt="Flecha" /> */}
              </div>
            </div>
          </div>
        </section>
        <section id="comunidades" className="bg-inverse">
          <div className="container">
            <div className='row'>
              <div className="col-lg-12">
                <div className={`${true ? 'comunidades-carousel' : ''} ${forums.length == 0 ? 'hidden-xs-up' : ''}`} ref='carruselComunidades'>
                  {
                    forums.map( (forum, index) =>  <div className='comunidad-col col-lg-3 col-md-4 col-sm-6 col-xs-12' key={index}>
                      <div className={`comunidad-carousel-item ${index === selected && 'selected'}`} onClick={() => this.selectForum(index)} >
                        <h4>{forum.title}</h4>
                        <div className="icon-wrapper">
                          <img src={forum.extra.iconUrl} alt={forum.title} className='img'/>
                        </div>
                      </div>
                    </div>)
                  }
                </div>
                {
                  forums.length == 0 && <p className='text-center'>No hay comunidad seleccionada!</p>
                }
              </div>
            </div>
          </div>
          {
            selected !== null && <ComunidadContainer forum={forums[selected]} />
          }
        </section>
      </div>
    )
  }
}

export default Comunidades
