import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './app.css'; 

// Componentes gerais
import Footer from './component/Footer'; 
import Nav from './component/Nav'; 
import Carrinho from './pages/Carrinho'; 
import Reserva from './pages/Reserva'; 

import Home from './pages/Home'; 
import Login from './pages/LoginRegister'; 
import Detalhes from './pages/detalhes'; 
import Favoritos from './pages/Favoritos'; 
import LoginPage from './pages/LoginPage'; 

// Admin
import AdminHome from './pages/HomeAdmin'; 
import AdminReservados from './pages/Reservados'; 
import AdminLivros from './pages/Livros'; 
import AdminNav from './component/NavAdmin'; 
import AdminDetalhesReserva from './pages/DetalhesReserva'; 




function MainApp() {
  const location = useLocation();

  // Verifica se estamos em uma rota de Admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Verifica se estamos em uma rota de Admin
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
   {/* Renderiza Nav e Footer apenas se não estiver em uma rota Admin */}
   {!isAdminRoute && <Nav />}

<div style={{ display: 'flex', flexGrow: 1 }}>
  {/* Renderiza AdminNav apenas para rotas de Admin */}
  {isAdminRoute && <AdminNav />}

       
        <main style={{ flexGrow: 1 }}>
          <Routes> 
            {/* Rotas gerais */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/reserva" element={<Reserva />} />
            <Route path="/detalhes" element={<Detalhes />} />
            <Route path="/favoritos" element={<Favoritos />} />

            {/* Rotas Admin */}
            <Route path="/admin" element={<AdminHome/>} />
            <Route path="/admin/reservados" element={<AdminReservados />} />
            <Route path="/admin/livros" element={<AdminLivros />} />
            <Route path="/admin/reservados/detalhes" element={<AdminDetalhesReserva />} />
          
           

         
          </Routes>
        </main>
      </div>

      {/* Renderiza Footer apenas se não estiver em uma rota Admin */}
      {!isAdminRoute && <Footer />}
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
