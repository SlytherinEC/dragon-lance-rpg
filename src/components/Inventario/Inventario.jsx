import React from 'react'
import './Inventario.css'
import PersonajeThumbnail from '../PersonajeThumbnail/PersonajeThumbnail'


function Inventario({equipoHeroes}) {


  return (
    <div>
        {equipoHeroes.map((personaje, index) => (
          <PersonajeThumbnail personaje={personaje} key={index} />
        ))}
    </div>
  )
}

export default Inventario