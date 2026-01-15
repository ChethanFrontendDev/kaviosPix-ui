import axios from "axios";

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://kavios-pix-apis.vercel.app/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("Logout Failed", error);
    }
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
          referrerPolicy="no-referrer"
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
