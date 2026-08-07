import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");

  return (
    <div className="contact-page">

      <h1>Contact Me</h1>

      <p>
        Feel free to reach out for internships, collaborations or project discussions.
      </p>

      <div className="contact-card">

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h3>Hello, {name || "Guest"} 👋</h3>

        <div className="contact-info">
          <p>📧 twishapatel031@gmail.com</p>
          <p>📱 +91 8154877562</p>
          <p>📍 Gujarat, India</p>
        </div>

      </div>

    </div>
  );
}

export default Contact;