function logicaJuego() {

  // Array que contendrá a los héroes para seleccionar aleatoriamente.
  const heroes = [];

  // Variable que contendrá una lista de enemigos creados.
  let enemigos = [];

  // Array de objetos que contiene la información básica de los enemigos.
  // Cada objeto incluye nombre, arma y atributos de ataque, defensa y vida que serán calculados más tarde.
  const datosEnemigos = [
    {
      nombre: "Dragón Sombrío",
      arma: "Aliento de fuego corrupto",
      ataque: null,
      defensa: null,
      vida: null,
      recompensa: ["Tesoro legendario", "500 monedas de oro", "Gema mística", "Escamas de dragón"]
    },
    {
      nombre: "Orco de las Montañas",
      arma: "Gran hacha de guerra",
      ataque: null,
      defensa: null,
      vida: null,
      recompensa: ["100 monedas de oro", "Equipo orco", "Hacha de batalla", "Amuleto de resistencia"]
    },
    {
      nombre: "Nigromante Oscuro",
      arma: "Bastón de almas",
      ataque: null,
      defensa: null,
      vida: null,
      recompensa: ["200 monedas de oro", "Libro de hechizos oscuros", "Varita de huesos", "Piedra de almas"]
    },
    {
      nombre: "Troll de la Ciénaga",
      arma: "Maza de huesos",
      ataque: null,
      defensa: null,
      vida: null,
      recompensa: ["50 monedas de oro", "Piel de troll", "Fragmento de hueso", "Elixir regenerativo"]
    },
    {
      nombre: "Guerrero Centauro",
      arma: "Lanza larga encantada",
      ataque: null,
      defensa: null,
      vida: null,
      recompensa: ["150 monedas de oro", "Lanza encantada", "Escudo de batalla", "Botas de velocidad"]
    },
    {
      nombre: "Serpiente Basilisco",
      arma: "Colmillos venenosos",
      ataque: null,
      defensa: null,
      vida: null,
      recompensa: ["80 monedas de oro", "Escamas de basilisco", "Veneno concentrado", "Anillo de toxicidad"]
    },
    {
      nombre: "Espectro del Abismo",
      arma: "Espada de sombras",
      ataque: null,
      defensa: null,
      vida: null,
      recompensa: ["300 monedas de oro", "Fragmento de oscuridad eterna", "Capa espectral", "Cristal sombrío"]
    },
    {
      nombre: "Harpía Alada",
      arma: "Garras afiladas",
      ataque: null,
      defensa: null,
      vida: null,
      recompensa: ["70 monedas de oro", "Plumas mágicas", "Collar de viento", "Daga afilada"]
    },
    {
      nombre: "Gigante de Piedra",
      arma: "Martillo de roca",
      ataque: null,
      defensa: null,
      vida: null,
      recompensa: ["400 monedas de oro", "Roca encantada", "Martillo pesado", "Amuleto de fuerza"]
    },
    {
      nombre: "Goblin Asesino",
      arma: "Dagas envenenadas",
      ataque: null,
      defensa: null,
      vida: null,
      recompensa: ["30 monedas de oro", "Veneno goblin", "Capa ligera", "Botas furtivas"]
    }
  ];

  /**
   * Función para crear un array de héroes. Cada héroe tiene varios atributos:
   * nombre, raza, equipamiento (armas y armadura), vida, ataque y defensa.
   * Estos héroes son personajes predefinidos en el juego.
   */
  function arrayHeroes(heroes) {
    // Añadimos varios héroes al array usando la función 'crearHeroe'.
    heroes.push(crearHeroe('Tanis', 'Semielfo', { nombre: 'Arco', dano: 3 }, { nombre: 'Espada', dano: 2 }, 'Ropa élfica', 200, 10, 8));
    heroes.push(crearHeroe('Flint', 'Enano', { nombre: 'Hacha', dano: 2 }, { nombre: 'Ballesta', dano: 1 }, 'Cota de malla', 180, 12, 9));
    heroes.push(crearHeroe('Tas', 'Kender', { nombre: 'Honda', dano: 4 }, { nombre: 'Daga', dano: 2 }, 'Armadura de cuero', 150, 8, 7));

    // Devolvemos el array completo de héroes.
    return heroes;
  }

  /**
   * Función que crea un héroe con atributos personalizados.
   * @param {string} nombre - El nombre del héroe.
   * @param {string} raza - La raza del héroe (ej: Enano, Semielfo).
   * @param {object} principal - El arma principal del héroe.
   * @param {object} secundaria - El arma secundaria del héroe.
   * @param {string} armadura - La armadura del héroe.
   * @param {number} vida - La cantidad de vida del héroe.
   * @param {number} ataque - El valor de ataque del héroe.
   * @param {number} defensa - El valor de defensa del héroe.
   * @returns {object} Un objeto que representa al héroe.
   */

  function crearHeroe(nombre, raza, principal, secundaria, armadura, vida, ataque, defensa) {
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
    };

    return heroe; // Devolvemos el héroe creado.
  }

  // Llamamos a la función 'arrayHeroes' para generar el array de héroes y lo mostramos en la consola.
  arrayHeroes(heroes);

  /**
   * Función que crea un enemigo con atributos personalizados.
   * @param {string} nombre - El nombre del enemigo.
   * @param {string} arma - El arma del enemigo.
   * @param {number} ataque - El valor de ataque del enemigo.
   * @param {number} defensa - El valor de defensa del enemigo.
   * @param {number} vida - La cantidad de vida del enemigo.
   * @returns {object} Un objeto que representa al enemigo.
   */

  function crearEnemigo(nombre, arma, ataque, defensa, vida, recompensa) {
    const enemigo = {
      nombre: nombre,
      arma: arma,
      ataque: ataque,
      defensa: defensa,
      equipo: 'enemigos',
      vida: vida,
      recompensa: recompensa

    };

    return enemigo; // Devolvemos el enemigo creado.
  }

  /**
   * Función que selecciona aleatoriamente un enemigo del array 'datosEnemigos',
   * generando sus atributos de ataque, defensa y vida con valores aleatorios.
   * @param {array} datosEnemigos - Array que contiene la información básica de los enemigos.
   * @returns {object} Un enemigo con sus atributos generados.
   */
  function seleccionarEnemigo(datosEnemigos) {
    // Generamos un índice aleatorio para seleccionar un enemigo.
    const indice = crearAleatorio(0, datosEnemigos.length - 1);

    // Creamos el enemigo seleccionado con atributos aleatorios de ataque, defensa y vida.
    const enemigo = crearEnemigo(datosEnemigos[indice].nombre,
      datosEnemigos[indice].arma,
      datosEnemigos[indice].ataque = crearAleatorio(7, 10), // Ataque aleatorio entre 7 y 10.
      datosEnemigos[indice].defensa = crearAleatorio(3, 6), // Defensa aleatoria entre 1 y 5.
      datosEnemigos[indice].vida = crearAleatorio(25, 40), // Vida aleatoria entre 25 y 40.
      datosEnemigos[indice].recompensa);

    return enemigo; // Devolvemos el enemigo con atributos generados.
  }

  /**
   * Función que genera un array de enemigos seleccionados aleatoriamente.
   * Se seleccionan 4 enemigos del array 'datosEnemigos' y se añaden al array de enemigos.
   * @returns {array} Array de enemigos.
   */
  function arrayEnemigos() {
    const arrayEnemigos = [];

    // Seleccionamos 4 enemigos de forma aleatoria.
    for (let i = 0; i < 4; i++) {
      arrayEnemigos.push(seleccionarEnemigo(datosEnemigos));
    }

    return arrayEnemigos; // Devolvemos el array de enemigos.
  }

  // Generamos y asignamos los enemigos.
  enemigos = arrayEnemigos();

  // Mostramos los enemigos en la consola.
  // console.log(enemigos);

  console.log(`Nuestros héroes consiguen llegar al interior de la cripta del rey Torhann IV y se encuentran los siguientes enemigos:`);

  enemigos.forEach(enemigo => {
    console.log(`- ${enemigo.nombre}`);

  });

  console.log(`Sin tiempo que perder se enzarzan en una frénetica batalla todos contra todos, que describimos a continuación:`);



  /**
   * Función que simula una batalla entre los héroes y los enemigos.
   * Se seleccionan un héroe y un enemigo aleatoriamente para combatir en cada turno.
   * @param {array} heroes - Array de héroes.
   * @param {array} enemigos - Array de enemigos.
   */
  function batalla(heroes, enemigos) {
    // Indicador de turno (true para turno de héroes, false para turno de enemigos).
    let turnoHeroes = true;
    let i_atacante;
    let i_target;
    let heroe;
    let enemigo;
    let recompensas = [];

    while (enemigos.length !== 0) {


      if (turnoHeroes) {
        // Selección aleatoria de un héroe atacante y un enemigo objetivo.
        i_atacante = crearAleatorio(0, heroes.length - 1);
        i_target = crearAleatorio(0, enemigos.length - 1);

        heroe = heroes[i_atacante];
        enemigo = enemigos[i_target];

        // Mostramos en consola el héroe y enemigo seleccionados para la batalla.
        // console.log(`Héroe seleccionado: ${JSON.stringify(heroe)}`);
        // console.log(`Enemigo seleccionado: ${JSON.stringify(enemigo)}`);

        atacarTarget(heroe, enemigo);

        if (!verificarVida(enemigo)) {
          heroe.muertes++;
          heroe.asesinados.push(enemigo.nombre)
          let recompensa = seleccionarRecompensa(enemigo)
          heroe.recompensas.push(recompensa)
          enemigos.splice(i_target, 1)
          console.log(`El ${enemigo.nombre} lanza un grito agudo cuando ${heroe.nombre} lo derriba con un solo golpe. dejando caer ${recompensa} mientras su sangre se esparce por el suelo lentamente.
`);
        }

        turnoHeroes = false; // Cambiamos el turno a enemigos.

      } else {
        // Selección aleatoria de un enemigo atacante y un héroe objetivo.
        i_atacante = crearAleatorio(0, enemigos.length - 1);
        i_target = crearAleatorio(0, heroes.length - 1);

        enemigo = enemigos[i_atacante];
        heroe = heroes[i_target];


        // Mostramos en consola el héroe y enemigo seleccionados.
        // console.log(`Héroe seleccionado: ${JSON.stringify(heroe)}`);
        // console.log(`Enemigo seleccionado: ${JSON.stringify(enemigo)}`);

        atacarTarget(enemigo, heroe);

        turnoHeroes = true; // Cambiamos el turno a héroes.
      }
    }

    console.log('Resumen de la batalla');

    heroes.forEach(heroe => {
      if (heroe.muertes > 0) {
        console.log(`${heroe.nombre} asesinó a ${heroe.muertes} enemigos
            ${heroe.asesinados} 
            y obtuvo las siguientes recompensas:
            ${heroe.recompensas}`);
      } else {
        console.log(`A ${heroe.nombre} no le dio tiempo a matar a nadie, sus compañeros hicieron todo el trabajo sucio por él.`);

      }

    });



    heroes.forEach(heroe => {
      recompensas.push(...heroe.recompensas.slice(0, heroe.recompensas.length))

    });

    console.log(`Los héroes han obtenido las siguientes recompensas: ${recompensas}`);

  }

  /**
   * Función que gestiona el ataque de un personaje (atacante) a otro (atacado).
   * Esta función selecciona un arma adecuada según si el atacante es un héroe o un enemigo,
   * y luego ejecuta el ataque utilizando la función 'ataque'.
   * 
   * @param {object} atacante - El objeto que representa al personaje atacante (puede ser héroe o enemigo).
   * @param {object} atacado - El objeto que representa al personaje atacado (puede ser héroe o enemigo).
   */
  function atacarTarget(atacante, atacado) {
    // Inicializamos el objeto 'arma' que contendrá el nombre y el daño del arma utilizada en el ataque.
    let arma = {};

    // Si el atacante es un héroe, se selecciona un arma del equipamiento del héroe.
    if (atacante.equipo === 'heroes') {
      // Llamamos a la función 'elegirArma' que selecciona aleatoriamente un arma del héroe (puede ser principal o secundaria).
      arma = elegirArma(atacante);
    } else {
      // Si el atacante es un enemigo, asignamos su arma predefinida al objeto 'arma' con su nombre y daño.
      arma.nombre = atacante.arma;  // Se asigna el nombre del arma del enemigo.
      arma.dano = atacante.ataque;  // Se asigna el valor del daño del enemigo.
    }

    // Realizamos el ataque llamando a la función 'ataque', que procesa el daño y los efectos del ataque.
    ataque(atacante, arma, atacado);
  }

  /**
   * Función que selecciona un arma para un héroe de forma aleatoria entre su arma principal y secundaria.
   * @param {object} objeto - El objeto que representa al héroe (que contiene su equipamiento).
   * @returns {object} Un objeto que representa el arma seleccionada, con su nombre y valor de daño.
   */
  function elegirArma(objeto) {
    // Generamos un número aleatorio entre 1 y 10 para determinar qué arma se seleccionará.
    let aleatorio = crearAleatorio(1, 10);

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
  }

  /**
   * Función que realiza el ataque de un personaje (héroe o enemigo) a otro, calculando el daño
   * basado en el arma del atacante y la defensa del atacado. Además, actualiza la vida del objetivo
   * y muestra en consola un resumen del ataque.
   * 
   * @param {Object} atacante - El personaje que realiza el ataque (puede ser un héroe o un enemigo).
   * @param {Object} arma - El arma utilizada por el atacante para infligir daño (contiene el nombre y el valor del daño).
   * @param {Object} atacado - El personaje que recibe el ataque (puede ser un héroe o un enemigo).
   */
  function ataque(atacante, arma, atacado) {
    // Muestra en la consola el arma seleccionada por el atacante.
    // eliminar console.log(arma);

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

    // Mostramos un mensaje en la consola que describe el ataque realizado. Incluye:
    // - El nombre del atacante.
    // - El nombre del enemigo o héroe atacado.
    // - El arma utilizada en el ataque.
    // - Los puntos de daño realizados.
    // - Los puntos de vida restantes del objetivo atacado después del golpe.
    console.log(`${atacante.nombre} ataca a ${atacado.nombre} 
      con ${arma.nombre} y le hace ${dano} puntos de daño. A 
      ${atacado.nombre} le quedan ${atacado.vida} puntos de vida.`);
  }

  // Probamos la batalla entre héroes y enemigos.
  batalla(heroes, enemigos);

  /**
   * Función que verifica si un personaje sigue vivo (vida > 0).
   * @param {object} objeto - Objeto que representa al héroe o enemigo.
   * @returns {boolean} true si está vivo, false si está muerto.
   */
  function verificarVida(objeto) {

    let estaVivo = true;

    // Si la vida del objeto es menor o igual a 0, el objeto está muerto.
    if (objeto.vida <= 0) {

      estaVivo = false;
    }

    return estaVivo;
  }

  function seleccionarRecompensa(enemigo) {
    // Seleccionamos una recompensa aleatoria del array de recompensas del enemigo
    const indiceAleatorio = crearAleatorio(0, enemigo.recompensa.length - 1);
    return enemigo.recompensa[indiceAleatorio];

  }

  /**
   * Función que genera un número aleatorio entre un rango de valores.
   * @param {number} min - Valor mínimo del rango.
   * @param {number} max - Valor máximo del rango.
   * @returns {number} Un número aleatorio entre min y max, ambos inclusive.
   */
  function crearAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}

export default logicaJuego;
