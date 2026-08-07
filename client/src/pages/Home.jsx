import { useState } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

function Home() {
  const [showSkills, setShowSkills] = useState(false);

  const studentName = "Twisha Patel";

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Java",
    "C++",
    "Python",
  ];

  return (
    <>
      <div className="hero">
        <Header />
        <Hero />
      </div>

      <About />

      <button onClick={() => setShowSkills(!showSkills)}>
        {showSkills ? "Hide Skills" : "Show Skills"}
      </button>

      {showSkills && <Skills skillList={skills} />}

      <Footer name={studentName} />
    </>
  );
}

export default Home;