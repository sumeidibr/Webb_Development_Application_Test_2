import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/style/menu.css';

const Navbar = () => {
  return (
    <nav>
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            <span style={{ color: 'rgb(7, 79, 37)', fontWeight: 'bold', fontSize: '25pt' }}>
              Dondzissa<sup style={{ fontSize: '0.5rem' }}>TM</sup>
            </span>
            {/* <img src={LogoCrocs} alt="Logo" className="logo-img" /> */}
          </Link>
        </div>

        <div className="Componentes_2">
          <input type="search" className="btn_pesquisa" placeholder="Search" style={{ margin: '5px' }} />
          <Link to="/login">
            <input type="button" className="btn_login" value="Login" style={{ margin: '5px' }} />
          </Link>
        </div>

        <input type="radio" name="slide" id="menu-btn" />
        <input type="radio" name="slide" id="cancel-btn" />
        <ul className="nav-links">
          <label htmlFor="cancel-btn" className="btn cancel-btn">
            <i className='bx bx-x'></i>
          </label>

          <li>
            <Link to="/admin" className="active">Home</Link>
          </li>

          <li>
            <Link to="/admin/reservados" className="desktop-item">Reservados</Link>          
          </li>

          <li>
          <Link to="/admin/livros" className="desktop-item">Livros</Link>
          </li>
       

         

          <div className="Componentes">
            <Link to="#"><input type="button" className="btn_carrinho" /></Link>
            <Link to="#"><input type="button" className="btn_favorito" /></Link>
            <Link to="/login"><input type="button" className="btn_login" value="Login" /></Link>
            <input type="search" className="btn_pesquisa" placeholder="Search" />
            <Link 
    to="/carrinho" 
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      textDecoration: 'none', 
      border: '3px solid #000000', // Adiciona a borda
      padding: '4px 14px', // Adiciona espaçamento interno
      borderRadius: '80px', // Bordas arredondadas
      transition: 'box-shadow 0.3s',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombras para destacar
      hover: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombras ao passar o mouse
      },
    }}
  >
  
    <p style={{ color: 'black', margin: 0 }}></p>
  </Link>
          </div>
        </ul>

        <label htmlFor="menu-btn" className="btn menu-btn">
          <i className='bx bx-menu'></i>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
