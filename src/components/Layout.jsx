import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ user }) => {
  return (
    <>
      {user && <Navbar user={user} />}
      <Outlet />
    </>
  );
};
export default Layout;
