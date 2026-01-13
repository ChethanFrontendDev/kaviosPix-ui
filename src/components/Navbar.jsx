import React from "react";

const Navbar = ({ user }) => {
  const handleLogout = () => {
    alert("Logged out!");
    // Add your logout logic here
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a className="navbar-brand" href="#">
        KaviosPix
      </a>

      <div className="ms-auto dropdown">
        <img
          src={user?.picture}
          alt="profile"
          className="rounded-circle dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer", width: "30px" }}
        />

        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
