import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../User/Register/Register";
import Login from "../User/Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";

import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/movies" element={<Movies isLoading={false} />}></Route>
        <Route
          path="/saved-movies"
          element={<SavedMovies isLoading={false} />}
        ></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
