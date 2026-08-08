import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Projects() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/TwishaPatel-1710/repos"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();

        setRepositories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="projects-page">

      {/* Projects Header */}
      <div className="projects-header">

        <span className="projects-label">
          MY WORK
        </span>

        <h1>
          Projects I've <span>Built</span>
        </h1>

        <p>
          A collection of projects where I explore web development,
          APIs, React, and modern technologies.
        </p>

      </div>


      {/* Projects */}
      <div className="project-container">

        {repositories.map((repo, index) => (
          <div className="project-card" key={repo.id}>

            {/* Card Top */}
            <div className="project-top">

              <span className="project-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="project-type">
                REPOSITORY
              </span>

            </div>


            {/* Project Name */}
            <h2>{repo.name}</h2>


            {/* Description */}
            <p>
              {repo.description ||
                "A project developed as part of my learning and development journey."}
            </p>


            {/* Technologies */}
            <div className="project-tech">

              <span>
                {repo.language || "React"}
              </span>

              <span>
                GitHub
              </span>

            </div>


            {/* Buttons */}
            <div className="project-actions">

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-btn"
              >
                View Project ↗
              </a>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Projects;