import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";
import AddMovie from "../routes/AddMovie";
import RequestMovie from "../routes/RequestMovie";
import Reviews from "../routes/Reviews";
import Movie from "../routes/Movie";
import ShowRequests from "../routes/ShowRequests";
const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addMovie" element={<AddMovie />} />
        <Route path="/requestMovie" element={<RequestMovie />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/showRequests" element={<ShowRequests />} />
      </Routes>
    </div>
  );
};

export default Content;
