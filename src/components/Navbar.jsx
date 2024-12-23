import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import sino from "../assets/sino.png"; // Ícone do sino
import boneco from "../assets/do-utilizador.png"; // Ícone do boneco
import lapis from "../assets/ferramenta-lapis.png"; // Ícone do lápis
import SetaBaixo from "../assets/sinal-baixo.png"; // Ícone seta para baixo
import SetaDireita from "../assets/seta-direita.png"; // Ícone seta para direita
import Sair from "../assets/sair.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(""); // Controla qual menu está expandido
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu); // Alterna o submenu
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

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
          <img src={sino} alt="Sino de notificações" className="notification-icon" />
          <span className="user-initials">SP</span>
          <p>SISTEMA OPPAY</p>
        </div>
      </nav>

      <div ref={menuRef} className={`sidebar ${menuOpen ? "open" : ""}`}>
  <div className="sidebar-header">
    <h2>mobyan</h2>
  </div>
  <ul className="sidebar-menu">
    <li className="sidebar-item">
      <img src={boneco} alt="Ícone de Técnico" className="icon" />
      Técnico
      <img
        src={activeMenu === "cadastros" ? SetaBaixo : SetaDireita}
        alt="Seta"
        className="arrow-icon"
      />
    </li>
    <li
      className={`sidebar-item ${activeMenu === "cadastros" ? "active" : ""}`}
      onClick={() => toggleSubMenu("cadastros")}
    >
      <img src={lapis} alt="Ícone de Cadastros" className="icon" />
      Cadastros
      <img
        src={activeMenu === "cadastros" ? SetaBaixo : SetaDireita}
        alt="Seta"
        className="arrow-icon"
      />
    </li>
    {activeMenu === "cadastros" && (
      <ul className="sidebar-submenu">
        <li>
          <img src={SetaDireita} alt="Seta Direita" className="arrow-icon" />
          Parâmetro de itens
        </li>
        <li>
          <img src={SetaDireita} alt="Seta Direita" className="arrow-icon" />
          Equipamento
        </li>
        <li>
          <img src={SetaDireita} alt="Seta Direita" className="arrow-icon" />
          Família
        </li>
        <li>
          <img src={SetaDireita} alt="Seta Direita" className="arrow-icon" />
          Modelo
        </li>
        <li>
          <img src={SetaDireita} alt="Seta Direita" className="arrow-icon" />
          Prestador
        </li>
        <li>
          <img src={SetaDireita} alt="Seta Direita" className="arrow-icon" />
          Prestador Responsável
        </li>
      </ul>
    )}
  </ul>
  <div className="logout-container">
  
    <li className="sidebar-item logout"><img src={Sair} alt="Seta Direita" className="arrow-icon" />Sair</li>
  </div>
</div>
    </div>
  );
};

export default Navbar;
