import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/VoterIdCheck.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VoterIdCheck() {
  const [voterId, setVoterId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault(); 

  if (!voterId.trim()) {
    setError("Voter ID cannot be empty.");
    return;
  }

  try {
    await axios.post("http://localhost:8000/api/verify-voter/", {
      voter_id: voterId,
    });

    localStorage.setItem("voterId", voterId);
    navigate("/fingerprint");
  } catch (error) {
        console.error("Full error object:", error);
  
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "Voter has already voted"
        ) {
          toast.error("You have already voted.");
        }
        else if(
          error.response &&
          error.response.data &&
          error.response.data.message === "Voter not found"
        ) {
          toast.error("Voter Not Found");
        }
        else {
          toast.error("An unexpected error occurred. Please try again.");
        }
  }
};


  return (
    <div className="voter-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="voter-box">
        <h2>Verify Voter ID</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Voter ID"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
        <p className="error-message">{error}</p>
      </div>
    </div>
  );
}
