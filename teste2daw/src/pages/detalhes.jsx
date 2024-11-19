import React from "react";

import "../assets/style/detalhes.css";
import { Link } from 'react-router-dom';




const detalhes = () => {
 
 

  return (
    <div className="container-detalhes-produto">
      <section>
          <div className="box-conteudo">
              <div className="col-esquerda">
                <div className="imagem-principal">
                 <img src="sd" alt="" />
                </div>
          
              </div>
              <div className="col-direita">
          
                    <div className="informacao-tamanho">
                      <p>Titulo: </p>
                      <p>Autor: </p>
                      <p>Editora: </p>
                      <p>Edicao: </p>
                      <p>Preco: </p>
                      <p>Quantidade: </p>
                    </div>
                
                <div className="lista-tamanhos">
                <Link to="/carrinho"><button>Adicionar ao carrinho</button></Link>
                <Link to="/reserva"><button>Efetuar reserva</button></Link>
                <Link to="/favoritos"><button>Favoritar</button></Link>
                    </div>
          
          
              </div>
            </div>
      </section>
    </div>
  );
};

export default detalhes;
