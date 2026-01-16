import GoogleLoginButton from "./components/GoogleLoginButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleProfile from "./components/GoogleProfile";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import AlbumForm from "./components/AlbumForm";
import Layout from "./components/Layout";
import AlbumDetail from "./pages/AlbumDetail";
import ImageForm from "./components/ImageForm";
import ImageDetail from "./pages/ImageDetail";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://kavios-pix-apis.vercel.app/user/profile",
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<GoogleLoginButton />} />
          <Route element={<Layout user={user} />}>
            <Route
              path="/v2/profile/google"
              element={<GoogleProfile user={user} setUser={setUser} />}
            />
            <Route path="/" element={<Home user={user} authLoading={authLoading} />} />
            <Route path="/new-album" element={<AlbumForm user={user} />} />
            <Route path="/album/:id" element={<AlbumDetail user={user} />} />
            <Route path="/upload-image" element={<ImageForm />} />
            <Route path="/album/:id/image/:id" element={<ImageDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
