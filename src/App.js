import './App.css';
import Pantalla from './components/Pantalla/Pantalla';
import logoDragonLance from '../src/img/dragonlance-logo.png';
import Info from './components/Info/Info';
import datosEnemigos from "./data/datosEnemigos.json";
import datosHeroes from "./data/datosHeroes.json";
import Heroe from './components/Heroe/Heroe';
import { useState } from 'react';
import logicaJuego from './utils/LogicaJuego';
import Footer from './components/Footer/Footer';


function App() {

  const datosE = datosEnemigos;
  const datosH = datosHeroes;

  const [estadoJuego, setEstadoJuego] = useState('inicio');
  const [arrayEnemigos, setArrayEnemigos] = useState([]); 

  // Primero iniciamos el juego

  return (
    <div className="App">
      <header className='header'>
        <img
          className='dragonlance-logo'
          src={logoDragonLance}
          alt='Imagen del logo de DragonLance'
        />
      </header>
      
      <div className='contenedor-principal'>
        <div className='contenedor-personajes'>
          {datosH.map((heroe, index) => (
            <Heroe key={index} heroe={heroe} />
          ))}
        </div>
        <Pantalla />
        <div className='contenedor-personajes'>

          <Info
            Id={logicaJuego.crearAleatorio(0, datosE.length - 1)}
          />
          <Info
            Id={logicaJuego.crearAleatorio(0, datosE.length - 1)}
          />
          <Info
            Id={logicaJuego.crearAleatorio(0, datosE.length - 1)}
          />
        </div>
      </div>
      <footer className='site-footer'>
          <Footer />
      </footer>
    </div>
  );
}

export default App;
