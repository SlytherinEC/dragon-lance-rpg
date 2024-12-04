const logicaJuego = {

  manejarEstadoJuego: () => {

  },

  crearAleatorio: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  crearEnemigo: (nombre, arma, ataque, defensa, vida, recompensa, imagen) => {
    const enemigo = {
      nombre: nombre,
      arma: arma,
      ataque: ataque,
      defensa: defensa,
      equipo: 'enemigos',
      vida: vida,
      recompensa: recompensa,
      imagen: imagen

    }
    return enemigo;
  },

  llenarEnemigos: (datosEnemigos, cantidad) => {
    const enemigos = [];
    for (let i = 0; i < cantidad; i++) {
      const indice = logicaJuego.crearAleatorio(0, datosEnemigos.length - 1);
      const enemigo = logicaJuego.crearEnemigo(
        datosEnemigos[indice].nombre,
        datosEnemigos[indice].arma,
        datosEnemigos[indice].ataque = logicaJuego.crearAleatorio(7, 10), // Ataque aleatorio entre 7 y 10.
        datosEnemigos[indice].defensa = logicaJuego.crearAleatorio(3, 6), // Defensa aleatoria entre 1 y 5.
        datosEnemigos[indice].vida = logicaJuego.crearAleatorio(25, 40), // Vida aleatoria entre 25 y 40.
        datosEnemigos[indice].recompensa,
        datosEnemigos[indice].imagen
      );
      enemigos.push(enemigo);
    }
    return enemigos;
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
  },
  llenarHeroes: (datosHeroes) => {
    const heroes = [];
    for (let i = 0; i < datosHeroes.length; i++) {
      const heroe = logicaJuego.crearHeroe(
        datosHeroes[i].nombre,
        datosHeroes[i].raza,
        datosHeroes[i].equipamiento.armas.principal,
        datosHeroes[i].equipamiento.armas.secundaria,
        datosHeroes[i].equipamiento.armadura,
        datosHeroes[i].vida,
        datosHeroes[i].equipamiento.ataque,
        datosHeroes[i].equipamiento.defensa
      );
      heroes.push(heroe);
    }
    return heroes;
  },
  decirHola: () => {
    return 'El juego ha comenzado';
  },
}

export default logicaJuego;