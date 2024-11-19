import React from 'react';
import "../assets/style/homeAdmin.css"; // Importando o arquivo de estilo

const BookForm = () => {
  return (
    <form className="book-form">
      <h2>Adicionar Livro</h2>
      <input type="text" placeholder="Título" required />
      <input type="text" placeholder="Autor" required />
      <textarea placeholder="Descrição" required></textarea>
      <input type="number" placeholder="Preço" required />
      <input type="number" placeholder="Quantidade" required />
      
      {/* Adicionando o campo para selecionar a Categoria */}
      <select className="category-select" required>
        <option value="">Selecione a Categoria</option>
        <option value="ficcao">Ficção</option>
        <option value="romance">Romance</option>
        <option value="aventura">Aventura</option>
        <option value="sci-fi">Ficção Científica</option>
        <option value="biografia">Biografia</option>
        <option value="historia">História</option>
      </select>

      <button type="submit">Salvar</button>
    </form>
  );
};

export default BookForm;
