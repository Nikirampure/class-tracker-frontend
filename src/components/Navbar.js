import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="inner_navbar">
          <div className="navbar-brand">
            <img
              src="https://cdn-icons-png.flaticon.com/128/7050/7050939.png"
              style={{ width: "40px" }}
              alt="bookings"
            />{" "}
            Book Your Class
          </div>
          <div className="navbar-links">
            <a href="#classes">Classes</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
