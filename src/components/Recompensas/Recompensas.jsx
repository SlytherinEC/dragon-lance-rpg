import React from 'react';
import './Recompensas.css';

function Recompensas({ heroe }) {
  return (
    <div className="info-tarjeta">
      <div>
        <div>Recompensas de {heroe.nombre}</div>
        {heroe.recompensas.length > 0 ? (
          <div className="en-linea">
            {heroe.recompensas.map((recompensa, index) => (
              <h5 key={recompensa.id}>{recompensa}, </h5>
            ))}
          </div>
        ) : (
          <p>Sin recompensas</p>
        )}
      </div>
    </div>
  );
}

export default Recompensas;
