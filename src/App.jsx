import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ItemTable from "./components/ItemTable";
import "./App.css";

const App = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 5; // Número de itens por página

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const openNewItemSidebar = () => {
    setCurrentItem({ item: "", nivel: "", dias: "", ultimaEdicao: "", editor: "" });
    setSidebarOpen(true);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = now.toLocaleDateString("en-GB", options).replace(/\//g, "-");
    const time = now.toTimeString().slice(0, 5);
    return `${date} ${time}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...currentItem,
      ultimaEdicao: getCurrentDateTime(),
      editor: "Sistema OPPAY",
    };

    let updatedItems;
    if (currentItem.id) {
      // Atualiza um item existente
      updatedItems = items.map((item) =>
        item.id === currentItem.id ? updatedItem : item
      );
    } else {
      // Adiciona um novo item
      updatedItems = [...items, { ...updatedItem, id: items.length + 1, status: true }];
    }

    setItems(updatedItems); // Atualiza a lista completa de itens
    setFilteredItems(updatedItems); // Atualiza a lista filtrada
    setCurrentPage(1); // Reseta para a primeira página
    setSidebarOpen(false); // Fecha o menu lateral
    setCurrentItem(null); // Reseta o item atual
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setSidebarOpen(true);
  };

  const handleToggleStatus = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.item.toLowerCase() === searchTerm.toLowerCase()
        )
      );
    }
    setCurrentPage(1); // Reseta para a primeira página ao buscar
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Digite aqui"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Buscar
          </button>
        </div>
        <button className="btn" onClick={openNewItemSidebar}>
          Novo Item
        </button>
      </div>

      <div className="details-toggle-container">
        <label className="details-toggle">
          Visualizar mais detalhes
          <input
            type="checkbox"
            checked={detailsVisible}
            onChange={toggleDetails}
          />
          <span className="slider"></span>
        </label>
      </div>

      <ItemTable
        items={currentItems} // Exibe apenas os itens da página atual
        detailsVisible={detailsVisible}
        onEdit={handleEditItem}
        onToggleStatus={handleToggleStatus}
      />

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className={`new-item-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="return-header">
        <button className="back-button" onClick={toggleSidebar}>
            ← Voltar
          </button>
        </div>
        
        
        <div className="new-item-header">
          
          <h2>{currentItem?.id ? "Editar Item" : "Crie um novo item"}</h2>
        </div>
        <form className="new-item-form" onSubmit={handleSaveItem}>
          <label>Item</label>
          <input
            type="text"
            name="item"
            value={currentItem?.item || ""}
            onChange={handleChange}
            placeholder="Digite o nome do item"
            required
          />

          <label>Selecione o nível de gravidade</label>
          <select
            name="nivel"
            value={currentItem?.nivel || ""}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="Baixo">Baixo</option>
            <option value="Médio">Médio</option>
            <option value="Alto">Alto</option>
          </select>

          <label>Tempo de resolução (em dias)</label>
          <input
            type="number"
            name="dias"
            value={currentItem?.dias || ""}
            onChange={handleChange}
            placeholder="Digite o número em dias"
            required
          />

          <button type="submit" className="submit-button">
            {currentItem?.id ? "Salvar" : "Adicionar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
