import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../User/Register/Register";
import Login from "../User/Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute";

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
  const [errorMessage, setErrorMessage] = useState({
    textError: "",
    isError: null,
  });
  const [errorMessageMovies,  setErrorMessageMovies] = useState('');
  const [errorMessageSavedMovies,  setErrorMessageSavedMovies] = useState('');
  const [moviesToLoad, setMoviesToLoad] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [checked, setChecked] = useState(true);
  const [checkedSavedMovies, setCheckedSavedMovies] = useState(true);
  const [allSavedMovies, setAllSavedMovies] = useState([]);

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      if (location.pathname === '/saved-movies') {
        setErrorMessageSavedMovies('');
        mainApi
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          console.log(err);
        });
      }
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
        setCheckedSavedMovies(
          JSON.parse(localStorage.getItem("checkboxSavedMovies"))
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, location.pathname]);

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
        setErrorMessage({
          textError:
            err.status !== 400
              ? "Пользователь с таким email уже зарегистрирован"
              : "При регистрации произошла ошибка.",
          isError: true,
        });
      })
      .finally(() => {
        setTimeout(() => resetErrorText(), 2000);
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
          setErrorMessage({
            textError: "Вы ввели неправильный логин или пароль.",
            isError: true,
          });
        }
      })
      .finally(() => {
        setTimeout(() => resetErrorText(), 2000);
      });
  };

  const resetErrorText = () => {
    setErrorMessage({
      textError: "",
      isError: null,
    });
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
      .createMovie(movie)
      .then((data) => {
        setSavedMovies([data, ...savedMovies]);
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
      setCheckedSavedMovies(!checkedSavedMovies);
      localStorage.setItem("checkboxSavedMovies", !checkedSavedMovies);
    }
  };

  const searchMovies = (movies, name) => {
    const moviesArray = movies.filter((item) =>
    item.nameRU.toLowerCase().includes(name.toLowerCase())
  );
    if (location.pathname === "/movies" && moviesArray.length === 0) {
      setErrorMessageMovies("Ничего не найдено");
    } else {
      setErrorMessageMovies('');
    }

    if (location.pathname === "/saved-movies" && moviesArray.length === 0) {
      setErrorMessageSavedMovies("Ничего не найдено");
    } else {
      setErrorMessageSavedMovies('');
    }

   
    return moviesArray;
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
          setPreloader(true);
          const resultArray = searchMovies(
            JSON.parse(localStorage.getItem("allMovies")),
            name
          );
          setMovies(resultArray);
          localStorage.setItem("filteredMovies", JSON.stringify(resultArray));
          localStorage.setItem("searchKey", name);
          localStorage.setItem("checkbox", checked);
          setTimeout(() => setPreloader(false), 1000);
        })
        .catch((err) => {
          setErrorMessage({
            textError:
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
            isError: true,
          });
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => resetErrorText(), 2000);
        });
    } else if (JSON.parse(localStorage.getItem("allMovies"))) {
      setPreloader(true);
      const resultArray = searchMovies(
        JSON.parse(localStorage.getItem("allMovies")),
        name
      );
      setMovies(resultArray);
      localStorage.setItem("filteredMovies", JSON.stringify(resultArray));
      localStorage.setItem("searchKey", name);
      localStorage.setItem("checkbox", checked);
      setTimeout(() => setPreloader(false), 1000);
    }
  };

  const handleSearchSavedMovies = (name) => {
    setPreloader(true);
    mainApi
      .getSavedMovies()
      .then((movies) => {
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        setAllSavedMovies(movies);
        localStorage.setItem("checkboxSavedMovies", checkedSavedMovies);
        const userSavedMovies = movies.filter((movie) => {
          return movie.owner === currentUser._id;
        });
        const resultArray = searchMovies(userSavedMovies, name);
        setSavedMovies(resultArray);
        setTimeout(() => setPreloader(false), 1000);
      })
      .catch((err) => {
        setErrorMessage({
          textError:
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
          isError: true,
        });
      })

    const resultArray = searchMovies(allSavedMovies, name);

    setSavedMovies(resultArray);
    setTimeout(() => setPreloader(false), 1000);
  };

  const handleDeleteMovie = (movie) => {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.movieId
    );

    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(
          (item) => item._id !== savedMovie._id
        );

        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (name, email) => {
    auth
      .updateUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setErrorMessage({
          textError: "Изменение данных прошло успешно!",
          isError: false,
        });
      })
      .catch((err) => {
        setErrorMessage({
          textError:
            err.status !== 400
              ? "Пользователь с таким email уже зарегистрирован"
              : "При обновлении профиля произошла ошибка.",
          isError: true,
        });
        console.error(err);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    setErrorMessageMovies('');
    setErrorMessageSavedMovies('');
    navigate("/");
    setLoggedIn(false);
    setCurrentUser({});
    setErrorMessage({
      textError: "",
      isError: null,
    });
    setPreloader(false);
    setMovies([]);
    setSavedMovies([]);
    setChecked(true);
    setCheckedSavedMovies(true);
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  onSignOut={handleSignOut}
                  onUpdateUser={handleUpdateUser}
                  errorMessage={errorMessage}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/" element={<Main loggedIn={loggedIn} />}></Route>
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  errorMessageMovies={errorMessageMovies}
                  displayedMovies={displayedMovies}
                  onSubmit={handleSearchMovies}
                  movies={movies}
                  preloader={preloader}
                  searchKey={localStorage.getItem("searchKey")}
                  onCheckbox={handleChangeCheckbox}
                  checked={checked}
                  checkedSavedMovies={checkedSavedMovies}
                  savedMovies={savedMovies}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  allSavedMovies={allSavedMovies}
                  handleShowMoreMovies={handleShowMoreMovies}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  errorMessageSavedMovies={errorMessageSavedMovies}
                  onSubmit={handleSearchSavedMovies}
                  movies={movies}
                  preloader={preloader}
                  searchKey={localStorage.getItem("searchKey")}
                  onCheckbox={handleChangeCheckbox}
                  checked={checked}
                  checkedSavedMovies={checkedSavedMovies}
                  savedMovies={savedMovies}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  allSavedMovies={allSavedMovies}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
