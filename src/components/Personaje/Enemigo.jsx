import React from 'react';
import './Personaje.css';
import BarraVida from '../BarraVida/BarraVida';

function Enemigo({ enemigo }) {

  return (
    <div className="tarjeta-personaje enemigo">
      {/* Contenedor Izquierdo */}
      <div className="tarjeta-vida-img">
        {/* Barra de vida */}
        <div className="barra-vida">
          <h2>Vida:</h2>
          <BarraVida
            value={enemigo.vida_percent}
          />
        </div>
        {/* Imagen del personaje */}
        <div className="imagen-personaje">
          <img
            src={require(`../../img/Gemini_Generated_Image_${enemigo.imagen}.png`)}
            alt={enemigo.nombre}
          />
        </div>
      </div>

      {/* Contenedor Derecho */}
      <div className="tarjeta-info">
        <h2>{enemigo.nombre}</h2>
        <p>
          <strong>Arma:</strong> {enemigo.arma}
        </p>
        <p>
          <strong>Ataque:</strong> {enemigo.ataque ?? "Desconocido"}  
        </p>
        <p>
          <strong>Defensa:</strong> {enemigo.defensa ?? "Desconocida"}
        </p>
      </div>
    </div>
  );
}

export default Enemigo