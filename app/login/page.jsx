// pages/login.js
"use client";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:1337/api/auth/local",
        formData
      );
      console.log("Token --> ", response.data.jwt);
      // Save the authentication token to a secure location (e.g., localStorage)
      localStorage.setItem("token", response.data.jwt);
      // Redirect to the user's dashboard or another authenticated route
      // You can use the Next.js router for navigation.
      // Example: router.push('/dashboard');
    } catch (error) {
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input
          type="text"
          placeholder="Username or Email"
          onChange={(e) =>
            setFormData({ ...formData, identifier: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
