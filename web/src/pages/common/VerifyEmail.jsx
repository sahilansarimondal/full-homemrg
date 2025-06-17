import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/verify/${token}`
        );
        setMessage(response.data.message);
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setError(err.response?.data?.error || "Verification failed");
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div
      className="container"
      style={{
        color: "black",
        textAlign: "center",
      }}
    >
      <h1>Email Verification</h1>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="success">{message}</div>
      )}
    </div>
  );
};

export default VerifyEmail;
