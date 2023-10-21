// pages/register.js
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:1337/api/auth/local/register",
        formData
      );
      // Check if the login was successful on the server-side
      if (response.data.jwt) {
        // Save the authentication token to a secure location (e.g., localStorage)
        localStorage.setItem("token", response.data.jwt);

        // Redirect to the user's dashboard or another authenticated route
        router.push("/dashboard"); // Replace '/dashboard' with the actual dashboard route.
      } else {
        // Handle login error (e.g., show an error message indicating incorrect credentials)
      }
    } catch (error) {
      // Handle registration error (e.g., show an error message)
      console.log(error);
    }
  };

  return (
    <div className="mt-32">
      <h2 className="text-8xl text-white">Register</h2>
      <form className="flex flex-col items-center justify-center w-full">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
