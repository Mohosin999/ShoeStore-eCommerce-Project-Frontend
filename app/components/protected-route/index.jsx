// components/ProtectedRoute.js

"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (e.g., by verifying the token in localStorage)
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to the login page if not authenticated
    }
  }, []);

  return children;
};

export default ProtectedRoute;
