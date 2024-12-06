import React from 'react'
import './Boton.css';

function Boton({ texto, onClick }) {
    return (
        <button className="btn-juego" onClick={onClick}>{texto}</button>
    )
}

export default Boton;