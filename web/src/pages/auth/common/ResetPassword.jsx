import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validToken, setValidToken] = useState(false);
  const navigate = useNavigate();

  console.log("token", token);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios.get(
          `http://localhost:4000/api/auth/validate-reset-token/${token}`
        );
        setValidToken(true);
      } catch (err) {
        setError("Invalid or expired reset token");
      }
    };
    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password");
    }
  };

  if (!validToken && error) {
    return (
      <div className="auth-form" style={{ color: "white" }}>
        <h2>Reset Password</h2>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="auth-form" style={{ color: "white" }}>
      <h2>Reset Password</h2>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="4"
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="4"
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
