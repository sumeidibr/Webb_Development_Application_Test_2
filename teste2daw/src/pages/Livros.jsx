import React, { useState, useEffect } from "react";
import "../assets/style/livros.css"; // CSS personalizado

const Livros = () => {
  const [livros, setLivros] = useState([]); // Estado para armazenar os livros
  const [filtroCategoria, setFiltroCategoria] = useState(""); // Estado para filtro de categoria
  const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias
  const [error, setError] = useState(null); // Estado para armazenar erros da requisição

  // Carregar os livros e categorias da API quando o componente for montado
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/books');
        if (!response.ok) {
          throw new Error('Erro ao carregar livros');
        }
        const data = await response.json();
        setLivros(data); // Armazena os livros no estado
      } catch (error) {
        setError(error.message); // Armazena o erro, se houver
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categorias');
        if (!response.ok) {
          throw new Error('Erro ao carregar categorias');
        }
        const data = await response.json();
        setCategorias(data); // Armazena as categorias no estado
      } catch (error) {
        setError(error.message); // Armazena o erro, se houver
      }
    };

    fetchLivros(); // Chama a função para carregar os livros
    fetchCategorias(); // Chama a função para carregar as categorias
  }, []); // O array vazio significa que o efeito será executado apenas uma vez, quando o componente for montado

  const handleFiltroCategoria = (e) => {
    setFiltroCategoria(e.target.value);
  };

  // Função para obter o nome da categoria com base no ID
  const getCategoriaNome = (categoriaId) => {
    const categoria = categorias.find((cat) => cat.categoria_id === categoriaId);
    return categoria ? categoria.nome : "Categoria não encontrada";
  };

  const livrosFiltrados = livros.filter((livro) =>
    filtroCategoria ? getCategoriaNome(livro.categoria_id) === filtroCategoria : true
  );

  // Função para atualizar o status de um livro (disponibilizar ou indisponibilizar)
  const atualizarStatusLivro = async (id, status) => {
    const url = status === "ativo"
      ? `http://localhost:3005/api/books/ativar/${id}`
      : `http://localhost:3005/api/books/desativar/${id}`;
    
    try {
      console.log(`Fazendo requisição para ${url}`);
      const response = await fetch(url, { method: 'PUT' });
      if (!response.ok) {
        throw new Error(`Erro ao ${status === "ativo" ? "disponibilizar" : "indisponibilizar"} livro`);
      }
      
      // Atualiza o estado dos livros após a mudança de status
      setLivros((prevLivros) =>
        prevLivros.map((livro) =>
          livro.id_livro === id
            ? { ...livro, status: status === "ativo" ? "ativo" : "inativo" }
            : livro
        )
      );

      // Exibe um alerta para o usuário
      alert(`Livro ${status === "ativo" ? "disponibilizado" : "indisponibilizado"} com sucesso!`);
    } catch (error) {
      setError(error.message); // Exibe erro caso ocorra
      console.error("Erro:", error); // Exibe no console se houver erro
      alert("Erro ao alterar o status do livro.");
    }
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
          {categorias.map((categoria) => (
            <option key={categoria.categoria_id} value={categoria.nome}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Exibe a tabela de livros */}
      <table className="livros-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          {livrosFiltrados.map((livro) => (
            <tr key={livro.id_livro}>
              <td>{livro.id_livro}</td>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.preco}</td>
              <td>{livro.quantidade}</td>
              <td>{getCategoriaNome(livro.categoria_id)}</td>
              <td>{livro.status === "ativo" ? "Disponível" : "Indisponível"}</td>
              <td>
                <button className="btn-update">Atualizar</button>
                <button className="btn-delete">Eliminar</button>
                <button
                  className="btn-toggle"
                  onClick={() =>
                    atualizarStatusLivro(
                      livro.id_livro,
                      livro.status === "ativo" ? "inativo" : "ativo"
                    )
                  }
                >
                  {livro.status === "ativo" ? "Indisponibilizar" : "Disponibilizar"}
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
