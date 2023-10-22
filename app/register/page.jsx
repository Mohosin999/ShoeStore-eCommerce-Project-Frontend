"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import TostifyMessage from "../components/tostify-message";
import Button from "../components/UI/button";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Router
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const registerInfo = {
        username: username,
        email: email,
        password: password,
      };

      const register = await axios.post(
        "http://127.0.0.1:1337/api/auth/local/register",
        registerInfo,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const registerResponse = await register.data;

      if (registerResponse) {
        Cookies.set("id", registerResponse.user.id);
        Cookies.set("username", registerResponse.user.username);
        Cookies.set("jwt", registerResponse.jwt);

        router.push("/dashboard");
      }
    } catch (error) {
      // alert(error.message);
      setError(error.response.data.error.message);
    }
  };

  return (
    <div className="mt-32 text-center">
      <form>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <br />

        <Button label="Submit" onClick={handleRegister} />
      </form>

      {/* If error occured, show the toast message. */}
      {error && <TostifyMessage message={error} setState={setError} />}
    </div>
  );
};

export default Register;
