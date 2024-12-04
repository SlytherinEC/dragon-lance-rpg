import React from "react";
import './Info.css'
import Enemigo from "../Enemigo/Enemigo";
import datosEnemigos from "../../data/datosEnemigos.json";

function Info({Id}) {

  const datos = datosEnemigos;
  console.log('vida ', datos[0].vida);
  

  return (
    <div>
      <Enemigo
        nombre={datos[Id].nombre}
        arma={datos[Id].arma}
        ataque={datos[Id].ataque}
        defensa={datos[Id].defensa}
        vida={datos[Id].vida}
        imagen={datos[Id].imagen}
      />
    </div>
  );
}

export default Info;