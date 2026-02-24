import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/SuccessPage.css";

export default function SuccessPage() {
  const navigate = useNavigate();

  const goToVerify = () => {
    navigate("/voter-id");
  };

  return (
    <div className="success-container">
      <div className="success-box">
        <h2>✅ Vote Cast Successfully!</h2>
        <button className="verify-btn" onClick={goToVerify}>
          Go to Verify Voter
        </button>
      </div>
    </div>
  );
}

