import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Safety Center</li>
            <li>Community Guidelines</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <span className="icon">FB</span>
            <span className="icon">TW</span>
            <span className="icon">IG</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 SameDayJob. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;