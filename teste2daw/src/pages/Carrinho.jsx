import React, { useState, useEffect } from "react";
import "../assets/style/carrinho.css";

const Carrinho = () => {
  const [cart, setCart] = useState([]); // Carrinho de compras
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Modal de pagamento
  const [numeroCelular, setNumeroCelular] = useState(""); // Número de celular
  const [endereco, setEndereco] = useState(""); // Endereço de entrega
  const [paymentMessage, setPaymentMessage] = useState(""); // Mensagem de pagamento

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
      if (item.quantity + delta >= 1 && item.quantity + delta <= item.quantidade) {
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

  // Calcula o total do carrinho
  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + parseFloat(product.preco) * product.quantity,
      0
    );
  };

  // Finaliza a compra
  const handleFinalizarCompra = async () => {
    if (!numeroCelular || !endereco) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const totalValor = calculateTotal();

    try {
      const response = await fetch("http://localhost:3005/iniciar-transacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numeroCelular: numeroCelular,
          valor: totalValor,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Compra efetuada com sucesso!");
        setPaymentMessage("Compra finalizada com sucesso!");
        localStorage.removeItem("cart");
        setCart([]);
      } else {
        alert(`Erro: ${data.erro.output_ResponseDesc}`);
        setPaymentMessage(`Erro: ${data.erro.output_ResponseDesc}`);
      }
    } catch (error) {
      alert("Erro ao processar o pagamento. Tente novamente.");
      setPaymentMessage("Erro ao processar o pagamento. Tente novamente.");
      console.error("Erro de requisição:", error);
    }
  };

  const handlePurchaseClick = () => {
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setPaymentMessage(""); // Limpa a mensagem de pagamento
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
                        <button >Reservar</button>
                        <button > Cancelar Reserva</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="total">
              <h3>Total: {calculateTotal().toFixed(2)}$</h3>
            </div>

            <button className="button" onClick={handlePurchaseClick}>
              Finalizar Compra
            </button>
          </>
        ) : (
          <p>Carrinho vazio.</p>
        )}
      </div>

      {showPaymentModal && (
        <div className="paymentModal">
          <h3>Finalizar Compra</h3>
          <label htmlFor="numeroCelular">Número de Celular:</label>
          <input
            type="text"
            id="numeroCelular"
            value={numeroCelular}
            onChange={(e) => setNumeroCelular(e.target.value)}
          />
          <label htmlFor="endereco">Endereço de Entrega:</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <button className="button" onClick={handleFinalizarCompra}>
            Finalizar
          </button>
          <button className="button" onClick={handleCloseModal}>
            Fechar
          </button>
          <div className="paymentMessage">{paymentMessage}</div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;
