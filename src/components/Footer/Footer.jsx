import React from 'react';
import './Footer.css';
import { FaFacebook, FaGithub } from "react-icons/fa6";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-info">
        <p>&copy; 2024 Yulian Borges Lobaina | Estudiante de Desarrollo de Aplicaciones Web</p>
        <p>Instituto de Formación Profesional Nebrija</p>
        <p>Email: <a href="mailto:pepe@gmail.com">yborges2005@gmail.com</a></p>
      </div>
      <div className="footer-social">
        <a href="https://github.com/SlytherinEC" target="_blank" aria-label="GitHub">
          <i className="fab fa-github"><FaGithub /></i>
        </a>
        <a href="https://www.linkedin.com/in/yulian-borges-lobaina" target="_blank" aria-label="LinkedIn">
          <i className="fab fa-linkedin"><FaFacebook /></i>
        </a>
      </div>
    </div>)
}

export default Footer