import GoogleLoginButton from "./components/GoogleLoginButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleProfile from "./components/GoogleProfile";
import { useState } from "react";
import Home from "./pages/Home";
import AlbumForm from "./components/AlbumForm";
import Layout from "./components/Layout";
import AlbumDetail from "./pages/AlbumDetail";
import ImageForm from "./components/ImageForm";
import ImageDetail from "./pages/ImageDetail";

function App() {
  const [user, setUser] = useState(null);
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
            <Route path="/" element={<Home user={user} />} />
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
