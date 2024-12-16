import React from 'react'
import './Recompensas.css'

function Estadisticas({ heroe }) {

  return (
    <div className="info-tarjeta">
      <div>
        <div>Estadísticas de {heroe.nombre}</div>
        <h5>Muertes: {heroe.muertes}</h5>
        <div>Asesinados: </div>
        {heroe.asesinados.length > 0 ? (
          <div className="en-linea">
            {heroe.asesinados.map((asesinado, index) => (
              <h5 key={index}>{asesinado},</h5>              
            ))}
          </div> 
        ) : (
          <p>No ha asesinado ningún enemigo</p>
        )}
      </div>
    </div>
  );
}

export default Estadisticas