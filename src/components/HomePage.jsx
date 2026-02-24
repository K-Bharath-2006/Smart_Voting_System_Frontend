import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/officer-login");
  };

  return (
    <div className="home-container">
      <div className="content">
        <img src="/ashoka_emblem.png" alt="Ashoka Emblem" className="emblem" />
        <h1 className="title">ELECTION COMMISSION OF INDIA</h1>
        <p className="subtitle">Smart Voting System</p>
        <button className="login-button" onClick={handleLoginClick}>
          CLICK HERE TO LOGIN →
        </button>
        <p className="footer-text">
          Secure Electronic Voting System • Election Commission of India
          <br />
        </p>
      </div>
    </div>
  );
}
