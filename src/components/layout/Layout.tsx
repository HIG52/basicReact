import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import '../../styles/Home.css';

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        <div className="container header-container">
          <Link to="/" className="logo">MCST</Link> 
          <ul className="nav-menu">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/board" className={location.pathname === '/board' ? 'active' : ''}>자유게시판</Link></li>
            <li><Link to="/qna" className={location.pathname === '/qna' ? 'active' : ''}>Q&A</Link></li>
            <li><Link to="/notices" className={location.pathname === '/notices' ? 'active' : ''}>공지사항</Link></li>
            <li><Link to="/login" className={location.pathname === '/login' ? 'active login-btn' : 'login-btn'}>로그인</Link></li>
            <li><Link to="/signup" className={location.pathname === '/signup' ? 'active signup-btn' : 'signup-btn'}>회원가입</Link></li>
          </ul>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-column">
              <div className="footer-logo">LOGO</div>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Products</h4>
              <ul className="footer-links">
                <li><Link to="/send">Send</Link></li>
                <li><Link to="/receive">Receive</Link></li>
                <li><Link to="/buy">Buy</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Others</h4>
              <ul className="footer-links">
                <li><Link to="/terms">Terms and Conditions</Link></li>
                <li><Link to="/legal">Legal</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/faq">User FAQs</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <div className="newsletter">
                <p className="newsletter-title">Subscribe to our newsletter and be the first to know about our updates</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Email Address" className="newsletter-input" />
                  <button type="submit" className="newsletter-btn">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="copyright">Copyright © 2024. All rights reserved.</div>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 