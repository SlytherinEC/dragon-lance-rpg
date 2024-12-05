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
  const [mensaje, setMensaje] = useState("");
  const [turnoHeroes, setTurnoHeroes] = useState(true);
  const [animacionHeroe, setAnimacionHeroe] = useState(false);
  const [animacionEnemigo, setAnimacionEnemigo] = useState(false);
  const [animacionEnemigoAtaque, setAnimacionEnemigoAtaque] = useState(false);
  const [animacionHeroeSacudida, setAnimacionHeroeSacudida] = useState(false);
  

  const iniciarJuego = () => {
    setEstadoJuego('game_init');
    setEquipoHeroes(logicaJuego.llenarHeroes(datosHeroes));
    setEquipoEnemigos(logicaJuego.llenarEnemigos(datosEnemigos, 4));
    setMensaje(mensajes.inicio);
  };

  const jugarJuego = () => {
    setEstadoJuego('game_play');
    setMensaje(mensajes.jugar);
  };

  const pausarjuego = () => {
    setEstadoJuego('game_pause');
  };

  const reiniciarJuego = () => {
    setEstadoJuego('game_start');
    setEquipoHeroes([]);
    setEquipoEnemigos([]);

  };

  const atacarEnemigo = () => {
    // Iniciar animación del héroe
    setAnimacionHeroe(true);
  
    // Después de la animación del héroe, iniciar la sacudida del enemigo
    setTimeout(() => {
      setAnimacionHeroe(false);
      setAnimacionEnemigo(true);
  
      // Actualizar vida del enemigo
      const nuevosEnemigos = [...equipoEnemigos];
      logicaJuego.atacarTarget(equipoHeroes[0], nuevosEnemigos[3]);
      setEquipoEnemigos(nuevosEnemigos);
  
      // Detener la sacudida del enemigo y actualizar mensaje
      setTimeout(() => {
        setAnimacionEnemigo(false);
        setMensaje(`El enemigo ${nuevosEnemigos[3].nombre} ha recibido daño.`);
  
        // Esperar 1 segundo antes de que el enemigo ataque
        setTimeout(() => {
          // Iniciar animación del enemigo atacando
          setAnimacionEnemigoAtaque(true);
  
          // Después de la animación del enemigo, iniciar sacudida del héroe
          setTimeout(() => {
            setAnimacionEnemigoAtaque(false);
            setAnimacionHeroeSacudida(true);
  
            // Actualizar vida del héroe
            const nuevosHeroes = [...equipoHeroes];
            logicaJuego.atacarTarget(nuevosEnemigos[3], nuevosHeroes[0]);
            setEquipoHeroes(nuevosHeroes);
  
            setMensaje(`${nuevosHeroes[0].nombre} ha recibido daño del enemigo.`);
  
            // Detener la sacudida del héroe
            setTimeout(() => {
              setAnimacionHeroeSacudida(false);
            }, 500); // Duración de la sacudida del héroe
          }, 300); // Duración del desplazamiento del enemigo
        }, 1000); // Espera de 1 segundo antes del ataque del enemigo
      }, 500); // Duración de la sacudida del enemigo
    }, 300); // Duración del desplazamiento del héroe
  };
    
  console.log(equipoEnemigos);
  console.log(equipoHeroes);

  return (

    <div className='contenedor-principal'>

      {estadoJuego === 'game_start' && <button className="btn-inicio" onClick={iniciarJuego}>Iniciar Juego</button>}

      {estadoJuego === 'game_init' &&
        <>

          <div className="contenedor-fila superior">
            <div className="contenedor-mensajes">
              <Mensajes texto={mensaje} />
            </div>


            <div className="contenedor-boton">
              <button className="btn-inicio" onClick={jugarJuego}>Iniciar</button>
            </div>
          </div>

        </>
      }

      {estadoJuego === 'game_play' &&

        <>

          <div className="contenedor-fila superior">
            <div className="contenedor-mensajes">
              <Mensajes texto={mensaje} />
              <div className="contenedor-boton">
                <button className="btn-inicio" onClick={atacarEnemigo}>Atacar</button>
                <button className="btn-inicio" onClick={reiniciarJuego}>Reiniciar</button>
              </div>
            </div>
          </div>
          <div className="contenedor-fila inferior">
          <div className={`contenedor-personaje heroe ${animacionHeroe ? 'heroe-animado' : ''} ${animacionHeroeSacudida ? 'heroe-sacudida' : ''}`}>

              {/* <Heroe heroe={equipoHeroes[logicaJuego.crearAleatorio(0, equipoHeroes.length - 1)]} /> */}
              <Heroe heroe={equipoHeroes[0]} />
            </div>

            <div className={`contenedor-personaje enemigo ${animacionEnemigo ? 'enemigo-sacudida' : ''} ${animacionEnemigoAtaque ? 'enemigo-animado' : ''}`}>
            <Enemigo enemigo={equipoEnemigos[3]} />
            </div>

          </div>
        </>
      }
    </div>
  );
}

export default Pantalla;