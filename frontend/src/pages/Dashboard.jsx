import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ user, onLogout }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.role === "admin") {
      axios
        .get("http://localhost:5000/api/users") // Change API endpoint as per your backend
        .then((res) => {
          setUsers(res.data.users || []);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
        });
    }
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user?.name}</h2>

      <button onClick={() => alert("Redirect to Update Profile page")}>
        Update Profile
      </button>
      <button onClick={onLogout} style={{ marginLeft: "10px" }}>
        Logout
      </button>

      {user?.role === "admin" && (
        <div style={{ marginTop: "20px" }}>
          <h3>All Registered Users</h3>
          {users.length > 0 ? (
            <ul>
              {users.map((u) => (
                <li key={u.id || u._id}>
                  {u.name} - {u.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
