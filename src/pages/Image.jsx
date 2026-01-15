import axios from "axios";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Image = () => {
  const params = useParams();
  const { id: albumId } = params;

  const [getFavorites, setGetFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [onSearch, setOnSearch] = useState("");

  let url = `/albums/${albumId}/images`;

  if (getFavorites) {
    url += `/favorites`;
  } else if (onSearch) {
    url += `/by-tag?tags=${onSearch}`;
  }

  const { data, loading, error, refetch: fetchData } = useFetch(url);

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(
        `https://kavios-pix-apis.vercel.app/albums/${albumId}/images/${imageId}`,

        { withCredentials: true }
      );

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoriteToggle = async (imageId, currentValue) => {
    try {
      await axios.put(
        `https://kavios-pix-apis.vercel.app/albums/${albumId}/images/${imageId}/favorite`,

        { isFavorite: !currentValue },
        { withCredentials: true }
      );

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return <div className="text-center py-2 alert alert-info">Loading...</div>;
  if (error)
    return <div className="text-center py-2 alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-4">
          <h4>Gallery</h4>

          <div className="d-flex gap-2 align-items-center">
            <input
              type="text"
              className="form-control"
              placeholder="Search by tag..."
              style={{ maxWidth: "200px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-secondary"
              onClick={() => setOnSearch(searchQuery)}
            >
              search
            </button>
          </div>

          <button
            className={`btn ${
              getFavorites ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={() => setGetFavorites(!getFavorites)}
          >
            ❤️ Favorites
          </button>
        </div>

        <NavLink
          state={{ albumId }}
          to={"/upload-image"}
          className="btn btn-primary"
        >
          Upload Image
        </NavLink>
      </div>

      <div className="row g-4">
        {data.map((image) => (
          <div className="col-md-4 col-lg-3" key={image._id}>
            <div className="card h-100 shadow-sm">
              <div className="position-relative">
                <NavLink
                  state={{ albumId }}
                  to={`/album/${albumId}/image/${image._id}`}
                >
                  <img
                    src={image.imageUrl}
                    className="card-img-top"
                    alt={image.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </NavLink>

                {/* Delete Icon */}
                <span
                  onClick={() => handleDelete(image._id, image.isFavorite)}
                  className="position-absolute top-0 start-0 m-2 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                  }}
                  title="Delete"
                >
                  <i className="bi bi-trash"></i>
                </span>

                {/* Favorite Star */}
                <span
                  className={`position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center ${
                    image.isFavorite
                      ? "bg-warning text-dark"
                      : "bg-light text-secondary"
                  }`}
                  style={{
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                  }}
                  title="Toggle Favorite"
                  onClick={() =>
                    handleFavoriteToggle(image._id, image.isFavorite)
                  }
                >
                  <i
                    className={`bi ${
                      image.isFavorite ? "bi-star-fill" : "bi-star"
                    }`}
                  ></i>
                </span>
              </div>

              <div className="card-body">
                <h6 className="card-title">{image.name}</h6>

                <p className="mb-1">
                  <strong>Person:</strong> {image.person || "N/A"}
                </p>

                <div className="mb-2">
                  {image.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary me-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Image;
