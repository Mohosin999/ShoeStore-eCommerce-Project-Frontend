"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const usernameFromCookie = Cookies.get("username");
    setUserName(usernameFromCookie);
  }, []);

  return (
    <div className="mt-32 text-center">
      <h2 className="text-8xl">Dashboard</h2>
      <h3 className="text-4xl">Name: {userName}</h3>
    </div>
  );
};

export default Dashboard;
