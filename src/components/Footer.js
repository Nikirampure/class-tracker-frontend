import "../styles/Footer.css";

const Footer = () => {
  return (
    <>
      <section className="info-section" id="about">
        <h2>About Our Platform</h2>
        <p>
          Our platform offers a wide variety of classes to help you enhance your
          life. From yoga to coding, we make booking easy and fun!
        </p>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              At Class Booker, we strive to provide the best booking experience
              for your favorite classes, including yoga, gym, dance, and more.
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#classes">Classes</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@classbooker.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Class Booker | Designed with elegance.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
