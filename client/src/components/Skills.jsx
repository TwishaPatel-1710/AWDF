function Skills(props) {
  return (
    <section>
      <h2>Skills</h2>

      <div className="skill-grid">
        {props.skillList.map((skill,index)=>(
          <div className="skill" key={index}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;