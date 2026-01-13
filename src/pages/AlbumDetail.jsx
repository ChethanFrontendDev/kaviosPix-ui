import { NavLink, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import usePost from "../hooks/usePost";
import Image from "./Image";

export default function AlbumDetail({ user: existingUser }) {
  const params = useParams();
  const { data, loading, error, refetch: fetchData } = useFetch("/albums");
  const { data: getUsers } = useFetch("/users");

  const { postHandler, error: postError } = usePost();

  const [isEditing, setIsEditing] = useState(false);
  const [editedDesc, setEditedDesc] = useState("");

  const matchedAlbum = data?.find((album) => album._id === params.id);

  const handleUpdateDescription = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/albums/${id}`,
        { description: editedDesc },
        { withCredentials: true }
      );

      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddUser = async (user, id) => {
    try {
      await postHandler(`/albums/${id}/share`, {
        emails: [user.email],
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (matchedAlbum?.description) {
      setEditedDesc(matchedAlbum.description);
    }
  }, [matchedAlbum]);

  return (
    <div className="container">
      <div>
        {loading && (
          <div className="alert alert-info text-center">Loading...</div>
        )}
        {error && <div className="alert alert-danger text-center">{error}</div>}
      </div>

      {/* Back Button */}
      <div className="py-3">
        <NavLink to={"/"} className="btn btn-outline-primary">
          ← Back
        </NavLink>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">{matchedAlbum?.name}</h2>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="badge bg-secondary me-2 py-2 px-3">
          {matchedAlbum?.albumId}
        </span>
        <span className="text-muted">
          {new Date(matchedAlbum?.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Description */}
      <div className="card mb-4">
        <div className="card-body position-relative">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title">Description</h5>

            {!isEditing && (
              <i
                className="bi bi-pencil-square text-primary"
                role="button"
                title="Edit"
                onClick={() => setIsEditing(true)}
              ></i>
            )}
          </div>
          {!isEditing ? (
            <p className="card-text text-muted mt-2">
              {matchedAlbum?.description}
            </p>
          ) : (
            <>
              <textarea
                className="form-control mt-2"
                rows="3"
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
              />

              <div className="mt-2 d-flex gap-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleUpdateDescription(matchedAlbum._id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Users */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Users</h5>

        <div className="dropdown">
          <button
            className="btn btn-sm btn-outline-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Add User
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {getUsers
              ?.filter((u) => u.email !== existingUser?.email)
              .map((user) => (
                <li key={user._id}>
                  <button
                    className="dropdown-item"
                    onClick={() => handleAddUser(user, matchedAlbum._id)}
                  >
                    {user.email}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="row g-2">
        {matchedAlbum?.sharedUsers?.map((user, index) => (
          <div key={index} className="col-md-4">
            <div className="card p-2">
              <div className="d-flex justify-content-between align-items-center">
                <span>{user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {postError && <div className="alert alert-danger my-3">{postError}</div>}

      <div>
        <Image />
      </div>
    </div>
  );
}
