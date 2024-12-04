import React from "react";
import './Pantalla.css';
import datosHeroes from '../../data/datosHeroes.json'
import datosEnemigos from '../../data/datosEnemigos.json'
import logicaJuego from "../../utils/LogicaJuego";
import Heroe from '../Personaje/Heroe';
import Enemigo from "../Personaje/Enemigo";
import { useState } from "react";
import mensajes from "../../data/mensajes.json";
import Mensajes from "../Mensajes/Mensajes";

function Pantalla() {

  const [estadoJuego, setEstadoJuego] = useState('game_start');
  const [equipoHeroes, setEquipoHeroes] = useState([]);
  const [equipoEnemigos, setEquipoEnemigos] = useState([]);
  const [mensaje, setMensaje] = useState("")

  const iniciarJuego = () => {
    setEstadoJuego('game_play');
    setEquipoHeroes(logicaJuego.llenarHeroes(datosHeroes));
    setEquipoEnemigos(logicaJuego.llenarEnemigos(datosEnemigos, 4));
    setMensaje(mensajes.inicio);
  };

  const finalizarJuego = () => {
    setEstadoJuego('game_end');
  };

  const reiniciarJuego = () => {
    setEstadoJuego('game_start');
    setEquipoHeroes([]);
    setEquipoEnemigos([]);

  };


  console.log(equipoEnemigos);
  console.log(equipoHeroes);

  return (

    <div className='contenedor-principal'>

      {estadoJuego === 'game_start' && <button className="btn-inicio" onClick={iniciarJuego}>Iniciar Juego</button>}

      {estadoJuego === 'game_play' &&

        <>

          <div className="contenedor-fila superior">
            <div className="contenedor-mensajes">
              <Mensajes texto={mensaje} />
            </div>

          </div>
          <div className="contenedor-fila inferior">
            <div className='contenedor-personaje heroe'>

              <Heroe heroe={equipoHeroes[logicaJuego.crearAleatorio(0, equipoHeroes.length - 1)]} />
            </div>

            <div className="contenedor-boton">
              <button className="btn-inicio" onClick={reiniciarJuego}>Reiniciar</button>
            </div>


            <div className="contenedor-personaje enemigo">
              <Enemigo enemigo={equipoEnemigos[3]} />
            </div>

          </div>
        </>
      }
    </div>
  );
}

export default Pantalla;