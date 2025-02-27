import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../page_css/login.css";
import { handleLogin } from "../../functions/Login.js";

const LogInPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    middleInitial: "",
    block: "",
    lot: "",
    phase: "",
    street: "",
    subdivision: "South Garden",
    number: "+63",
  });

  const navigate = useNavigate();

  const togglePanel = () => setIsLogin(!isLogin);

  const validatePassword = (password) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(password);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { success } = await handleLogin(email, password, navigate);
    if (success) {
      setEmail("");
      setPassword("");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!validatePassword(formData.password)) {
      alert("Password must be at least 6 characters, include at least one number, and one special character.");
      return;
    }
    if (!/^\+63\d{10}$/.test(formData.number)) {
      alert("Phone number must start with +63 and have exactly 10 digits.");
      return;
    }

    const address = `Block ${formData.block}, Lot ${formData.lot}, Phase ${formData.phase}, Street ${formData.street}, ${formData.subdivision}`;
    const finalData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      middle_initial: formData.middleInitial,
      address,
      number: formData.number,
    };

    try {
      const response = await fetch("http://localhost:8080/subdicare_api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
      const result = await response.json();
      if (result.success) {
        alert("Sign-up successful!");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          middleInitial: "",
          block: "",
          lot: "",
          phase: "",
          street: "",
          subdivision: "South Garden",
          number: "+63",
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="header text-center">
        <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
        <p onClick={togglePanel} className="register-link">
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </p>
      </div>

      <div className="form-container">
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="field">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Log In
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <div className="field">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="field-column">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <div className="field-row">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Middle Initial"
                value={formData.middleInitial}
                onChange={(e) => setFormData({ ...formData, middleInitial: e.target.value })}
              />
            </div>
            <div className="field">
              <input
                type="text"
                placeholder="Contact Number (e.g., +63)"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                required
              />
            </div>
            <div className="address-row">
              <input
                type="text"
                placeholder="Block"
                value={formData.block}
                onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Lot"
                value={formData.lot}
                onChange={(e) => setFormData({ ...formData, lot: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phase"
                value={formData.phase}
                onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Street"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <input
                type="text"
                placeholder="Subdivision (e.g., South Garden)"
                value={formData.subdivision}
                onChange={(e) => setFormData({ ...formData, subdivision: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LogInPage;
