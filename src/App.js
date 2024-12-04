import './App.css';
import Pantalla from './components/Pantalla/Pantalla';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {

  // Primero iniciamos el juego

  return (
    <div className="App">

      <Header />
      <Pantalla />
      <Footer />

    </div>
  );
}

export default App;
