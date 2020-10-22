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
          <div className='logos-wrapper'>
            <a href='http://www.fundacioncorona.org.co/' className='logo-corona'>
              <img src='/lib/frontend/site/home-multiforum/logo-fundacioncorona.png' alt="Fundación Corona" />
            </a>
            <a href='https://www.avina.net/' className='logo-avina'>
              <img src='/lib/frontend/site/home-multiforum/logo-avina.png' alt="Fundación Avina" />
            </a>
            <a href='https://www.fes-colombia.org/' className='logo-fescol'>
              <img src='/lib/frontend/site/home-multiforum/logo-fescol.png' alt="Fundación Friedrich Ebert Fescol" />
            </a>
            <a href='https://www.extituto.org/' className='logo-extituto'>
              <img src='/lib/frontend/site/home-multiforum/logo-extituto.png' alt="Extituto Política Abierta" />
            </a>
            <a href='https://ideemos.org/' className='logo-ideemos'>
              <img src='/lib/frontend/site/home-multiforum/logo-lab-innovacion-democrativa.png' alt="Ideemos" />
            </a>
            <a href='https://nimd.org/' className='logo-nimd'>
              <img src='/lib/frontend/site/home-multiforum/logo-nimd.png' alt="Netherlands Institute for Multiparty Democracy" />
            </a>
            <img className="logo-diseno" src='/lib/frontend/site/home-multiforum/logo-disenopublico.png' alt="Diseño Público" />
          </div>
        </div>
        <div className='footer footer-democracia'>
          <a href='https://democraciaenred.org/'>
            <img src='/lib/frontend/site/home-multiforum/logo-der.png' />
            <span>Desarrollado con ♥<br />por Democracia en Red</span>
          </a>
          <span>Todos los derechos reservados 2020</span>
        </div>
      </footer>
    )
  }
}
