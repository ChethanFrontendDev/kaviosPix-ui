import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";

export default function ImageDetail() {
  const params = useParams();
  const location = useLocation();
  const { albumId } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState("");

  const {
    data,
    loading,
    error,
    refetch: fetchData,
  } = useFetch(`/albums/${albumId}/images`);

  const {
    postHandler,
    success,
    error: postError,
    loading: postLoading,
  } = usePost();

  const matchedData = data?.find((image) => image._id === params.id);

  const updateCommentHandler = async (event, imageId) => {
    event.preventDefault();

    try {
      await postHandler(`/albums/${albumId}/images/${imageId}/comments`, {
        comment: comments,
      });
      setComments("");
      setIsEditing(false);

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return (
      <div className="container alert alert-info text-center py-3">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="container alert alert-danger text-center py-3">
        {error}
      </div>
    );

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">
              <span className="text-muted">Name:</span> {matchedData?.name}
            </h4>

            <p>
              <strong>Person:</strong> {matchedData?.person}
            </p>

            <div className="mb-3">
              <strong>Tags:</strong>{" "}
              {matchedData?.tags?.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-2 py-2 px-3">
                  {tag}
                </span>
              ))}
            </div>

            {matchedData?.comments.length > 0 && (
              <p>
                <strong>Comments:</strong> {matchedData?.comments.join(", ")}
              </p>
            )}

            <hr />

            <h5 className="mb-3"> Comment Section</h5>

            {!isEditing && (
              <button
                className="btn btn-info"
                onClick={() => setIsEditing(true)}
              >
                Add Comment
              </button>
            )}

            {isEditing && (
              <form onSubmit={(e) => updateCommentHandler(e, matchedData?._id)}>
                <div className="mb-3">
                  <textarea
                    rows="3"
                    className="form-control"
                    placeholder="Write your comment here..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-success" type="submit">
                    {postLoading ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>

                <div className="py-3">
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  {postError && (
                    <div className="alert alert-danger">{postError}</div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
