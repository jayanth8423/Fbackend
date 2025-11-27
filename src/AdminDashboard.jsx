import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await axios.get(
        `${config.apiUrl}${config.endpoints.allUsers}`,
        {
          headers: {
            "X-Admin-Email": "jsnstore@gmail.com",
            "X-Admin-Username": "jsn",
            "X-Admin-Password": "jsn",
          },
        }
      );

      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]);
        setErrorMsg("⚠ Unexpected response format from server.");
      }
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      setUsers([]);
      setErrorMsg("❌ Failed to load users. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update role
  const updateRole = async (email, role) => {
    try {
      await axios.put(
        `${config.apiUrl}${config.endpoints.updateRole}/${email}`,
        { role },
        {
          headers: {
            "X-Admin-Email": "jsnstore@gmail.com",
            "X-Admin-Username": "jsn",
            "X-Admin-Password": "jsn",
          },
        }
      );
      alert(`✅ Role updated to ${role} for ${email}`);
      fetchUsers(); // refresh list after update
    } catch (err) {
      console.error("❌ Error updating role:", err);
      alert("Failed to update role");
    }
  };

  return (
    <div className="AdminDashboard" style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : errorMsg ? (
        <p style={{ color: "red" }}>{errorMsg}</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email}>
                <td>{u.email}</td>
                <td>{u.username}</td>
                <td>{u.phno}</td>
                <td>{u.address}</td>
                <td>{u.gender}</td>
                <td>{u.dob}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => updateRole(u.email, "Manager")}>Make Manager</button>
                  <button onClick={() => updateRole(u.email, "Customer")}>Make Customer</button>
                  <button onClick={() => updateRole(u.email, "Admin")}>Make Admin</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
