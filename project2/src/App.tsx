import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import PostDetailPage from "./Pages/PostDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchUsers from "./Pages/SearchUsers";
import UserProfile from "./Pages/UserProfile";
import LikedPage from "./Pages/LikedPosts";
import QuotesPage from "./Pages/QuotesPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<SearchUsers />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="liked" element={<LikedPage />} />
          <Route path="quotes" element={<QuotesPage />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
