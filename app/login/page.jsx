// pages/login.js
"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import Input from "../components/UI/input";
import Button from "../components/UI/button";
import TostifyMessage from "../components/tostify-message";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Router
  const router = useRouter();

  // Handle register function for handling register activities
  const handleLogin = async () => {
    try {
      const loginInfo = {
        identifier: identifier,
        password: password,
      };

      const login = await axios.post(
        "http://127.0.0.1:1337/api/auth/local",
        loginInfo,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const loginResponse = await login.data;
      console.log(loginResponse);

      if (loginResponse) {
        Cookies.set("id", loginResponse.user.id);
        Cookies.set("username", loginResponse.user.username);
        Cookies.set("jwt", loginResponse.jwt);

        router.push("/dashboard");
      }
    } catch (error) {
      // alert(error.message);
      setError(error.response.data.error.message);
    }
  };

  return (
    <Wrapper>
      <div className="mt-16 text-center">
        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen">
          <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-100"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            ShoeStore
          </Link>

          {/* Form card started form here */}
          <div className="relative w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Login Now
              </h1>
              <form className="space-y-4 md:space-y-6">
                {/* Email */}
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="name@test.com"
                  onChange={(e) => setIdentifier(e.target.value)}
                  value={identifier}
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
                <Button label="Submit" onClick={handleLogin} />

                {/* If not have an account, sign up now */}
                <p className="text-sm font-light text-gray-500">
                  If not have an account?
                  <Link
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>

            {/* If error occured, show the toast message. */}
            {error && (
              <TostifyMessage
                message={error}
                setState={setError}
                className="top-80 -left-[26rem]"
              />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
