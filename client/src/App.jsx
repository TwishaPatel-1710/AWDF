import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

import "./App.css";

function App() {

  const studentName = "Twisha Patel";

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Java",
    "C++",
    "Python"
  ];

  return (
    <div>

      <div className="hero">

        <Header />

        <Hero />

      </div>

      <About />

      <Skills skillList={skills} />

      <Footer name={studentName} />

    </div>
  );
}

export default App;