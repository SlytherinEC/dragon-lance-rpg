import React from 'react';
import './Mensajes.css';
function Mensajes( {texto} ) {
  return (
    <div className='mensajes'>
      <p>{texto}</p>
    </div>
  )
}

export default Mensajes;