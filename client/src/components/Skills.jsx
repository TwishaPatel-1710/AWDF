function Skills({ skillList }) {
  return (
    <section className="skills">
      <h2>My Skills</h2>

      <p className="skills-intro">
        Technologies and tools I use to build modern applications.
      </p>

      <div className="skills-container">
        {skillList.map((skill, index) => (
          <div className="skill-card" key={index}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;