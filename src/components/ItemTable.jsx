import React from "react";
import "./ItemTable.css";

const ItemTable = ({ items, detailsVisible, onEdit, onToggleStatus }) => {
  return (
    <table className="item-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Nível de Gravidade</th>
          <th>Dias para Resolução</th>
          <th>Status</th>
          {detailsVisible && (
            <>
              <th>Última Edição</th>
              <th>Editor</th>
            </>
          )}
          <th>Edição</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            
          </tr>
        ) : (
          items.map((item) => (
            <tr key={item.id} className={!item.status ? "inactive-row" : ""}>
              <td>{item.item}</td>
              <td>{item.nivel}</td>
              <td>{item.dias}</td>
              <td>
                <label className="status-toggle">
                  <input
                    type="checkbox"
                    checked={item.status}
                    onChange={() => onToggleStatus(item.id)} // Alterna o status
                  />
                  <span className="slider"></span>
                </label>
              </td>
              {detailsVisible && (
                <>
                  <td>{item.ultimaEdicao}</td>
                  <td>{item.editor}</td>
                </>
              )}
              <td>
                <button className="edit-button" onClick={() => onEdit(item)}>
                  ✏️
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ItemTable;
