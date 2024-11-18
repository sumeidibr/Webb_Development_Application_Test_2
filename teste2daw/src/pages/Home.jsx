import React from "react";

import "../assets/style/home.css";


// Images

//import crocs1 from '../assets/img/imgTeste.PNG';

const Home = () => {
 
 

  return (
    <div className="content">
      <main>
        <article>
          {/* Section 1 */}
          <div className="Container">
            <div className="home-container">
              <h2>Crocs Mozambique</h2>
              <p>
                Novos modelos, com os últimos crocs. <br />
                Mais confortáveis do que nunca
              </p>
              <button id="shop_now">Comprar</button>
            </div>

            <div className="home-container-img"> </div>
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

         
       
        </article>
      </main>
    </div>
  );
};

export default Home;
