import React from 'react';
import './Personaje.css';
import BarraVida from '../BarraVida/BarraVida';

function Heroe({ heroe }) {
  // Generar el nombre de la imagen basado en el atributo "nombre"
  const imagen = `${heroe.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_")}`;

  return (
    <div className="tarjeta-personaje heroe">
      
      <div className="tarjeta-info">
        <h2>{heroe.nombre}</h2>
        <p>
          <strong>Raza:</strong> {heroe.raza}
        </p>
        <p>
          <strong>Arma principal:</strong> {heroe.equipamiento.armas.principal.nombre}
          (Daño: {heroe.equipamiento.armas.principal.dano})
        </p>
        <p>
          <strong>Arma secundaria:</strong> {heroe.equipamiento.armas.secundaria.nombre}
          (Daño: {heroe.equipamiento.armas.secundaria.dano})
        </p>
        <p>
          <strong>Armadura:</strong> {heroe.equipamiento.armadura}
        </p>
        <p>
          <strong>Ataque:</strong> {heroe.equipamiento.ataque ?? "Desconocido"}<strong> Defensa:</strong> {heroe.equipamiento.defensa ?? "Desconocida"}
        </p>
      </div>
      <div className="tarjeta-vida-img">
        {/* Barra de vida */}
        <div className="barra-vida">
          <h2>Vida:</h2>
          <BarraVida
            value={heroe.vida_percent}
          />
        </div>
        {/* Imagen del personaje */}
        <div className="imagen-personaje">
          <img src={require(`../../img/${imagen}.png`)} alt={heroe.nombre} />
        </div>
      </div>

    </div>
  );
}

export default Heroe