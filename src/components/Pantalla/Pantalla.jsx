import React from "react";
import { useState } from "react";
import './Pantalla.css';
import datosHeroes from '../../data/datosHeroes.json'
import datosEnemigos from '../../data/datosEnemigos.json'
import mensajes from "../../data/mensajes.json";
import logicaJuego from "../../utils/LogicaJuego";
import Heroe from '../Personaje/Heroe';
import Enemigo from "../Personaje/Enemigo";
import Mensajes from "../Mensajes/Mensajes";
import Boton from "../Boton/Boton";

function Pantalla() {

  const ESTADO = {
    INICIO: 'game_start',
    INICIANDO: 'game_init',
    JUGANDO: 'game_play',
    PAUSADO: 'game_pause',
    GANADO: 'game_win',
    PERDIDO: 'game_over'
  };

  const [estadoJuego, setEstadoJuego] = useState(ESTADO.INICIO);
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
    setEstadoJuego(ESTADO.INICIANDO);
    setEquipoHeroes(logicaJuego.llenarHeroes(datosHeroes));
    setEquipoEnemigos(logicaJuego.llenarEnemigos(datosEnemigos, 4));
    setMensaje(mensajes.inicio);
  };

  const jugarJuego = () => {
    setEstadoJuego(ESTADO.JUGANDO);
    setMensaje(mensajes.jugar);
  };

  const pausarjuego = () => {
    setEstadoJuego(ESTADO.PAUSADO);

  };

  const reiniciarJuego = () => {
    setEstadoJuego(ESTADO.INICIO);
    setEquipoHeroes([]);
    setEquipoEnemigos([]);
    setMensaje('');
    setIndiceHeroe(0);
    setIndiceEnemigo(0);
  };

  const seleccionarEmparejamiento = () => {
    // Selecciona héroe y enemigo al azar
    const nuevoIndiceHeroe = logicaJuego.crearAleatorio(0, equipoHeroes.length - 1);
    const nuevoIndiceEnemigo = logicaJuego.crearAleatorio(0, equipoEnemigos.length - 1);

    setIndiceHeroe(nuevoIndiceHeroe);
    setIndiceEnemigo(nuevoIndiceEnemigo);
    setMensaje(`Nuevo emparejamiento: ${equipoHeroes[indiceHeroe].nombre} vs ${equipoEnemigos[indiceEnemigo].nombre}`);

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
        setMensaje(` ${equipoHeroes[indiceHeroe].nombre} ataca a ${nuevosEnemigos[indiceEnemigo].nombre} le hace ${equipoHeroes[indiceHeroe].equipamiento.ataque} puntos de daño.`);

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

            setMensaje(`${nuevosHeroes[indiceHeroe].nombre} ha recibido ${nuevosEnemigos[indiceEnemigo].ataque} puntos de daño.`);

            // Detener la sacudida del héroe
            setTimeout(() => {
              setAnimacionHeroeSacudida(false);
              eliminarEnemigo(indiceEnemigo);
              seleccionarEmparejamiento();
              verificarFinJuego();
              pausarjuego();

            }, 700);
          }, 700);
        }, 1500);
      }, 700);
    }, 700);
  };

  const verificarFinJuego = () => {
    if (equipoHeroes.every(heroe => heroe.vida <= 0)) {
      setMensaje("¡Todos los héroes han sido derrotados! Fin del juego.");
      setEstadoJuego("game_over");
    } else if (equipoEnemigos.length === 0) {
      setMensaje("¡Todos los enemigos han sido derrotados! ¡Victoria!");
      setEstadoJuego("game_win");
    }
  };

  const eliminarEnemigo = (indice) => {
    const nuevosEnemigos = [...equipoEnemigos];

    if (nuevosEnemigos[indice].vida <= 0) {
      setMensaje(`El enemigo ${nuevosEnemigos[indice].nombre} ha sido eliminado por ${equipoHeroes[indiceHeroe].nombre}.`);
      nuevosEnemigos.splice(indice, 1);
    }

    setEquipoEnemigos(nuevosEnemigos);
  };


  console.log(equipoEnemigos);
  console.log(equipoHeroes);

  return (

    <div className='contenedor-principal'>

      {estadoJuego === 'game_win' &&
        <>
          <div className="contenedor-fila superior">
            <div className="contenedor-mensajes">
              <Mensajes texto={mensaje} />
            </div>


            <div className="contenedor-boton">
              <Boton onClick={reiniciarJuego} texto={"Iniciar"} />
            </div>
          </div>
        </>
      }
      {estadoJuego === 'game_start' &&

        <Boton onClick={iniciarJuego} texto={"Iniciar Juego"} />
      }

      {estadoJuego === 'game_init' &&
        <>

          <div className="contenedor-fila superior">
            <div className="contenedor-mensajes">
              <Mensajes texto={mensaje} />
            </div>


            <div className="contenedor-boton">
              <Boton onClick={jugarJuego} texto={"Iniciar"} />
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
              {estadoJuego === 'game_pause' &&
                <Boton onClick={jugarJuego} texto={"Jugar"} />
              }
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
                <Boton onClick={atacarEnemigo} texto={"Atacar"} />
                <Boton onClick={reiniciarJuego} texto={"Reiniciar"} />
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