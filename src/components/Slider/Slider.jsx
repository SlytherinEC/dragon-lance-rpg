import React from 'react'
import './Slider.css'

function Slider() {
  return (
    <div class="slider">
      <button class="slider-button" id="prev">Atrás</button>
      <div class="slider-content">
        <div class="tarjeta" id="tarjeta-1">
          <h3>Personaje 1</h3>
          <p>Detalles del personaje 1</p>
        </div>
        <div class="tarjeta" id="tarjeta-2">
          <h3>Personaje 2</h3>
          <p>Detalles del personaje 2</p>
        </div>
        <div class="tarjeta" id="tarjeta-3">
          <h3>Personaje 3</h3>
          <p>Detalles del personaje 3</p>
        </div>
      </div>
      <button class="slider-button" id="next">Adelante</button>
    </div>
  )
}

export default Slider