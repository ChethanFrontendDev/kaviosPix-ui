import { NavLink, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";

const Albums = () => {
  const navigate = useNavigate();

  const { data, loading, error, refetch: fetchData } = useFetch("/albums");

  const handleAddNewAlbum = () => {
    navigate("/new-album");
  };

  const handleDeleteAlbum = async (id) => {
    try {
      await axios.delete(`https://kavios-pix-apis.vercel.app/albums/${id}`, {
        withCredentials: true,
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-3">
      <div className="py-3">
        {loading && (
          <div className="alert alert-info text-center">Loading...</div>
        )}
        {error && <div className="alert alert-danger text-center">{error}</div>}
      </div>

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleAddNewAlbum}>
          Create New Album
        </button>
      </div>
      <div className="container mt-4">
        <div className="row g-4">
          {data?.map((album) => (
            <div key={album._id} className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary">{album.albumId}</span>
                    <i
                      className="bi bi-trash text-danger"
                      role="button"
                      title="Delete"
                      onClick={() => handleDeleteAlbum(album._id)}
                    ></i>
                  </div>

                  <h5 className="card-title mt-2">{album.name}</h5>

                  <p className="card-text text-muted">{album.description}</p>
                </div>

                <div className="card-footer bg-transparent border-top-0 d-flex justify-content-end">
                  <NavLink
                    to={`/album/${album._id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Albums;
