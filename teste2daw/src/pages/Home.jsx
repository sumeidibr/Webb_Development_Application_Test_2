import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/style/home.css"; 

const Home = () => {
  // Estado para armazenar a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState("");

  // Função para tratar a mudança na seleção da categoria
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

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

            <div className="home-container-img"> </div>
          </div>

          {/* Filtro de Categoria */}
          <div className="category-filter">
            <h3>Filtrar por Categoria</h3>
            <select 
              value={selectedCategory} 
              onChange={handleCategoryChange} 
              className="category-select"
            >
              <option value="">Selecione uma Categoria</option>
              <option value="ficcao">Ficção</option>
              <option value="romance">Romance</option>
              <option value="aventura">Aventura</option>
              <option value="sci-fi">Ficção Científica</option>
              <option value="biografia">Biografia</option>
              <option value="historia">História</option>
            </select>
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

          {/* Exibição dos livros com base na categoria selecionada */}
          <div className="shop-container">
            <Link to="/detalhes">
              <div className="box">
                <img src="teste3-removebg-preview.png" alt=""/>
                <h2>Nike Therma</h2>
                <span>70.88$</span>
                <button>Sandals</button>
              </div>
            </Link>
            {/* Adicione mais livros com base na categoria */}
            {/* Exemplo de livro */}
          </div>
        </article>
      </main>
    </div>
  );
};

export default Home;
