import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../assets/style/detalhes.css";

const Detalhes = () => {
  const { id } = useParams(); // Obtém o ID do livro da URL
  const [livro, setLivro] = useState(null); // Armazena os detalhes do livro
  const [error, setError] = useState(null); // Armazena erros, se houver
  const navigate = useNavigate(); // Usado para redirecionar

  // Busca os detalhes do livro por ID
  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/books/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar os detalhes do livro");
        }
        const data = await response.json();
        setLivro(data); // Atualiza o estado com os detalhes do livro
      } catch (error) {
        setError(error.message); // Armazena o erro
      }
    };

    fetchLivro();
  }, [id]);

    // Adiciona o livro ao carrinho no Local Storage
    const addToCart = (livro) => {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      const quantityInStock = livro.quantidade || 0;
  
      // Verifique se o livro já está no carrinho
      const itemIndex = currentCart.findIndex((item) => item.id_livro === livro.id_livro);
  
      if (itemIndex !== -1) {
        // Se o livro já está no carrinho, apenas incrementa a quantidade
        const item = currentCart[itemIndex];
        if (item.quantity < quantityInStock) {
          item.quantity += 1;
          alert("Quantidade do livro atualizada no carrinho!");
        } else {
          alert("Quantidade máxima em estoque atingida!");
        }
      } else {
        // Se o livro não está no carrinho, adicione-o com a quantidade inicial
        currentCart.push({ ...livro, quantity: 1 }); // Inicia com a quantidade 1
        alert("Livro adicionado ao carrinho!");
      }
  
      // Atualiza o carrinho no localStorage
      localStorage.setItem("cart", JSON.stringify(currentCart));
    };

  // Função para adicionar o livro aos favoritos
  const addToFavorites = async () => {
    const userId = localStorage.getItem("userId"); // Obtém o ID do usuário do localStorage

    if (!userId) {
      alert("Você precisa estar logado para adicionar um favorito.");
      navigate("/login"); // Redireciona para a página de login
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/api/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_user: userId,
          id_livro: livro.id_livro,
        }),
      });

      if (response.ok) {
        alert("Livro adicionado aos favoritos!");
      } else {
        alert("Erro ao adicionar o livro aos favoritos.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão. Tente novamente mais tarde.");
    }
  };

  // Função para remover o livro dos favoritos
  const removeFromFavorites = async () => {
    const userId = localStorage.getItem("userId"); // Obtém o ID do usuário do localStorage

    if (!userId) {
      alert("Você precisa estar logado para remover um favorito.");
      navigate("/login"); // Redireciona para a página de login
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/favoritos/${userId}/${livro.id_livro}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Livro removido dos favoritos!");
      } else {
        alert("Erro ao remover o livro dos favoritos.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão. Tente novamente mais tarde.");
    }
  };

  // Caso ocorra um erro
  if (error) {
    return <p className="error-message">{error}</p>;
  }

  // Enquanto os dados do livro estão sendo carregados
  if (!livro) {
    return <p className="loading-message">Carregando...</p>;
  }

  return (
    <div className="container-detalhes-produto">
      <section>
        <div className="box-conteudo">
          {/* Coluna esquerda: Imagem */}
          <div className="col-esquerda">
            <div className="imagem-principal">
              <img
                src={livro.imagem || "default-image.jpg"} // Imagem do livro ou padrão
                alt={livro.titulo}
              />
            </div>
          </div>

          {/* Coluna direita: Detalhes do livro */}
          <div className="col-direita">
            <h1>{livro.titulo}</h1>
            <div className="informacao-tamanho">
              <p><strong>Autor:</strong> {livro.autor}</p>
              <p><strong>Preço:</strong> {livro.preco} $</p>
              <p><strong>Quantidade disponível:</strong> {livro.quantidade}</p>
              <p><strong>Categoria:</strong> {livro.categoria_nome}</p>
            </div>
            <h4>Descrição:</h4>
            <p>{livro.descricao || "Descrição não disponível."}</p>
            <button
              style={styles.button}
              onClick={() => addToCart(livro)}
            >
              Adicionar ao Carrinho
            </button>
            <Link to="/carrinho">
              <button style={styles.buttonSecondary}>Ir para o Carrinho</button>
            </Link>
            {/* Botões de favoritos */}
            <button style={styles.buttonSecondary} onClick={addToFavorites}>
              Adicionar Favorito
            </button>
            <button style={styles.buttonSecondary} onClick={removeFromFavorites}>
              Remover Favorito
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  buttonSecondary: {
    backgroundColor: "#6c757d",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Detalhes;
