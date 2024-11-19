import React from 'react';
import '../assets/style/carrinho.css'; 

function Carrinho() {
 

  return (
       <div className="content-carrinho">
    
        <div className="container">


          <div className="carrinho">
              <div className="productList">
                
                      <div className="productDetails">

                        <div className='productDetails_1'>
                        
                          </div>
                        <div className='productDetails_2'>
                          <h3></h3>
                          <p>Preço: </p>
                          <p>Quantidade em Estoque: </p>
                          <p>Quantidade: </p>
                        </div>
                      </div>
                      <div className="buttons">
                        <button
                          className="button"
                         
                        >
                          +
                        </button>
                        <button
                          className="button"
                        >
                          -
                        </button>
                        <button
                        className='removeButton'
                        >
                          Remover
                        </button>
                        <button className='button addWishList'>Adicionar favoritos</button>
                      </div>
              </div>
              
            
              
              
                <div className="Order_summary">
                    <div className="order">
                        <h2>Order Summary</h2>
                        <div className="subtotal">
                        <p>SubTotal</p>
                        <p>0 Mzn</p>
                        </div>
                        <div className="shipping">
                        <p>Shipping</p>
                        <p>Calculated on next step</p>
                        </div>
                        <div className="descounted">
                        <p>Voce Poupou</p>
                        <p> 0 Mzn</p>
                        </div>
                        <div className="total">
                        <p>Total: </p>
                        <p> Mzn</p>
                        </div>
                        <button className="purchaseButton" >Realizar Compra </button>
                  </div>
                </div>
                
        </div>


         
    
         
          
    
</div>
</div>


  );
};

export default Carrinho;