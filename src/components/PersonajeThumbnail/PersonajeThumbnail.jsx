import React from 'react'
import './PersonajeThumbnail.css'

function PersonajeThumbnail({ personaje }) {

  const imagen = `${personaje.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_")}`;


  return (
    <div className='personaje-thumbnail'>
      <img src={require(`../../img/${imagen}.png`)} alt={personaje.nombre} />
    </div>
  )
}

export default PersonajeThumbnail