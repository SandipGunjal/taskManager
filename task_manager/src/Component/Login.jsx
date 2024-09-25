// src/components/LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }
    if (!formData.password) formErrors.password = "Password is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          formData
        );
        // Save token to localStorage
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate("/tasks");
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="gmail"
            className={`form-control ${errors.email && "is-invalid"}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password && "is-invalid"}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="input-group-text"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </span>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <p className="mt-3">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
