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
  const [animacionHeroe, setAnimacionHeroe] = useState(false);
  const [animacionEnemigo, setAnimacionEnemigo] = useState(false);
  const [animacionEnemigoAtaque, setAnimacionEnemigoAtaque] = useState(false);
  const [animacionHeroeSacudida, setAnimacionHeroeSacudida] = useState(false);
  const [indiceHeroe, setIndiceHeroe] = useState(0);
  const [indiceEnemigo, setIndiceEnemigo] = useState(0);



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

  const seleccionarEmparejamiento = () => {
    // Selecciona héroe y enemigo al azar
    setIndiceHeroe(logicaJuego.crearAleatorio(0, equipoHeroes.length - 1));
    setIndiceEnemigo(logicaJuego.crearAleatorio(0, equipoEnemigos.length - 1));

    setEstadoJuego('game_play');
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
      logicaJuego.atacarTarget(equipoHeroes[indiceHeroe], nuevosEnemigos[indiceEnemigo]);
      setEquipoEnemigos(nuevosEnemigos);

      // Detener la sacudida del enemigo y actualizar mensaje
      setTimeout(() => {
        setAnimacionEnemigo(false);
        setMensaje(`Nuevo emparejamiento: ${equipoHeroes[indiceHeroe].nombre} vs ${equipoEnemigos[indiceEnemigo].nombre} El enemigo ${nuevosEnemigos[indiceEnemigo].nombre} ha recibido daño.`);

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
            logicaJuego.atacarTarget(nuevosEnemigos[indiceEnemigo], nuevosHeroes[indiceHeroe]);
            setEquipoHeroes(nuevosHeroes);

            setMensaje(`${nuevosHeroes[indiceHeroe].nombre} ha recibido daño del enemigo.`);

            // Detener la sacudida del héroe
            setTimeout(() => {
              setAnimacionHeroeSacudida(false);
              setMensaje('El turno ha finalizado. Haz clic en "Seleccionar" para continuar.');
              setTimeout(() => {
                setEstadoJuego('game_pause');
              }, 500);
            }, 500);
          }, 500);
        }, 1000);
      }, 500);
    }, 500);
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

      {estadoJuego === 'game_pause' &&
        <>

          <div className="contenedor-fila superior">
            <div className="contenedor-mensajes">
              <Mensajes texto={mensaje} />
            </div>


            <div className="contenedor-boton">
              {estadoJuego === 'game_pause' && <button className="btn-inicio" onClick={seleccionarEmparejamiento}>Seleccionar</button>}
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
              <Heroe heroe={equipoHeroes[indiceHeroe]} />
            </div>

            <div className={`contenedor-personaje enemigo ${animacionEnemigo ? 'enemigo-sacudida' : ''} ${animacionEnemigoAtaque ? 'enemigo-animado' : ''}`}>
              <Enemigo enemigo={equipoEnemigos[indiceEnemigo]} />
            </div>

          </div>
        </>
      }
    </div>
  );
}

export default Pantalla;