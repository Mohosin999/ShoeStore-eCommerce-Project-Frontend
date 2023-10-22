// pages/login.js
"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:1337/api/auth/local",
        formData
      );
      // Check if the login was successful on the server-side
      if (response.data.jwt) {
        // Save the authentication token to a secure location (e.g., localStorage)
        Cookies.set("id", response.data.user.id);
        Cookies.set("username", response.data.user.username);
        Cookies.set("token", response.data.jwt);
        // localStorage.setItem("token", response.data.jwt);

        // Redirect to the user's dashboard or another authenticated route
        router.push("/dashboard"); // Replace '/dashboard' with the actual dashboard route.
      } else {
        // Handle login error (e.g., show an error message indicating incorrect credentials)
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error.message);
      } else {
        // Network error or other unexpected errors
        console.log("An error occurred:", error.message);
      }
    }
  };

  return (
    <div className="mt-32">
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
