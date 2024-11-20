import React from 'react';
import '../assets/style/footer.css'; // Assuming you're keeping the CSS in a separate file

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-box">
        <a href="#" className="logo">
         
        </a>
       
      </div>

      <div className="footer-box">
        <h3>Pages</h3>
        <a href="#home">Home</a>
        <a href="#featured">Featured</a>
        <a href="#shop">Shop</a>
        <a href="#new">New</a>
      </div>

      <div className="footer-box">
        <h3>Legal</h3>
        <a href="#">Privacy Policy</a>
        <a href="#">Refund Policy</a>
        <a href="#">Terms of Use</a>
        <a href="#">Disclaimer</a>
      </div>

      <div className="footer-box">
        <h3>Branches</h3>
        <p>United States</p>
        <p>Japan</p>
        <p>Germany</p>
        <p>Mozambique</p>
      </div>
    </section>
  );
};

export default Footer;
