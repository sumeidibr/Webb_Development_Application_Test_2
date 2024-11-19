import React from "react";
import "../assets/style/detalhesReserva.css"; // CSS personalizado

const DetalhesReserva = () => {
  const reserva = {
    id: 1,
    titulo: "Exemplo de Título",
    autor: "Exemplo de Autor",
    usuario: "João Silva",
    dataReserva: "2024-11-10",
    dataDevolucao: "2024-11-25",
    status: "Reservado",
    descricao: "Este é um exemplo de descrição do livro. Ele é um best-seller de ficção científica.",
  };

  return (
    <div className="detalhes-reserva-container">
      <h2>Detalhes da Reserva</h2>
      <div className="detalhes-reserva">
        <p><strong>ID do Livro:</strong> {reserva.id}</p>
        <p><strong>Título:</strong> {reserva.titulo}</p>
        <p><strong>Autor:</strong> {reserva.autor}</p>
        <p><strong>Usuário:</strong> {reserva.usuario}</p>
        <p><strong>Data de Reserva:</strong> {reserva.dataReserva}</p>
        <p><strong>Data de Devolução:</strong> {reserva.dataDevolucao}</p>
        <p><strong>Status:</strong> {reserva.status}</p>
        <p><strong>Descrição:</strong> {reserva.descricao}</p>

        {/* Adicione outros detalhes, se necessário */}
      </div>

      <button className="btn-voltar">Voltar</button>
    </div>
  );
};

export default DetalhesReserva;
