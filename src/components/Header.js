import "../styles/Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-grid">
          <h1 className="header-title">Discover Your Potential</h1>
          <p className="header-tagline">
            Unlock your potential with top-tier classes, from fitness to
            creativity.
          </p>
          <p className="header-description">
            Explore a range of activities designed to help you achieve your
            goals. Whether you want to relax, get fit, or learn a new skill, we
            have something for everyone. Join us today and take the first step
            towards a better you!
          </p>
          <button className="header-action-btn mt-4">Get Started</button>
        </div>
      </header>
    </>
  );
};

export default Header;
