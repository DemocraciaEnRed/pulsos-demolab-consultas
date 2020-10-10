import React from 'react'
import { Link } from 'react-router'
import Flickity from 'ext/node_modules/flickity'
// import forumStore from 'lib/frontend/stores/forum-store/forum-store'
import topicStore from 'lib/frontend/stores/topic-store/topic-store'
import TopicCard from './topicCard'
import Search from '../search/component'


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

class TopicsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: [],
      loading: true,
      page: null,
      activeFilter: 'byDate',
      options: {
        cellAlign: 'center',
        draggable: false,
        // wrapAround: true,
        contain: true,
        pageDots: false,
        groupCells: window.matchMedia('(min-width: 1024px)').matches ? 3 : 1,
        autoPlay: false,
      }
    }
    this.flkty = null
  }

  componentWillMount = () => {
    console.log('Mounted, now fetch topics!')
    this.fetchTopics('byDate')
  }

  componentWillReceiveProps = ({ forum }) => {
    console.log('Updated! now fetch topics!')
    this.setState({
      loading: true
    }, this.fetchTopics('byDate'))
  }

  componentWillUnmount() {
    if (this.flkty) this.flkty.destroy()
  }

  fetchTopics = (name) => {
    const { page } = this.state;

    topicStore
      .filterBy(name)
      .then((topics) => {
        this.setState({
          page,
          topics: topics || [],
          activeFilter: name,
          loading: false
        })
        if(topics) {
          this.flkty = new Flickity(this.refs.carrusel, this.state.options)
          this.flkty.resize();
        }
      })
      .catch(console.error)
    // topicStore.findAll()
    //   .then((res) => {
    //     let topics = res[0]
    //     if (this.props.topic !== undefined) {
    //       topics = [...topics].filter((topic) => topic.id !== this.props.topic.id)
    //     }
    //     if (topics.length > 0) {
    //       // ordenamos topics por abiertos y cerrados, y por fechas de cierre
    //       // mismo sort utilizado en home-forum
    //       topics = topics.sort((a,b) => {  
    //         // si uno está abierto y el otro cerrado, ordenar por abierto
    //         if (a.closed && !b.closed)
    //           return 1
    //         if (!a.closed && b.closed)
    //           return -1  
    //         //// si los dos están abiertos o los dos cerrados
    //         // si los dos tienen fecha de cierre, ordenar por eso
    //         if (a.closingAt && b.closingAt)
    //           if (a.closed && b.closed)
    //             return new Date(a.closingAt) < new Date(b.closingAt) ? 1 : -1     
    //           if (!a.closed && !b.closed)
    //             return new Date(a.closingAt) > new Date(b.closingAt) ? 1 : -1    
    //         // si alguno tiene fecha de cierre, poner último
    //         if (a.closingAt)
    //           return 1
    //         if (b.closingAt)
    //           return -1
    //         // finalmente, si nada de lo anterior se cumple, ordenar por fecha de publicación
    //         return new Date(a.publishedAt) < new Date(b.publishedAt) ? 1 : -1
    //       })
    //       this.setState({
    //         topics: topics
    //       })
    //     }
    //   })
    //   .catch((err) => console.error(err))
    // ================================0
    // console.log('-- fetch topics!')
    // if (this.flkty) this.flkty.destroy()
    // this.setState({
    //   loading: true
    // })
    // Promise.all([
    //   forumStore.findOneByName(forum.name),
    //   topicStore.findAll({ forum: forum.id })
    // ]).then(([forum, topics]) => {
    //   console.log('forum', forum)
    //   console.log('topics', topics)
    //   this.setState({
    //     forumInfo: forum,
    //     topics: topics[0],
    //     loading: false
    //   })
    //   this.flkty = new Flickity(this.refs.carrusel, this.state.options)
    // }).catch((e) => console.error(e))
  }

  handleClick = (name) => {
    this.setState({
      topics: [],
      loading: true
    }, this.fetchTopics(name))
    // const { page } = this.state;
    // topicStore
    //   .filterBy(name)
    //   .then((topics) => {
    //     this.setState({
    //       page,
    //       topics,
    //       activeFilter: name
    //     })
    //   })
    //   .catch(console.error)
  }

  render() {
    let { loading, topics, activeFilter } = this.state
    // let { forum } = this.props
    return (
     <section className='consultas' id='consultas'>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className='text-center text-primary'>Las propuestas más recientes</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Search />

            </div>
          </div>
        </div>
        <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="filter-wrapper" aria-label="Filtros">
              <div
                className={`btn btn-item-filter ${activeFilter === 'byDate' ? 'selected' : ''}`}
                onClick={this.handleClick.bind(this, 'byDate')}
              >
                Nuevas
              </div>
              <div
                className={`btn btn-item-filter ${activeFilter === 'byPopular' ? 'selected' : ''}`}
                onClick={this.handleClick.bind(this, 'byPopular')}
              >
               Mayor participación
              </div>
              <div
                className={`btn btn-item-filter ${activeFilter === 'byClosed' ? 'selected' : ''}`}
                onClick={this.handleClick.bind(this, 'byClosed')}
              >
                Finalizadas
              </div>
            </div>
          </div>
        </div>
        <br />
        {
          loading &&
          <div className="row" >
            <div className='col-lg-12'>
              <h4 className="text-center">Cargando...</h4>
            </div>
          </div>
        }
        {
          !loading &&
          <div className='row'>
            <div className='col-lg-12'>
              <div className={`topics-container ${!topics.length && 'hide'}`} ref='carrusel'>
                {topics.length && topics.map((topic) => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
              {
                topics.length == 0 && <p>No hay propuestas para mostrar</p>
              }
            </div>
          </div>
        }
        </div>
      </section>
    )
  }
}

export default TopicsContainer
