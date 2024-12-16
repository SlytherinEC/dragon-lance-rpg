import React from 'react'
import './BarraVida.css'

function BarraVida(vida) {
  
  return (
    <progress max="100" value={vida.value ?? 100}></progress>
  )
}

export default BarraVida