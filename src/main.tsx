import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "./components/Movie";
import Movies from "./components/Movies";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="/movie/:movieId" element={<Movie />} />
    </Routes>
  </BrowserRouter>
);
