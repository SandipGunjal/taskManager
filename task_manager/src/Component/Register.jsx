import React, { useState } from "react";
import axios from "axios";
import "../CSS/login.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    if (!formData.name) formErrors.name = "Full name is required";
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
          "http://localhost:5000/api/auth/register",
          formData
        );
        toast.success(response.data.message);
        navigate("/login");

      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
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
          Register
        </button>
        <p className="mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
