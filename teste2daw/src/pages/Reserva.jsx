import React, { useState, useEffect } from "react";
import "../assets/style/reserva.css";

const Reserva = () => {
  const [reservas, setReservas] = useState([]); // Lista de reservas
  const userId = localStorage.getItem("userId"); // Recupera o ID do usuário do localStorage

  // Função para buscar reservas do usuário
  const fetchReservas = async () => {
    try {
      const response = await fetch(`http://localhost:3005/api/reservas/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setReservas(data);
      } else {
        alert("Erro ao buscar as reservas.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao carregar reservas.");
    }
  };

  // Função para cancelar uma reserva
  const handleCancelarReserva = async (idReserva) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/reservas/${idReserva}`, // Usando o id_reserva para deletar
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        alert("Reserva cancelada com sucesso.");
        setReservas((prev) => prev.filter((reserva) => reserva.id_reserva !== idReserva));
      } else {
        alert("Erro ao cancelar a reserva.");
      }
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      alert("Erro ao processar o cancelamento.");
    }
  };

  // Carrega as reservas ao montar o componente
  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div className="content-reserva">
      <div className="containere">
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <div key={reserva.id_reserva} className="producteList">
              <div className="producteDetails">
                <div className="productDetails_1">
                  {/* Ajuste a imagem se disponível */}
                  <img src="default-image.png" alt="Livro" />
                  <p>Id Livro: {reserva.id_livro}</p>
                  <p>Quantidade: {reserva.quantidade}</p>
                  <p>Status: {reserva.estado}</p>
                </div>
              </div>
              <div className="buttons">
                <button
                  className="removeeButton"
                  onClick={() => handleCancelarReserva(reserva.id_reserva)} // Passando o id_reserva para o cancelamento
                >
                  Cancelar reserva
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Você não possui reservas ativas.</p>
        )}
      </div>
    </div>
  );
};

export default Reserva;
