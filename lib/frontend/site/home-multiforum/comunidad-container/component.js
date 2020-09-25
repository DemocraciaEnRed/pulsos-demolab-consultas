import React from 'react'
import { Link } from 'react-router'
import Flickity from 'ext/node_modules/flickity'
import urlBuilder from 'lib/backend/url-builder'
import forumStore from 'lib/frontend/stores/forum-store/forum-store'
import topicStore from 'lib/frontend/stores/topic-store/topic-store'
import TopicCard from './topicCard'

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

class ComunidadContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topics: [],
      loading: null,
      forumInfo: null,
      options: {
        cellAlign: 'center',
        draggable: false,
        // wrapAround: true,
        contain: false,
        pageDots: false,
        groupCells: window.matchMedia('(min-width: 1024px)').matches ? 3 : 1,
        autoPlay: true,
        adaptiveHeight: false,
      }
    }
    this.flkty = null
  }

  componentWillMount = () => {
    console.log('Mounted, now fetch topics!')
    this.fetchTopics(this.props.forum)
  }

  componentWillReceiveProps = ({forum}) => {
    console.log('Updated! now fetch topics!')
    this.setState({
      loading: true
      }, this.fetchTopics(forum))
  }

  componentWillUnmount () {
    if (this.flkty) this.flkty.destroy()
  }

  fetchTopics = (forum) => {

    console.log('-- fetch topics!')
    console.log('-- ', forum.name)
    console.log('-- ', forum.id)
    if (this.flkty) this.flkty.destroy()
    this.setState({
      loading: true
    })
    Promise.all([
      forumStore.findOneByName(forum.name),
      topicStore.findAll({ forum: forum.id })
    ]).then(([forum, topics]) => {
      console.log('forum', forum)
      console.log('topics', topics)
      this.setState({
        forumInfo: forum,
        topics: topics[0],
        loading: false
      })
      this.flkty = new Flickity(this.refs.carrusel, this.state.options)
      this.flkty.resize();
    }).catch((e) => console.error(e))
  }

  render () {
    let { loading, topics } = this.state
    let { forum } = this.props
    return (
      <div className='container comunidad-activa'>
        {
          loading && 
          <div className="row" >
            <div className='col-lg-12'>
              <h3 className="text-center loading-title">Cargando...</h3>
            </div>
          </div>
        }
        {
          !loading &&
          <div className='row'>
            <div className='col-lg-12'>
              <h2 className='text-center text-primary'>{forum.title}</h2>
            </div>
            <div className='col-lg-12'>
              <div className={`topics-container ${!topics.length && 'hide'}` } ref='carrusel'>
                {topics.length && topics.map((topic) => (
                  <TopicCard key={topic.id} topic={topic}/>
                ))}
              </div>              
              {
                topics.length == 0 && <p className="no-topics text-center">No hay ejes creados en esta comunidad</p>
              }
            </div>
          </div>
        }
        <div className='row'>
            <div className='col-lg-12 text-center'>
              <Link className="link-forum" to={forum.url}>Ir a la comunidad</Link>
            </div>
        </div>
      </div>
    )
  }
}

export default ComunidadContainer
