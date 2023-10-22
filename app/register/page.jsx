"use client";
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
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
    console.log("Register Response ->", registerResponse);
  };

  return (
    <div className="mt-32 text-center">
      <form>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button type="button" onClick={() => handleRegister()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;

// // pages/register.js
// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const router = useRouter();

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:1337/api/auth/local/register",
//         formData
//       );

//       console.log("Registered User -> ", response);

//       if (response.data.jwt) {
//         // Registration success
//         // localStorage.setItem("token", response.data.jwt);
//         // router.push("/dashboard");
//         router.push("/login");
//       } else {
//         // Handle registration error (e.g., show an error message)
//         console.log("No jwt found!");
//       }
//     } catch (error) {
//       if (error.response) {
//         alert(error.response.data.error.message);
//       } else {
//         // Network error or other unexpected errors
//         console.log("An error occurred:", error.message);
//       }
//     }
//   };

//   return (
//     <div className="mt-32">
//       <h2 className="text-8xl text-white">Register</h2>
//       <form className="flex flex-col items-center justify-center w-full">
//         <input
//           type="text"
//           placeholder="Username"
//           onChange={(e) =>
//             setFormData({ ...formData, username: e.target.value })
//           }
//         />{" "}
//         <br />
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />{" "}
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//         />
//         <br />
//         <button type="button" onClick={handleRegister}>
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
