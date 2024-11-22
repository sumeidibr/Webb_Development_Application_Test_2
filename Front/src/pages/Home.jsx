import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/style/home.css"; 

const Home = () => {
  const [livros, setLivros] = useState([]); // Estado para armazenar os livros
  const [categorias, setCategorias] = useState([]); // Estado para armazenar categorias
  const [selectedCategory, setSelectedCategory] = useState(""); // Categoria selecionada
  const [authorSearch, setAuthorSearch] = useState(""); // Termo de pesquisa por autor
  const [error, setError] = useState(null); // Para capturar erros da API

  // Buscar livros e categorias da API
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/books");
        if (!response.ok) {
          throw new Error("Erro ao carregar livros");
        }
        const data = await response.json();
        setLivros(data); // Atualiza o estado com os livros
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categorias");
        if (!response.ok) {
          throw new Error("Erro ao carregar categorias");
        }
        const data = await response.json();
        setCategorias(data); // Atualiza o estado com as categorias
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLivros();
    fetchCategorias();
  }, []);

  // Filtrar livros pela categoria e pelo autor
  const livrosFiltrados = livros.filter((livro) => {
    const matchCategory = selectedCategory
      ? livro.categoria_id === categorias.find((cat) => cat.nome === selectedCategory)?.categoria_id
      : true;
    const matchAuthor = livro.autor.toLowerCase().includes(authorSearch.toLowerCase());
    return matchCategory && matchAuthor;
  });

  return (
    <div className="content">
      <main>
        <article>
          {/* Section 1 */}
          <div className="Container">
            <div className="home-container">
              <h2>dondzissa kaya</h2>
              <p>
                Conheça os últimos lançamentos <br />
                dos best-sellers
              </p>
              <button id="shop_now">Comprar</button>
            </div>

            <div className="home-container-img">

            </div>
          </div>

          {/* Section 2 */}
          <div className="Advantages-Container">
            <div className="Discount">
              <p>Descontos todas semanas</p>
            </div>
            <div>
              <p>Suporte 24/7 dias</p>
            </div>
            <div>
              <p>Entrega ao domicílio</p>
            </div>
            <div>
              <p>Pagamento seguro</p>
            </div>
          </div>

          {/* Filtros */}
          <div className="filters-container">
            <div className="category-filter">
              <h3>Filtrar por Categoria</h3>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)} 
                className="category-select"
              >
                <option value="">Todas as Categorias</option>
                {categorias.map((categoria) => (
                  <option key={categoria.categoria_id} value={categoria.nome}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="author-filter">
              <h3>Pesquisar por Autor</h3>
              <input
                type="text"
                value={authorSearch}
                onChange={(e) => setAuthorSearch(e.target.value)}
                placeholder="Digite o nome do autor"
                className="author-search-input"
              />
            </div>
          </div>

          {/* Exibição dos livros com base nos filtros */}
          <div className="shop-container">
            {livrosFiltrados.length > 0 ? (
              livrosFiltrados.map((livro) => (
                <Link to={`/detalhes/${livro.id_livro}`} key={livro.id_livro}>
                  <div className="box">
                    <h2>{livro.titulo}</h2>
                    <h2>{livro.autor}</h2>
                    <span>{livro.preco} $</span>
                    <button>Detalhes</button>
                  </div>
                </Link>
              ))
            ) : (
              <p>Nenhum livro encontrado com os critérios selecionados.</p>
            )}
          </div>
        </article>
      </main>
    </div>
  );
};

export default Home;
