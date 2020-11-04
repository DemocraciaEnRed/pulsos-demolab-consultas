import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Link } from 'react-router'
import Jump from 'jump.js'
import userConnector from 'lib/frontend/site/connectors/user'
import config from 'lib/config'
import Footer from 'lib/frontend/site/footer/component'
import forumStore from 'ext/lib/stores/forum-store/forum-store'
import ForumContainer from './forum-container/component'
import ForumCard from './forum-card/component'
import Search from './search/component'
import Comunidades from 'lib/frontend/site/home-multiforum/comunidades/component'
import Topics from 'lib/frontend/site/home-multiforum/topics-container/component'

class HomeMultiForum extends Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,
      activeFilter: 'byDate',
      forums: []
    }
  }

  componentDidMount () {
    const {
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter)
      .then((forums) => {
        this.setState({
          forums,
          // las páginas son de a 3 (definido en ext/lib/api/filter.js), entonces si devuelve 3, tal vez hay más
          showMore: forums.length === 3
        })
      })
      .catch(console.error)
  }

  handleClick = (name) => {
    const { page } = this.state;

    forumStore
      .filterBy(name)
      .then((forums) => {
        this.setState({
          page,
          forums,
          activeFilter: name
        })
      })
      .catch(console.error)
  }

  handleMoreClick = () => {
    const {
      page,
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter, page + 1)
      .then((forums) => {
        this.setState({
          page: this.state.page + 1,
          forums: [...this.state.forums, ...forums],
          showMore: forums.length === 3
        });
      })
      .catch(console.error)
  }

  handleButtonClick = () => {
    Jump('#consultas')
    // const consultasNode = ReactDOM.findDOMNode(this.refs.consultas)
    // window.scrollTo(0, consultasNode.offsetTop)
  }

  render () {
    if (this.props.user.state.pending) return null

    const {
      showMore,
      activeFilter,
      forums
    } = this.state

    return (
      <div className='ext-site-home-multiforum'>
        <section
          className='cover jumbotron'
          style={{
            backgroundImage: `url('${config.imgs.backgroundHome}')`
          }}>
          <div className='jumbotron_body'>
            <div className='container'>
              <img
                src={config.imgs.logoCentralHome}
                alt="Logo"
                width="270px"
              />
              <span className='lead block'>Concejo Abierto e Innovador</span>
              <br />
              <p className='lead highlight'>
                {config.bajadaPlataforma}
              </p>
              <button
                className='btn btn-participa'
                onClick={this.handleButtonClick}
              >
                Participa e Incide
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className='container'>
            <div className='row'>        
              <div className='section-icons col-md-10 offset-md-1'>
                <div className='row'>
                  <div className='section-icon col-md-4'>
                    <img
                      className='icon'
                      src={`/lib/frontend/site/home-multiforum/icono-propuesta.png`} 
                      alt='Proponer'
                    />
                    <div className='text'>
                      <h5>Proponer</h5>
                      <p>En la plataforma se abren convocatorias por temas. Aquí podrás presentar tus propuestas e iniciativas para ser escuchado/a y aportar a Bogotá.</p>
                    </div>
                  </div>
                  <div className='section-icon col-md-4'>
                  <img
                      className='icon'
                      src={`/lib/frontend/site/home-multiforum/icono-vota.png`} 
                      alt='Votar'
                    />
                    <div className='text'>
                      <h5>Votar</h5>
                      <p>Esta acción te permite votar por las propuestas que se desarrollan en el Concejo de Bogotá: Afirmativo, Negativo y Abstención.</p>
                    </div>
                  </div>
                  <div className='section-icon col-md-4'>
                <img
                    className='icon'
                    src={`/lib/frontend/site/home-multiforum/icono-prioriza.png`}
                    alt='Priorizar'
                  />
                  <div className='text'>
                    <h5>Priorizar</h5>
                    <p>Podrás decidir cuál tema se debe debatir primero en el Concejo de Bogotá.</p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Comunidades />
        <Topics />
        {/* <div className='container forums-list' id='consultas'>
          <h2 className='forums-list-title'>Propuestas Recientes</h2>
          
          <Search />
          
          <div className="filter-container content-center">
            <div className="btn-group btn-group-sm dropdown-element" role="group" aria-label="Filtros">
            <button
                className={`btn dropbtn ${activeFilter === 'byDate' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byDate')}
              >
              {(() => {
                switch(this.state.activeFilter) {
                  case 'byDate':
                    return  'Nuevas'
                  case 'byPopular':
                    return 'Mayor participación'
                  case 'byClosed':
                    return 'Finalizadas'
                  }
              })()}
              </button>
            <ul className='dropdown-content'>
              <li
                className={`btn btn-item-dropdown ${activeFilter === 'byDate' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byDate')}
              >
                Nuevas
              </li>
              <li
                className={`btn btn-item-dropdown ${activeFilter === 'byPopular' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byPopular')}
              >
                Mayor participación
              </li>
              <li
                className={`btn btn-item-dropdown ${activeFilter === 'byClosed' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byClosed')}
              >
                Finalizadas
              </li></ul>
            </div>
          </div>


          {!forums.length && <h3 className="no-result content-center">No hay resultados</h3>}

          {!!forums.length && forums.map((forum, key) => (
            <ForumContainer forum={forum} key={forum.id} />
          ))}
          {!!forums.length && showMore &&
            <div className='row content-center'>
              <button className="btn btn-active show-more" onClick={this.handleMoreClick}>
                Cargar más consultas
              </button>
            </div>
          }
        </div> */}
        <Footer />
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)
