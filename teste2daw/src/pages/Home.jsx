import React from "react";
import { Link} from "react-router-dom"
;
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
              <h2>dondzissa kaya</h2>
              <p>
               Conheca os ultimos lancamentos <br />
                dos best-sellers
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


          
        <div  className="shop-container">
            <Link to="/detalhes">
              <div className="box">
                  <img src="teste3-removebg-preview.png" alt=""/>
                  <h2>Nike Therma</h2>
                  <span>70.88$</span>
                  <button>Sandals</button>
              </div>
            </Link>
        
          


        </div>

         
       
        </article>
      </main>
    </div>
  );
};

export default Home;
