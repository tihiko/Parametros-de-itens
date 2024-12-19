import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Referência para o menu lateral

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fecha o menu ao clicar fora
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    // Adiciona o Event Listener ao montar o componente
    document.addEventListener("mousedown", handleClickOutside);

    // Remove o Event Listener ao desmontar o componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="menu-container">
          <button className="menu-button" onClick={toggleMenu}>
            <span className="menu-icon">☰</span>
          </button>
          <h1>Parâmetro de itens</h1>
        </div>
        <div className="user-section">
          <span>SP</span>
          <p>SISTEMA OPPAY</p>
        </div>
      </nav>

      {/* Menu Lateral */}
      <div
        ref={menuRef}
        className={`sidebar ${menuOpen ? "open" : ""}`}
      >
        <div className="sidebar-header">
          <h2>mobyan</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-item">Técnico</li>
          <li className="sidebar-item">Cadastros</li>
          <ul className="sidebar-submenu">
            <li>Parâmetro de itens</li>
            <li>Equipamento</li>
            <li>Família</li>
            <li>Modelo</li>
            <li>Prestador</li>
            <li>Prestador Responsável</li>
          </ul>
          <li className="sidebar-item logout">Sair</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
