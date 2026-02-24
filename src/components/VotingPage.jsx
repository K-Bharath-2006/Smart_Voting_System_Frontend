import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/VotingPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


export default function VotingPage() {
  const [candidates, setCandidates] = useState([]);
  const voterId = localStorage.getItem("voterId");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/candidates/")
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  }, []);

  const handleVote = async (candidateId) => {
    try {
      await axios.post("http://localhost:8000/api/submit-vote/", {
        voter_id: voterId,
        candidate_id: candidateId,
      });

      toast.success("Vote submitted successfully!");
      navigate("/success");
    } catch (error) {

      console.error("Full error object:", error);
      
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <div className="voting-container">
      <div className="voting-box">
        <h2>Select Your Candidate</h2>

        <ToastContainer position="top-center" autoClose={3000} />

        {candidates.length === 0 ? (
          <div className="no-candidates">No candidates available.</div>
        ) : (
          <div className="candidate-grid">
            {candidates.map((c) => (
              <div key={c.id} className="candidate-card">
                <img
                  className="candidate-img"
                  src={`http://localhost:8000${c.symbol}`}
                  alt="symbol"
                />
                <h3 className="candidate-name">{c.name}</h3>
                <button
                  className="vote-button"
                  onClick={() => handleVote(c.id)}
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
