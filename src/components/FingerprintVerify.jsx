import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/FingerprintVerify.css";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";


export default function FingerprintVerify() {
  const navigate = useNavigate();
  const voterId = localStorage.getItem("voterId");

  const handleCapture = () => {
    const result = window.CaptureFinger(60, 10);
    if (!result.httpStaus) {
      alert("Fingerprint capture failed: " + result.err);
      return;
    }

    const data = result.data;
    if (data.ErrorCode !== "0") {
      alert("Capture Error: " + data.ErrorDescription);
      return;
    }

    localStorage.setItem("CapturedTemplate", data.AnsiTemplate);
    toast.success("Fingerprint captured successfully.");
  };

  const handleVerify = async () => {
    const fingerprintTemplate = localStorage.getItem("CapturedTemplate");
    if (!voterId || !fingerprintTemplate) {
      alert("Missing voter ID or fingerprint. Please capture first.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/verify-fingerprint/",
        {
          voter_id: voterId,
          fingerprint_template: fingerprintTemplate,
        }
      );

      if (res.data.status === "match") {
        navigate("/vote");
      } else {
        toast.error("Fingerprint mismatch.");
      }
    } catch (err) {
      toast.error("Verification failed. Check server.");
      console.error(err);
    }
  };

  return (
    <div className="fingerprint-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="fingerprint-box">
        <h2>Fingerprint Verification</h2>
        <img
          src="/fingerprint.png"
          alt="Fingerprint"
          className="fingerprint-img"
        />
        <p className="instruction-text">Place your finger on the scanner</p>
        <button onClick={handleCapture}>Capture Fingerprint</button>
        <div style={{ height: "15px" }}></div>
        <button onClick={handleVerify}>Verify Fingerprint</button>
      </div>
    </div>
  );
}
