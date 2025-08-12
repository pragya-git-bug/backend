import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/users/me");
      setUser(res.data);
      setForm({ name: res.data.name, email: res.data.email, password: "" });
    } catch (err) {
      alert("Failed to load profile");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name: form.name, email: form.email };
      if (form.password) payload.password = form.password;
      const res = await axios.put("/users/me", payload);
      setUser(res.data);
      setForm({ ...form, password: "" });
      alert("Profile updated");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your profile? This cannot be undone.")) return;
    try {
      await axios.delete("/users/me");
      dispatch(logout());
      navigate("/signup");
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (!user) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">My Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="w-full p-2 border rounded" required />
        {/* <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="New Password (leave blank to keep)" className="w-full p-2 border rounded" /> */}
        <div className="flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
          <button type="button" className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
