import React, { Component } from 'react'
import { Link } from 'react-router'
import t from 't-component'
import config from 'lib/config'

export default class Footer extends Component {

  render () {
    return (
      <footer className='ext-footer'>
        <div className='footer container'>
          <div className='institutional'>
            <div className='logo gob'>
              <a href='/'>
                <img src={config.imgs.logoFooter} />
              </a>
              <a href='http://concejodebogota.gov.co/'>
                <img src='/lib/frontend/site/home-multiforum/logo-cobogota.png' />
              </a>
            </div>
          </div>
            <nav className='menu'>
              <Link to='/ayuda/como-funciona'>¿Cómo funciona?</Link>
              <Link to='/ayuda/acerca'>Acerca de este sitio</Link>
              <Link to='/ayuda/acerca'>Contacto</Link>
            </nav>
            <nav className='menu'>
              <Link to='/ayuda/terminos-y-condiciones'>{ t('help.tos.title')}</Link>
              <Link to='/ayuda/privacidad'>{ t('help.pp.title')}</Link>
            </nav>
        </div>
        <div className='footer footer-support'>
          <h6>Con el apoyo de</h6>
        </div>
        <div className='footer footer-democracia'>
          <a href='http://concejodebogota.gov.co/'>
            <img src='/lib/frontend/site/home-multiforum/logo-der.png' />
            <span>Desarrollado con ♥<br />por Democracia en Red</span>
          </a>
          <span>Todos los derechos reservados 2020</span>
        </div>
      </footer>
    )
  }
}
