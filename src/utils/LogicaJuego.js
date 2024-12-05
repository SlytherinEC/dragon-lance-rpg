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
        datosEnemigos[indice].defensa = logicaJuego.crearAleatorio(3, 8), // Defensa aleatoria entre 1 y 5.
        datosEnemigos[indice].vida = logicaJuego.crearAleatorio(50, 80), // Vida aleatoria entre 25 y 40.
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
  atacarTarget: (atacante, atacado) => {
    // Inicializamos el objeto 'arma' que contendrá el nombre y el daño del arma utilizada en el ataque.
    let arma = {};

    // Si el atacante es un héroe, se selecciona un arma del equipamiento del héroe.
    if (atacante.equipo === 'heroes') {
      // Llamamos a la función 'elegirArma' que selecciona aleatoriamente un arma del héroe (puede ser principal o secundaria).
      arma = logicaJuego.elegirArma(atacante);
    } else {
      // Si el atacante es un enemigo, asignamos su arma predefinida al objeto 'arma' con su nombre y daño.
      arma.nombre = atacante.arma;  // Se asigna el nombre del arma del enemigo.
      arma.dano = atacante.ataque;  // Se asigna el valor del daño del enemigo.
    }

    // Realizamos el ataque llamando a la función 'ataque', que procesa el daño y los efectos del ataque.
    logicaJuego.ataque(atacante, arma, atacado);
  },
  elegirArma: (objeto) => {
    // Generamos un número aleatorio entre 1 y 10 para determinar qué arma se seleccionará.
    let aleatorio = logicaJuego.crearAleatorio(1, 10);

    // Inicializamos el objeto 'arma' que contendrá la información del arma seleccionada.
    const arma = {};

    // Si el número generado es par, seleccionamos el arma principal del héroe.
    if (aleatorio % 2 === 0) {
      arma.nombre = objeto.equipamiento.armas.principal.nombre;
      arma.dano = objeto.equipamiento.armas.principal.dano + objeto.equipamiento.ataque;
    } else {
      // Si el número es impar, seleccionamos el arma secundaria del héroe.
      arma.nombre = objeto.equipamiento.armas.secundaria.nombre;
      arma.dano = objeto.equipamiento.armas.secundaria.dano + objeto.equipamiento.ataque;
    }

    // Devolvemos el objeto 'arma' con el nombre y el daño del arma seleccionada.
    return arma;
  },
  ataque: (atacante, arma, atacado) => {

    // Variable que almacenará el valor de daño calculado en el ataque.
    let dano;

    // Comprobamos si el atacante es un héroe. Para esto usamos el atributo 'equipo'.
    if (atacante.equipo === 'heroes') {
      // Si es un héroe, calculamos el daño comparando la defensa del enemigo con el daño del arma.
      // El daño se obtiene restando el valor de defensa del enemigo al daño del arma.
      dano = atacado.defensa - arma.dano;

      // Actualizamos los puntos de vida del enemigo tras el ataque. Si el valor de 'dano' es positivo,
      // significa que la defensa del enemigo no fue suficiente para bloquear todo el daño, por lo que 
      // se reduce la vida en consecuencia.
      atacado.vida += dano;

    } else {
      // Si el atacante es un enemigo, se realiza la misma lógica pero aplicada a los héroes.
      // Aquí se compara la defensa del héroe con el daño del arma del enemigo.
      dano = atacado.equipamiento.defensa - arma.dano;

      if (dano < 0) {
        // Se actualizan los puntos de vida del héroe atacado, restando el valor calculado del daño.
        atacado.vida += dano;

      } else {
        atacado.equipamiento.defensa -= dano + 1;
        console.log(`El ataque se estrella contra la ${atacado.equipamiento.armadura}
            de ${atacado.nombre} y reduce su eficacia en ${dano} puntos`);

      }

    }

    // En caso de que el daño resultante sea menor que 1 (es decir, negativo), lo multiplicamos por -1
    // para convertirlo en un valor positivo, ya que no tendría sentido que un ataque "cure" al objetivo.
    if (dano < 1) {
      dano *= -1;
    }

    console.log(`${atacante.nombre} ataca a ${atacado.nombre} 
        con ${arma.nombre} y le hace ${dano} puntos de daño. A 
        ${atacado.nombre} le quedan ${atacado.vida} puntos de vida.`);

  },
  verificarVida: (objeto) => {

    let estaVivo = true;

    // Si la vida del objeto es menor o igual a 0, el objeto está muerto.
    if (objeto.vida <= 0) {

      estaVivo = false;
    }

    return estaVivo;
  },
  seleccionarRecompensa: (enemigo) => {
    // Seleccionamos una recompensa aleatoria del array de recompensas del enemigo
    const indiceAleatorio = logicaJuego.crearAleatorio(0, enemigo.recompensa.length - 1);
    return enemigo.recompensa[indiceAleatorio];

  }


}

export default logicaJuego;