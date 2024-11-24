import React, { useState, useEffect } from "react";
import "../assets/style/carrinho.css";

const Carrinho = () => {
  const [cart, setCart] = useState([]); // Carrinho de compras

  // Recupera o carrinho do localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Atualiza a quantidade de um produto
  const updateQuantity = (index, delta) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const item = updatedCart[index];
      if (
        item.quantity + delta >= 1 &&
        item.quantity + delta <= item.quantidade
      ) {
        item.quantity += delta;
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Remove um item do carrinho
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  // Realiza a reserva de um produto
  const handleReservar = async (product) => {
    const userId = localStorage.getItem("userId"); // Recupera o ID do usuário do localStorage

    if (!userId) {
      alert("Você precisa estar logado para reservar um produto.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_user: userId,
          id_livro: product.id_livro, // Assume que o produto contém `id_livro`
          quantidade: product.quantity,
          estado: "pendente",
        }),
      });

      if (response.ok) {
        alert(`Reserva realizada para o livro: ${product.titulo}`);
      } else {
        const errorData = await response.json();
        alert(
          `Erro ao reservar o livro: ${
            errorData.message || "Erro desconhecido"
          }`
        );
      }
    } catch (error) {
      console.error("Erro ao enviar a reserva:", error);
      alert("Erro ao processar a reserva. Tente novamente.");
    }
  };

  // Calcula o total do carrinho
  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + parseFloat(product.preco) * product.quantity,
      0
    );
  };

  return (
    <div className="content-carrinho">
      <div className="container">
        {cart.length > 0 ? (
          <>
            <div className="carrinho">
              <ul className="productList">
                {cart.map((product, index) => (
                  <li key={index} className="productItem">
                    <div className="product">
                      <div className="productDetails">
                        <div className="productDetails_1">
                          <img
                            src={product.imagem || "default-image.png"}
                            alt={product.titulo}
                          />
                        </div>
                        <div className="productDetails_2">
                          <h3>{product.titulo}</h3>
                          <p>Preço: {product.preco}$</p>
                          <p>Quantidade em Estoque: {product.quantidade}</p>
                          <p>Quantidade no Carrinho: {product.quantity}</p>
                        </div>
                      </div>
                      <div className="buttons">
                        <button
                          className="button"
                          onClick={() => updateQuantity(index, 1)}
                          disabled={product.quantity >= product.quantidade}
                        >
                          +
                        </button>
                        <button
                          className="button"
                          onClick={() => updateQuantity(index, -1)}
                          disabled={product.quantity <= 1}
                        >
                          -
                        </button>
                        <button
                          className="button removeButton"
                          onClick={() => removeFromCart(index)}
                        >
                          Remover
                        </button>
                        <button
                          className="button"
                          onClick={() => handleReservar(product)}
                        >
                         Alugar Livro
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="total">
              <h3>Total: {calculateTotal().toFixed(2)}$</h3>
            </div>

            <button></button>
          </>
        ) : (
          <p>Carrinho vazio.</p>
        )}
      </div>
    </div>
  );
};

export default Carrinho;