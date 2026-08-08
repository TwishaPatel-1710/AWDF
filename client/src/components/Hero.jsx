import image from "../assets/Twisha.jpeg";

function Hero() {
  return (
    <div className="hero-image-container">
      <img
        src={image}
        alt="Twisha Patel"
        className="profile-img"
      />
    </div>
  );
}

export default Hero;