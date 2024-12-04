import React from 'react';
import './Footer.css';
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className='site-footer'>

      <div className="footer-container">
        <div className="footer-info">
          <p>&copy; 2024 Yulian Borges Lobaina | Estudiante de Desarrollo de Aplicaciones Web</p>
          <p>Instituto de Formación Profesional Nebrija</p>
        </div>
        <div className="footer-social">
          <a href="https://github.com/SlytherinEC" target="_blank" aria-label="GitHub">
            <i className="fab fa-github"><FaGithub /></i>
          </a>
          <a href="https://www.linkedin.com/in/yulian-borges-lobaina" target="_blank" aria-label="LinkedIn">
            <i className="fab fa-linkedin"><FaLinkedin /></i>
          </a>
          <a href="mailto:yborges2005@gmail.com" target="_blank" aria-label="Email"><MdEmail /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer