import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <section className="header-content">

      <p className="subtitle">
        COMPUTER ENGINEERING STUDENT
      </p>

      <h1>
        Hi, I'm <span>Twisha Patel</span>
      </h1>

      <h2>
        Aspiring Software Developer
      </h2>

      <p className="intro">
        I enjoy building modern web applications using React
        and exploring the world of Artificial Intelligence.
      </p>

      <div className="header-buttons">

        <button
          className="btn-primary"
          onClick={() => navigate("/projects")}
        >
          View Projects
        </button>

        <button
          className="btn-secondary"
          onClick={() => navigate("/contact")}
        >
          Contact Me
        </button>

      </div>

    </section>
  );
}

export default Header;