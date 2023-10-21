// pages/dashboard.js

import ProtectedRoute from "../components/protected-route";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>
        <h2>Dashboard</h2>
        {/* Dashboard content */}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
