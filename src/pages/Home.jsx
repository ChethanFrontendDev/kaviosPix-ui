import { NavLink } from "react-router-dom";
import Albums from "../components/Albums";

const Home = ({ user, authLoading }) => {
  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status" />
      </div>
    );
  }
  if (!user)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-sm text-center">
          <h4 className="mb-3">Not Logged In</h4>
          <p className="text-muted">Please login to continue</p>
          <NavLink to={"/login"} className="btn btn-primary">
            Login
          </NavLink>
        </div>
      </div>
    );

  return (
    <div>
      <Albums />
    </div>
  );
};

export default Home;
