import React, { useState } from 'react'
import './Inventario.css'
import PersonajeThumbnail from '../PersonajeThumbnail/PersonajeThumbnail'
import Recompensas from '../Recompensas/Recompensas'
import Estadisticas from '../Recompensas/Estadisticas'
import Boton from '../Boton/Boton'

function Inventario({ equipoHeroes }) {

  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);

  const mostrarEstadisticasClick = () => {
    setMostrarEstadisticas(!mostrarEstadisticas);
  }

  return (
    <div className='inventario'>
      <div className="contenedor-boton btn-inventario">
        <Boton onClick={mostrarEstadisticasClick} texto={mostrarEstadisticas ? "Recompensas" : "Estadísticas"} />
      </div>

      {equipoHeroes.map((personaje, index) => (
        <div className="contenedor-tarjeta" key={index}>
          <PersonajeThumbnail personaje={personaje} />
          {mostrarEstadisticas ? (
            <Estadisticas heroe={personaje} />
          ) : (
            <Recompensas heroe={personaje} />
          )}
        </div>
      ))}
    </div>
  )
}

export default Inventario