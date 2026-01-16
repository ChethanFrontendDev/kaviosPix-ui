import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleProfile = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!user) return <p>Not logged in</p>;

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg p-4 text-center"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "16px" }}
      >
        <img
          src={user?.picture}
          alt="profile"
          className="rounded-circle mx-auto mb-3"
          style={{ width: "120px", height: "120px" }}
          referrerPolicy="no-referrer"
        />

        <h3 className="mb-1">Welcome, {user?.name}</h3>
        <p className="text-muted mb-3">{user?.email}</p>
      </div>
    </div>
  );
};

export default GoogleProfile;
