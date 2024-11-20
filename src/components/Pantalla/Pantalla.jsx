import React from "react";
import './Pantalla.css';
import Heroe from "../Heroe/Heroe.jsx";

function Pantalla() {

 return (
    <div className="contenedor-imagen-fondo">
      <img className="imagen-fondo" src={require("../../img/cripta3.jpg")} alt="imagen cripta" />
    </div>

  );
}

export default Pantalla;