const logicaJuego = {

  manejarEstadoJuego: () => {

  },
  crearAleatorio: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  crearEnemigo: (nombre, arma, ataque, defensa, vida, recompensa) => {
    const enemigo = {
      nombre: nombre,
      arma: arma,
      ataque: ataque,
      defensa: defensa,
      equipo: 'enemigos',
      vida: vida,
      recompensa: recompensa

    }
    return enemigo;
  },
  crearHeroe: (nombre, raza, principal, secundaria, armadura, vida, ataque, defensa) => {
    // Definimos el héroe con su estructura y atributos.
    const heroe = {
      nombre: nombre,
      raza: raza,
      vida: vida,
      equipo: 'heroes',
      muertes: 0,
      asesinados: [],
      recompensas: [],
      equipamiento: {
        armas: {
          principal: {
            nombre: principal.nombre,
            dano: principal.dano
          },
          secundaria: {
            nombre: secundaria.nombre,
            dano: secundaria.dano
          },
        },
        armadura: armadura,
        ataque: ataque,
        defensa: defensa,
      }
    }
    return heroe;
  }
}

export default logicaJuego;