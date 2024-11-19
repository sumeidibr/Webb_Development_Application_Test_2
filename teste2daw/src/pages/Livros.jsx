import React, { useState } from "react";
import "../assets/style/livros.css"; // CSS personalizado

const Livros = () => {
  const [livros, setLivros] = useState([
    {
      id: 1,
      titulo: "Exemplo de Título",
      autor: "Exemplo de Autor",
      obra: "Ficção",
      categoria: "Aventura",
      status: "Disponível",
      edicao: "1ª",
      editora: "Exemplo Editora",
    },
    {
      id: 2,
      titulo: "Outro Título",
      autor: "Outro Autor",
      obra: "Mistério",
      categoria: "Suspense",
      status: "Indisponível",
      edicao: "2ª",
      editora: "Exemplo Editora",
    },
    // Adicione mais livros conforme necessário
  ]);

  const [filtroCategoria, setFiltroCategoria] = useState("");

  const handleFiltroCategoria = (e) => {
    setFiltroCategoria(e.target.value);
  };

  const livrosFiltrados = livros.filter((livro) =>
    filtroCategoria ? livro.categoria === filtroCategoria : true
  );

  const toggleDisponibilidade = (id) => {
    setLivros((prevLivros) =>
      prevLivros.map((livro) =>
        livro.id === id
          ? { ...livro, status: livro.status === "Disponível" ? "Indisponível" : "Disponível" }
          : livro
      )
    );
  };

  return (
    <div className="livros-container">
      <h2>Gerenciamento de Livros</h2>

      {/* Filtro por Categoria */}
      <div className="filtro-categoria">
        <label htmlFor="categoria">Filtrar por Categoria: </label>
        <select
          id="categoria"
          value={filtroCategoria}
          onChange={handleFiltroCategoria}
        >
          <option value="">Todas</option>
          <option value="Aventura">Aventura</option>
          <option value="Suspense">Suspense</option>
          <option value="Ficção">Ficção</option>
          {/* Adicione outras categorias conforme necessário */}
        </select>
      </div>

      <table className="livros-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Obra</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Edição</th>
            <th>Editora</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          {livrosFiltrados.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.id}</td>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.obra}</td>
              <td>{livro.categoria}</td>
              <td>{livro.status}</td>
              <td>{livro.edicao}</td>
              <td>{livro.editora}</td>
              <td>
                <button className="btn-update">Atualizar</button>
                <button className="btn-delete">Eliminar</button>
                <button
                  className="btn-toggle"
                  onClick={() => toggleDisponibilidade(livro.id)}
                >
                  {livro.status === "Disponível" ? "Indisponibilizar" : "Disponibilizar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Livros;
