import React from "react";

import "../assets/style/favoritos.css";





const Favoritos = () => {
 
 

  return (
    <div className="content-favoritos">
       <div className="containeree">
           <div className="producteeList">
           
                    <div className="producteeDetails">
                      <div className='productDetails_1'>
                      
                        </div>
                    </div>
                    <div className="buttons">
                      
                      <button
                      className='removeeeButton'
                      >
                      Remover favorito
                      </button>                      
                    </div>
            </div>
           <div className="producteeList">
           
                    <div className="producteeDetails">
                      <div className='productDetails_1'>
                   
                        </div>
                    </div>
                    <div className="buttons">
                      
                      <button
                      className='removeeeButton'
                      >
                      Remover favorito
                      </button>                      
                    </div>
            </div>
       </div>
        
    </div>
  );
};

export default Favoritos;
;