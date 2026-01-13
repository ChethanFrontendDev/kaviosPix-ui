import { useState } from "react";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const AlbumForm = ({ user }) => {
  const navigate = useNavigate();
  const { postHandler, success, loading, error } = usePost();

  const [formData, setFormData] = useState({
    albumId: "",
    name: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleAddNewAlbumSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...formData, ownerId: user._id };

    try {
      await postHandler("/albums", payload);
      setFormData({
        albumId: "",
        name: "",
        description: "",
      });

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container py-3">
      <h2 className="text-center">Create New Album</h2>
      <form onSubmit={handleAddNewAlbumSubmit}>
        <div className="mb-3">
          <label className="form-label">Album</label>
          <input
            type="text"
            className="form-control"
            name="albumId"
            value={formData.albumId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Album Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          {loading ? "creating..." : "Create Album"}
        </button>

        <div className="py-3">
          {success && (
            <div className="alert alert-success text-center">{success}</div>
          )}
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
        </div>
      </form>
    </div>
  );
};
export default AlbumForm;
