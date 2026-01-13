const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="card p-4 shadow text-center">
        <h4 className="mb-3">Welcome</h4>
        <p className="text-muted">Login to continue</p>
        <button
          className="btn btn-primary py-2 px-4"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};
export default GoogleLoginButton;
