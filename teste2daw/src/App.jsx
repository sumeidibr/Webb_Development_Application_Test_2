import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css'; 

// Componentes gerais
import Footer from './component/Footer'; 
import Nav from './component/Nav'; 
import Carrinho from './pages/Carrinho'; 
import Reserva from './pages/Reserva'; 

import Home from './pages/Home'; 
import Login from './pages/LoginRegister'; 
import Detalhes from './pages/detalhes'; 




function MainApp() {


  // Verifica se estamos em uma rota de Admin
  

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
       { <Nav />}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* Renderiza AdminNav apenas para rotas de Admin */}
       
        <main style={{ flexGrow: 1 }}>
          <Routes> 
            {/* Rotas gerais */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/reserva" element={<Reserva />} />
            <Route path="/detalhes" element={<Detalhes />} />
          
           

         
          </Routes>
        </main>
      </div>

      {/* Renderiza Footer apenas se não estiver em uma rota Admin */}
      { <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
