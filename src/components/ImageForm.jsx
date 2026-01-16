import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";

const ImageForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { albumId } = location.state || {};

  const { postHandler, success, loading, error } = usePost();

  const [formData, setFormData] = useState({
    file: null,
    tags: "",
    person: "",
    isFavorite: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const uploadImageSubmit = async (event) => {
    event.preventDefault();

    const formPayload = new FormData();
    formPayload.append("file", formData.file);
    formPayload.append(
      "tags",
      JSON.stringify(formData.tags.split(",").map((t) => t.trim()))
    );
    formPayload.append("person", formData.person);
    formPayload.append("isFavorite", formData.isFavorite);

    try {
      await postHandler(`/albums/${albumId}/images`, formPayload);
      setFormData({
        file: null,
        tags: "",
        person: "",
        isFavorite: false,
      });

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container py-4">
      <h2 className="py-3">Upload Image</h2>
      <form onSubmit={uploadImageSubmit}>
        <div className="mb-3">
          <label className="form-label">Image File</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
            name="file"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input
            type="text"
            className="form-control"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Person</label>
          <input
            type="text"
            className="form-control"
            name="person"
            value={formData.person}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="favoriteCheck"
            name="isFavorite"
            checked={formData.isFavorite}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="favoriteCheck">
            Mark as Favorite
          </label>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

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
export default ImageForm;
