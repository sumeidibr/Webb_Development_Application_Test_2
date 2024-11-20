import React from "react";
import "../assets/style/reservados.css"; // CSS personalizado
import { Link } from 'react-router-dom';
const Reservados = () => {
  return (
    <div className="reservados-container">
      <h2>Livros Reservados</h2>
      <table className="reservados-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Usuário</th>
            <th>Data de Reserva</th>
            <th>Data de Devolução</th>
            <th>Status</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Exemplo de Título</td>
            <td>Exemplo de Autor</td>
            <td>João Silva</td>
            <td>2024-11-10</td>
            <td>2024-11-25</td>
            <td>Reservado</td>
            <td>
           

{/* Dentro do tbody da tabela */}
<Link to="/admin/reservados/detalhes">
  <button className="btn-detalhes">Detalhes</button>
</Link>

              <button className="btn-cancelar">Cancelar</button>
            </td>
          </tr>
          {/* Adicione mais linhas conforme necessário */}
        </tbody>
      </table>
    </div>
  );
};

export default Reservados;
