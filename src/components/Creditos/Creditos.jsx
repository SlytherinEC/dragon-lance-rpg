import React from 'react'
import './Creditos.css'
import PersonajeThumbnail from '../PersonajeThumbnail/PersonajeThumbnail'
import datos from '../../data/desarrolladores.json'

function Creditos() {
  return (
    <div className='inventario centrado'>
      <div className="contenedor-info">
        <h3>Juego basado en las crónicas de <i>DragonLance</i></h3>
        <div className="contenedor-tarjeta">
          <PersonajeThumbnail className="participante" personaje={datos[0]} other={true} />
          <h4>{datos[0].rol}: {datos[0].nombre} {datos[0].apellidos}</h4>
        </div>

      </div>
      <div className="contenedor-info">
        <div className="contenedor-tarjeta" >
          <PersonajeThumbnail personaje={datos[1]} other={true}/>
          <h4>{datos[1].rol}: {datos[1].nombre} {datos[1].apellidos}</h4>
          </div>

      </div>

      <div className="contenedor-info">
        <div className="contenedor-tarjeta" >
        <h4>Aplicación desarrollada con React</h4>
        <PersonajeThumbnail personaje={datos[2]} other={true}/>
          </div>

      </div>


      
    </div>
  )
}

export default Creditos