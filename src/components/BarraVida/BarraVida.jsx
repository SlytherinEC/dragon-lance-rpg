import React from 'react'
import './BarraVida.css'

function BarraVida(vida) {
  // console.log(vida);
  
  return (
    <progress max="100" value={vida.value ?? 100}></progress>
  )
}

export default BarraVida