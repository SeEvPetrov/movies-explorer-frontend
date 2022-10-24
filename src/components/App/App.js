import { useState, useEffect } from "react";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../User/Register/Register";
import Login from "../User/Login/Login";

import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState("false");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route
          path="/movies"
          element={<Movies isLoading={isLoading} />}
        ></Route>
        <Route
          path="/saved-movies"
          element={<SavedMovies isLoading={isLoading} />}
        ></Route>
        <Route
          path="/profile"
          element={<Profile />}
        ></Route>
        <Route
          path="/signup"
          element={<Register />}
        ></Route>
        <Route
          path="/signin"
          element={<Login />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
