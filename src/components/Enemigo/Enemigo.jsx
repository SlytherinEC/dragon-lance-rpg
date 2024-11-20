import React, { useState } from 'react';
import './Enemigo.css';
import BarraVida from '../BarraVida/BarraVida';

function Enemigo({ nombre, arma, ataque, defensa, vida, imagen }) {

  return (
    <div className="tarjeta-enemigo">
      {/* Contenedor Izquierdo */}
      <div className="tarjeta-izquierda">
        {/* Barra de vida */}
        <div className="barra-vida">
          <label>Vida:</label>
          <BarraVida
            value={vida}
          />
        </div>
        {/* Imagen del personaje */}
        <div className="imagen-personaje">
          <img
            src={require(`../../img/Gemini_Generated_Image_${imagen}.png`)}
            alt={nombre}
          />
        </div>
      </div>

      {/* Contenedor Derecho */}
      <div className="tarjeta-derecha">
        <h2>{nombre}</h2>
        <p>
          <strong>Arma:</strong> {arma}
        </p>
        <p>
          <strong>Ataque:</strong> {ataque ?? "Desconocido"}
        </p>
        <p>
          <strong>Defensa:</strong> {defensa ?? "Desconocida"}
        </p>
      </div>
    </div>
  );
}

export default Enemigo