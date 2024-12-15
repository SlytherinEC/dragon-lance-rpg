// Importa React y el hook useState para gestionar el estado del componente.
import React from "react";
import { useState } from "react";

// Importa los estilos CSS específicos para este componente.
import './Pantalla.css';

// Importa datos predefinidos desde archivos JSON que contienen información de héroes, enemigos y mensajes.
import datosHeroes from '../../data/datosHeroes.json';
import datosEnemigos from '../../data/datosEnemigos.json';
import mensajes from "../../data/mensajes.json";

// Importa lógica reutilizable que contiene funciones para manejar mecánicas del juego.
import logicaJuego from "../../utils/LogicaJuego";

// Importa componentes para renderizar héroes, enemigos, mensajes y botones.
import Heroe from '../Personaje/Heroe';
import Enemigo from "../Personaje/Enemigo";
import Mensajes from "../Mensajes/Mensajes";
import Boton from "../Boton/Boton";
import PersonajeThumbnail from "../PersonajeThumbnail/PersonajeThumbnail";
import Inventario from "../Inventario/Inventario";

// Declara el componente principal de la pantalla del juego.
function Pantalla() {
  // Define los diferentes estados del juego como un objeto constante.
  const ESTADO = {
    INICIO: 'game_start', // Juego no iniciado.
    INICIANDO: 'game_init', // Preparando el juego.
    JUGANDO: 'game_play', // Juego en curso.
    PAUSADO: 'game_pause', // Juego pausado.
    GANADO: 'game_win', // El jugador gana.
    PERDIDO: 'game_over' // El jugador pierde.
  };

  const OPCIONES = {
    INVENTARIO: 'inventario',
    RESUMEN: 'resumen',
    ESTADISTICAS: 'estadisticas'
  }

  // Define variables de estado para gestionar el juego.
  const [estadoJuego, setEstadoJuego] = useState(ESTADO.INICIO); // Estado actual del juego.
  const [equipoHeroes, setEquipoHeroes] = useState([]); // Lista de héroes en el equipo.
  const [equipoEnemigos, setEquipoEnemigos] = useState([]); // Lista de enemigos activos.
  const [mensaje, setMensaje] = useState(""); // Mensaje a mostrar en pantalla.
  const [animacionHeroe, setAnimacionHeroe] = useState(false); // Animación del héroe atacando.
  const [animacionEnemigo, setAnimacionEnemigo] = useState(false); // Animación del enemigo sacudido.
  const [animacionEnemigoAtaque, setAnimacionEnemigoAtaque] = useState(false); // Animación del enemigo atacando.
  const [animacionHeroeSacudida, setAnimacionHeroeSacudida] = useState(false); // Animación del héroe sacudido.
  const [indiceHeroe, setIndiceHeroe] = useState(0); // Índice del héroe activo.
  const [indiceEnemigo, setIndiceEnemigo] = useState(0); // Índice del enemigo activo.
  const [opcionJuego, setOpcionJuego] = useState(null); // Opción actual del juego.

  // Función para inicializar el juego.
  const iniciarJuego = () => {
    setEstadoJuego(ESTADO.INICIANDO); // Cambia el estado del juego a 'INICIANDO'.
    setEquipoHeroes(logicaJuego.llenarHeroes(datosHeroes)); // Llena el equipo de héroes con datos iniciales.
    setEquipoEnemigos(logicaJuego.llenarEnemigos(datosEnemigos, 4)); // Llena el equipo de enemigos (4 enemigos).
    setMensaje(mensajes.inicio); // Muestra el mensaje inicial.

  };

  // Función para iniciar la jugabilidad.
  const jugarJuego = () => {

    const estanEnemigosMuertos = logicaJuego.verificarFinalJuego(equipoEnemigos);
    console.log(`Estan los enemigos muertos? ${estanEnemigosMuertos}`);

    if (estanEnemigosMuertos) {
      setMensaje("¡Todos los enemigos han sido derrotados! ¡Victoria!");
      setEstadoJuego(ESTADO.GANADO);
    } else {
      const emparejamiento = logicaJuego.seleccionarEmparejamiento(equipoHeroes, equipoEnemigos); // Lógica para seleccionar el emparejamiento.

      const nuevoIndiceHeroe = emparejamiento.indiceHeroe;
      const nuevoIndiceEnemigo = emparejamiento.indiceEnemigo;

      setIndiceHeroe(nuevoIndiceHeroe); // Actualiza el índice del héroe activo.
      setIndiceEnemigo(nuevoIndiceEnemigo); // Actualiza el índice del enemigo activo.
      setMensaje(emparejamiento.mensaje); // Actualiza el mensaje correspondiente.

      console.log(`Indice héroe: ${indiceHeroe}, indice enemigo: ${indiceEnemigo}`);

      setEstadoJuego(ESTADO.JUGANDO); // Cambia el estado a 'JUGANDO'.
      // setMensaje(mensajes.jugar); // Actualiza el mensaje en pantalla.
    }
  };

  // Función para pausar el juego.
  const pausarjuego = () => {
    setEstadoJuego(ESTADO.PAUSADO); // Cambia el estado a 'PAUSADO'.
  };

  const mostrarInventario = () => {
    setOpcionJuego(OPCIONES.INVENTARIO);
  }

  const volverAlPause = () => {
    setOpcionJuego(null);
  }

  // Reinicia el juego a su estado inicial.
  const reiniciarJuego = () => {
    setEstadoJuego(ESTADO.INICIO); // Cambia el estado a 'INICIO'.
    setEquipoHeroes([]); // Vacía el equipo de héroes.
    setEquipoEnemigos([]); // Vacía el equipo de enemigos.
    setMensaje(''); // Limpia los mensajes.
    setIndiceHeroe(0); // Resetea el índice del héroe activo.
    setIndiceEnemigo(0); // Resetea el índice del enemigo activo.
  };

  const atacarEnemigo = () => {

    console.log("Emparejamiento actual");

    // Iniciar animación del héroe
    setAnimacionHeroe(true);

    // Después de la animación del héroe, iniciar la sacudida del enemigo
    setTimeout(() => {
      setAnimacionHeroe(false); // Detiene la animación del héroe.
      setAnimacionEnemigo(true); // Inicia la sacudida del enemigo.

      // Actualiza la vida del enemigo.
      const nuevosEnemigos = [...equipoEnemigos]; // Crea una copia del equipo enemigo.
      const arma = logicaJuego.elegirArma(equipoHeroes[indiceHeroe]); // Selecciona el arma del héroe.
      console.log(arma);
      const atacarEnemigo = logicaJuego.ataque(equipoHeroes[indiceHeroe], arma, nuevosEnemigos[indiceEnemigo]); // Ejecuta el ataque.
      setEquipoEnemigos(nuevosEnemigos); // Actualiza el estado de enemigos.
      setMensaje(atacarEnemigo.mensaje); // Actualiza el mensaje del ataque.

      // Detener la sacudida del enemigo y actualizar mensaje
      setTimeout(() => {

        setAnimacionEnemigo(false); // Detiene la animación del enemigo.
        // Verifica si el enemigo sigue vivo.
        const estaEnemigoVivo = logicaJuego.verificarVida(equipoEnemigos[indiceEnemigo]);

        // Esperar 1 segundo antes de que el enemigo ataque
        setTimeout(() => {

          if (estaEnemigoVivo) {
            // Iniciar animación del enemigo atacando
            setAnimacionEnemigoAtaque(true);

            // Después de la animación del enemigo, iniciar sacudida del héroe
            setTimeout(() => {
              setAnimacionEnemigoAtaque(false); // Detiene la animación del enemigo atacando.
              setAnimacionHeroeSacudida(true); // Inicia la animación del héroe sacudido.

              // Actualizar vida del héroe
              const nuevosHeroes = [...equipoHeroes];
              const arma = {
                nombre: equipoEnemigos[indiceEnemigo].arma,
                dano: equipoEnemigos[indiceEnemigo].ataque
              };
              const atacarHeroe = logicaJuego.ataque(equipoEnemigos[indiceEnemigo], arma, nuevosHeroes[indiceHeroe]);
              setMensaje(atacarHeroe.mensaje);
              setEquipoHeroes(nuevosHeroes);

              // Detener la sacudida del héroe
              setTimeout(() => {
                setAnimacionHeroeSacudida(false);

                setTimeout(() => {
                  pausarjuego();
                }, 600);
              }, 1800);
            }, 600);
          } else {

            let nuevosEnemigos = [...equipoEnemigos];

            const recompensa = logicaJuego.seleccionarRecompensa(nuevosEnemigos[indiceEnemigo]);
            equipoHeroes[indiceHeroe].recompensas.push(recompensa);
            equipoHeroes[indiceHeroe].asesinados.push(nuevosEnemigos[indiceEnemigo].nombre);
            equipoHeroes[indiceHeroe].muertes++;
            console.log(`${nuevosEnemigos[indiceEnemigo].nombre} ha soltado esta recompensa: ${recompensa}`);
            console.log(`El héroe ${equipoHeroes[indiceHeroe].nombre} ha asesinado a ${equipoHeroes[indiceHeroe].asesinados}`);
            console.log(`El héroe ${equipoHeroes[indiceHeroe].nombre} lleva ${equipoHeroes[indiceHeroe].muertes} muertes`);

            nuevosEnemigos = logicaJuego.eliminarEnemigo(equipoEnemigos, indiceEnemigo);
            setEquipoEnemigos(nuevosEnemigos);

            pausarjuego();
          }
        }, 600);
      }, 1800);
    }, 600);
  };


  console.log(`Elementos en enemigos: ${equipoEnemigos.length}`);
  console.log(`Indice héroe: ${indiceHeroe}, indice enemigo: ${indiceEnemigo}`);
  console.log(equipoEnemigos);
  console.log(equipoHeroes);
  console.log(estadoJuego);

  return (

    <div className='contenedor-principal'>

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
              {estadoJuego === 'game_pause' &&
                <Boton onClick={mostrarInventario} texto={"Inventario"} />
              }
            </div>

            {opcionJuego === OPCIONES.INVENTARIO &&
            <div>
              <Inventario equipoHeroes={equipoHeroes} />
              <Boton onClick={volverAlPause} texto={"Volver"} />
            </div>
            }

          </div>

        </>
      }

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


    </div>
  );
}

export default Pantalla;