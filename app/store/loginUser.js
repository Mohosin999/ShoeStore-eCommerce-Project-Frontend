"use client";
import { action, thunk } from "easy-peasy";
import { setToken } from "../lib/auth";
import axios from "axios";

const loginUser = {
  token: null,
  error: null,

  setToken: action((state, token) => {
    state.token = token;
    setToken(token);
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  login: thunk(async ({ setToken, setError }, payload) => {
    try {
      const loginInfo = {
        identifier: payload.identifier,
        password: payload.password,
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

      const loginResponse = register.data;

      if (loginResponse) {
        setToken(loginResponse);
      }
    } catch (error) {
      setError(error);
    }
  }),
};

export default loginUser;
