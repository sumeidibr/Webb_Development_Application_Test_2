import React from "react";

import "../assets/style/reserva.css";





const Reserva = () => {
 
 

  return (
    <div className="content-reserva">
       <div className="containere">
           <div className="producteList">
           
                    <div className="producteDetails">
                      <div className='productDetails_1'>
                      <img src="" alt="" />
                        <p>Preço: </p>
                        <p>Status: </p>
                        <p>Quantidade: </p>
                        </div>
                    </div>
                    <div className="buttons">
                      
                      <button
                      className='removeeButton'
                      >
                       Cancelar reserva
                      </button>
                      
                    </div>
            </div>
           <div className="producteList">
           
                    <div className="producteDetails">
                      <div className='productDetails_1'>
                      <img src="" alt="" />
                        <p>Preço: </p>
                        <p>Status: </p>
                        <p>Quantidade: </p>
                        </div>
                    </div>
                    <div className="buttons">
                      
                      <button
                      className='removeeButton'
                      >
                       Cancelar reserva
                      </button>
                      
                    </div>
            </div>
       </div>
        
    </div>
  );
};

export default Reserva;
;