import React, { PureComponent } from 'react'
import t from 't-component'
import config from 'lib/config'
const moment = require('moment')

export default ({ topic }) => {
  const { url, mediaTitle, action } = topic

  const socialLinksUrl = window.location.origin + url
  const twitterText = encodeURIComponent(
    config.tweetText ? 
        t(config.tweetText, { organizationName: config.organizationName, bajadaPlataforma: config.bajadaPlataforma }).replace(/\\n/g, "\n")
      : mediaTitle
  )

  const popupCenter = ({url, w, h}) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, 'popup', 
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    )

    if (window.focus) newWindow.focus();
}

  const popupLink = (url, e) => {
    e.stopPropagation();
    popupCenter({url, w: 400, h: 300})
  }

  return (
    <div className='topic-article-content topic-social'>
      <div className='participants-box'>
        <span className='paticipants-box-published'>Publicado</span>
        <span>{
          moment(topic.publishedAt).format('D [de] MMMM YYYY')
        }</span>
        <span className={ topic.closed ? 'icon-lock' : 'icon-lock-open'} style={{marginRight: '5px'}}></span>
        <span className={ topic.closed ? 'closed' : 'open'} >{topic.closed ? 'Cerrada' : 'Disponible'}</span>
        <span>Compartir en redes sociales</span>
      </div>
      <div className='share-links'>
        <a
          onClick={(e) => popupLink(`http://www.facebook.com/sharer.php?u=${socialLinksUrl}`, e)}
          rel='noopener noreferrer'
          className='icon-social-facebook' />
        <a
          onClick={(e) => popupLink(`http://twitter.com/share?text=${twitterText}&url=${socialLinksUrl}`, e)}
          rel='noopener noreferrer'
          className='icon-social-twitter' />
      </div>
    </div>
  )
}
