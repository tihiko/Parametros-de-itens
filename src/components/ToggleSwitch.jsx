import React from 'react'; 
import "./ToggleSwitch.css"; 
const ToggleSwitch = ({ isOn }) => { 
    return ( 
    <label className="switch"> 
    <input type="checkbox" checked={isOn} readOnly /> 
    <span className="slider round"></span> 
    </label> 
    ); 
}; 
export default ToggleSwitch;