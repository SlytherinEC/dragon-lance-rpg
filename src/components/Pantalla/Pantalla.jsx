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
    const valores = logicaJuego.seleccionarEmparejamiento(equipoHeroes, equipoEnemigos);
    setMensaje(valores.mensaje);
    setIndiceHeroe(valores.indiceHeroe);
    setIndiceEnemigo(valores.indiceEnemigo);
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
      const arma = logicaJuego.elegirArma(equipoHeroes[indiceHeroe]);
      console.log(arma);

      const atacarEnemigo = logicaJuego.ataque(equipoHeroes[indiceHeroe], arma, nuevosEnemigos[indiceEnemigo]);
      setEquipoEnemigos(nuevosEnemigos);
      setMensaje(atacarEnemigo.mensaje);

      // Detener la sacudida del enemigo y actualizar mensaje
      setTimeout(() => {
        setAnimacionEnemigo(false);

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
            const arma = {
              nombre: nuevosEnemigos[indiceEnemigo].arma,
              dano: nuevosEnemigos[indiceEnemigo].ataque
            };
            const atacarHeroe = logicaJuego.ataque(nuevosEnemigos[indiceEnemigo], arma, nuevosHeroes[indiceHeroe]);
            setMensaje(`${atacarHeroe.mensaje}`);
            setEquipoHeroes(nuevosHeroes);

            // Detener la sacudida del héroe
            setTimeout(() => {
              setAnimacionHeroeSacudida(false);
              eliminarEnemigo(indiceEnemigo);
              verificarFinJuego();
              seleccionarEmparejamiento();
              pausarjuego();

            }, 700);
          }, 700);
        }, 1500);
      }, 1000);
    }, 1000);
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
    const nuevosEnemigos = logicaJuego.eliminarEnemigo(equipoEnemigos, indice);

    setEquipoEnemigos(nuevosEnemigos);
  };

  console.log(equipoEnemigos);
  console.log(equipoHeroes);
  console.log(estadoJuego);

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