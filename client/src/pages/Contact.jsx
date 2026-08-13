import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Message submitted:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      <h1>Let's Connect</h1>

      <p className="contact-intro">
        Have a project, opportunity, or just want to say hello?
        Feel free to get in touch with me.
      </p>

      <div className="contact-container">

        {/* Contact Details */}
        <div className="contact-info">

          <h2>Get In Touch</h2>

          <p>
            I'm always open to discussing new projects,
            opportunities and ideas.
          </p>

          <div className="contact-detail">
            <span>📧</span>
            <div>
              <h3>Email</h3>
              <a href="mailto:YOUR_EMAIL@gmail.com">
                pateltwisha031@gmail.com
              </a>
            </div>
          </div>

          <div className="contact-detail">
            <span>💻</span>
            <div>
              <h3>GitHub</h3>
              <a
                href="https://github.com/TwishaPate-1710"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/TwishaPatel-1710
              </a>
            </div>
          </div>

          <div className="contact-detail">
            <span>🔗</span>
            <div>
              <h3>LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/Twisha Patel"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/Twisha Patel
              </a>
            </div>
          </div>

        </div>


        {/* Contact Form */}
        <div className="contact-card">

          <h2>Send Me a Message</h2>

          <p>
            Fill out the form and I'll get back to you.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Send Message
            </button>

          </form>

          {submitted && (
            <p className="success-message">
              ✓ Message submitted successfully!
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default Contact;