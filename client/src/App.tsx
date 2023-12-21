import {Routes, Route} from "react-router-dom";
import HomePage from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import AddMovie from "./routes/AddMovie";
import RequestMovie from "./routes/RequestMovie";
import Reviews from "./routes/Reviews";
import Movie from "./routes/Movie";
import ShowRequests from "./routes/ShowRequests";
import NavBar from "./components/Header";

function App() {

  return (
    <div>
      <NavBar />  
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/addMovie" element={<AddMovie/>} />
          <Route path="/requestMovie" element={<RequestMovie/>} />
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/movie" element={<Movie/>}/>
          <Route path="/showRequests" element={<ShowRequests/>} />
        </Routes>
    </div>
  );
}

export default App;