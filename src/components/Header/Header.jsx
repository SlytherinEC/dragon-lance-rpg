import React from 'react';
import './Header.css';
import logoDragonLance from '../../img/dragonlance-logo.png';

function Header() {
  return (
    <header className='header'>
      <img
        className='dragonlance-logo'
        src={logoDragonLance}
        alt='Imagen del logo de DragonLance'
      />
    </header>
  )
}

export default Header