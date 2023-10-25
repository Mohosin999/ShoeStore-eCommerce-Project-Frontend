"use client";
import { action, thunk } from "easy-peasy";
import { setToken } from "../lib/auth";
import axios from "axios";

const registerUser = {
  token: [],
  error: "",

  setToken: action((state, token) => {
    state.token = token;
    setToken(token);
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  register: thunk(async ({ setToken, setError }, payload) => {
    try {
      const registerInfo = {
        username: payload.username,
        email: payload.email,
        password: payload.password,
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

      const registerResponse = register.data;

      if (registerResponse) {
        setToken(registerResponse);
      }
    } catch (error) {
      setError(error.message);
    }
  }),
};

export default registerUser;
