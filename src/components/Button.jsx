import React from "react";
import "./Button.css"; // Importa o CSS específico

const Button = ({ label, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
