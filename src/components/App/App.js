import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../User/Register/Register";
import Login from "../User/Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";

import * as auth from "../../utils/Auth";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./App.css";
import {
  BREAKPOINT_1280,
  BREAKPOINT_990,
  BREAKPOINT_480,
  VISIBLE_MOVIES_5,
  VISIBLE_MOVIES_8,
  VISIBLE_MOVIES_12,
  VISIBLE_MOVIES_16,
  MOVIES_TO_LOAD_2,
  MOVIES_TO_LOAD_3,
  MOVIES_TO_LOAD_4,
} from "../../utils/constants";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [moviesToLoad, setMoviesToLoad] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [checked, setChecked] = useState(true);
  const [checkedSaveMovies, setCheckedSaveMovies] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [allSavedMovies, setAllSavedMovies] = useState([]);
  const [isShortSavedMovies, setIsShortSavedMovies] = useState([]);
  const [isCollectionSavedArray, setIsCollectionSavedArray] = useState([]);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          console.log(err);
        });
      auth
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.error(`Данные пользователя не получены: ${err}`);
        });
      if (JSON.parse(localStorage.getItem("filteredMovies"))) {
        setMovies(JSON.parse(localStorage.getItem("filteredMovies")));
        setChecked(JSON.parse(localStorage.getItem("checkbox")));
        setCheckedSaveMovies(
          JSON.parse(localStorage.getItem("checkboxSavedMovies"))
        );
      }
    }
  }, [loggedIn]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(location.pathname);
          }
        })
        .catch((err) => {
          handleSignOut();
          console.error(err);
        });
    }
  };

  const handleRegister = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((data) => {
        if (data) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        setErrorMessage(
          err.status !== 400
            ? "Пользователь с таким email уже зарегистрирован"
            : "При регистрации произошла ошибка."
        );
      })
      .finally(() => {
        resetErrorText();
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          auth.checkToken(res.token).then((res) => {
            if (res) {
              setTimeout(() => navigate("/movies"), 300);
              setLoggedIn(true);
            }
          });
        }
      })
      .catch((err) => {
        if (err.includes(401)) {
          setErrorMessage("Вы ввели неправильный логин или пароль.");
        }
      });
  };

  const resetErrorText = () => {
    setTimeout(() => setErrorMessage(""), 10000);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (location.pathname === "/movies") {
      if (windowWidth <= BREAKPOINT_480) {
        setDisplayedMovies(VISIBLE_MOVIES_5);
        setMoviesToLoad(MOVIES_TO_LOAD_2);
      } else if (
        windowWidth <= BREAKPOINT_990 &&
        windowWidth > BREAKPOINT_480
      ) {
        setDisplayedMovies(VISIBLE_MOVIES_8);
        setMoviesToLoad(MOVIES_TO_LOAD_2);
      } else if (
        windowWidth <= BREAKPOINT_1280 &&
        windowWidth > BREAKPOINT_990
      ) {
        setDisplayedMovies(VISIBLE_MOVIES_12);
        setMoviesToLoad(MOVIES_TO_LOAD_3);
      } else if (windowWidth > BREAKPOINT_1280) {
        setDisplayedMovies(VISIBLE_MOVIES_16);
        setMoviesToLoad(MOVIES_TO_LOAD_4);
      }
    }

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth, location]);

  const handleShowMoreMovies = () => {
    setDisplayedMovies(displayedMovies + moviesToLoad);
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .addMovie(movie)
      .then((data) => {
        setSavedMovies([data, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteMovie = (movie) => {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.movieId
    );

    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter(
          (item) => item._id !== savedMovie._id
        );

        setSavedMovies(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeCheckbox = (evt) => {
    if (location.pathname === "/movies") {
      setChecked(!checked);
      localStorage.setItem("checkbox", !checked);
    } else if (location.pathname === "/saved-movies") {
      setCheckedSaveMovies(!checkedSaveMovies);
      localStorage.setItem("checkboxSavedMovies", !checkedSaveMovies);
    }
  };

  const searchMovies = (movies, name) => {
    return movies.filter((item) =>
      item.nameRU.toLowerCase().includes(name.toLowerCase())
    );
  };

  const handleSearchMovies = (name) => {
    if (!JSON.parse(localStorage.getItem("allMovies"))) {
      moviesApi
        .getAllMovies()
        .then((movies) => {
          const beforeMovie = movies.slice(0, 23);
          const afterMovie = movies.slice(24);
          const arrMovies = beforeMovie.concat(afterMovie);
          localStorage.setItem("allMovies", JSON.stringify(arrMovies));
        })
        .then(() => {
          setIsLoading(true);
          const resultArray = searchMovies(
            JSON.parse(localStorage.getItem("allMovies")),
            name
          );
          setMovies(resultArray);
          setIsNotFound(!movies.length && !isFailed);
          localStorage.setItem("filteredMovies", JSON.stringify(resultArray));
          localStorage.setItem("searchKey", name);
          localStorage.setItem("checkbox", checked);
          setTimeout(() => setIsLoading(false), 1000);
        })
        .catch((err) => {
          setIsFailed(true);
          console.log(err);
        });
    } else if (JSON.parse(localStorage.getItem("allMovies"))) {
      setIsLoading(true);
      const resultArray = searchMovies(
        JSON.parse(localStorage.getItem("allMovies")),
        name
      );
      setMovies(resultArray);
      setIsNotFound(!movies.length || !isFailed);
      localStorage.setItem("filteredMovies", JSON.stringify(resultArray));
      localStorage.setItem("searchKey", name);
      localStorage.setItem("checkbox", checked);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleSearchSavedMovies = (name) => {
    setIsLoading(true);
    mainApi
      .getSavedMovies()
      .then((movies) => {
        setAllSavedMovies(movies);
        localStorage.setItem("checkboxSavedMovies", checkedSaveMovies);
        const userSavedMovies = movies.filter((movie) => {
          return movie.owner === currentUser._id;
        });
        const resultArray = searchMovies(userSavedMovies, name);
        setSavedMovies(resultArray);
        setIsNotFound(!resultArray.length && !isFailed);
        setTimeout(() => setIsLoading(false), 1000);
      })
      .catch((err) => console.log(err));

    const resultArray = searchMovies(allSavedMovies, name);

    setSavedMovies(resultArray);
    setIsNotFound(!resultArray.length || !isFailed);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleUpdateUser = (name, email) => {
    auth
      .updateUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setErrorMessage("Изменение данных прошло успешно!");
      })
      .catch((err) => {
        setErrorMessage(
          err.status !== 400
            ? "Пользователь с таким email уже зарегистрирован"
            : "При обновлении профиля произошла ошибка."
        );
        console.error(err);
      })
      .finally(() => {
        resetErrorText();
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
    setLoggedIn(false);
    setCurrentUser({});
    setErrorMessage("");
    setIsLoading(false);
    setIsFailed(false);
    setMovies([]);
    setSavedMovies([]);
    setChecked(true);
    setCheckedSaveMovies(true);
    setIsNotFound(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                errorMessage={errorMessage}
                onRegister={handleRegister}
              />
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <Login onLogin={handleLogin} errorMessage={errorMessage} />
            }
          ></Route>
          <Route path="/" element={<Main loggedIn={loggedIn} />}></Route>
          <Route
            path="/movies"
            element={
              <Movies
                displayedMovies={displayedMovies}
                onSubmit={handleSearchMovies}
                movies={movies}
                isLoading={isLoading}
                isFailed={isFailed}
                isNotFound={isNotFound}
                searchKey={localStorage.getItem("searchKey")}
                onCheckbox={handleChangeCheckbox}
                checked={checked}
                checkedSaveMovies={checkedSaveMovies}
                savedMovies={savedMovies}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                allSavedMovies={allSavedMovies}
                handleShowMoreMovies={handleShowMoreMovies}
              />
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                onSubmit={handleSearchSavedMovies}
                movies={movies}
                isLoading={isLoading}
                isFailed={isFailed}
                isNotFound={isNotFound}
                searchKey={localStorage.getItem("searchKey")}
                onCheckbox={handleChangeCheckbox}
                checked={checked}
                checkedSaveMovies={checkedSaveMovies}
                savedMovies={savedMovies}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                allSavedMovies={allSavedMovies}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                onSignOut={handleSignOut}
                onUpdateUser={handleUpdateUser}
                errorMessage={errorMessage}
              />
            }
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
