function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      tech: "React, CSS",
      desc: "A responsive personal portfolio showcasing my skills, education and projects."
    },
    {
      title: "Car Rental System",
      tech: "React, Node.js, Express, MongoDB",
      desc: "A full-stack web application for booking rental cars with login and booking management."
    },
    {
      title: "SmartNotes with Categories",
      tech: "MERN Stack",
      desc: "A smart note taking website that includes categorization and advanced arrangement."
    },
    {
      title: "Expense Tracker",
      tech: "MERN Stack",
      desc: "A smart system where user can manage their expenses and can see weekly , monthly reports."
    }
  ];

  return (
    <div className="projects-page">
      <h1>My Projects</h1>
      <p>Some of the projects I have worked on.</p>

      <div className="project-container">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h2>{project.title}</h2>

            <h4>Technology Used</h4>

            <p>{project.tech}</p>

            <h4>Description</h4>

            <p>{project.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;