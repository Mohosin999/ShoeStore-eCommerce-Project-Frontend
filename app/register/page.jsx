"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiOutlineAppstore } from "react-icons/ai";
// Components
import Wrapper from "../components/wrapper";
import Input from "../components/UI/input";
import { setToken } from "../lib/auth";
import Button from "../components/UI/button";

/**
 * Register component.
 * @returns {JSX.Element}
 */
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Router
  const router = useRouter();

  // Handle register function for handling register activities
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
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const registerResponse = await register.data;

      if (registerResponse) {
        // setToken for saving data in Cookies.
        setToken(registerResponse);
        // After saving data in Cookies, direct push in dashboard.
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message, {
        hideProgressBar: true,
        autoClose: 3000,
        position: "bottom-left",
      });
    }
  };

  return (
    <Wrapper>
      <div className="mt-24 text-center">
        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen">
          <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-200"
          >
            <AiOutlineAppstore size={32} className="text-green-500 mr-2" />
            ShoeStore
          </Link>

          {/* Form card started form here */}
          <div className="relative w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign Up Now
              </h1>
              <form className="space-y-4 md:space-y-6">
                {/* Username */}
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="enter your username..."
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />

                {/* Email */}
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="name@test.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                {/* Password */}
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="........"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                {/* Submit Button */}
                <Button href="" label="Submit" onClick={handleRegister} />

                {/* If already have an account, login now */}
                <p className="text-sm font-light text-gray-500">
                  Already have an account?
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
