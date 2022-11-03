import "./MoviesCardList.css";
import { useState, useEffect } from "react";
import MovieCard from "../MoviesCard/MovieCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  handleShowMoreMovies,
  displayedMovies,
  movies,
  isNotFound,
  isFailed,
  savedMovies,
  onSave,
  onDelete,
  checked,
  checkedSaveMovies,
  allSavedMovies,
}) {
  const location = useLocation();
  let moviesPage = location.pathname === "/movies";
  const [isMoreButton, setMoreButton] = useState(false);

  useEffect(() => {
    movies.length > displayedMovies
      ? setMoreButton(true)
      : setMoreButton(false);
  }, [movies.length, displayedMovies]);

  const searchShortMovies = (movies) => {
    const resultShortMoviesArr = movies.slice(0);
    return resultShortMoviesArr.filter((item) => item.duration <= 40);
  };

  let saveMoviesArr = !checkedSaveMovies
    ? searchShortMovies(savedMovies)
    : savedMovies;

  let moviesArr = !checked ? searchShortMovies(movies) : movies;

  return (
    <div className="movies-cards">
      {moviesPage ? (
        <>
          <ul className="movies-cards__list">
            {moviesArr.slice(0, displayedMovies).map((card) => {
              return (
                <MovieCard
                  key={card.id}
                  name={card.nameRU}
                  duration={card.duration}
                  trailerLink={card.trailerLink}
                  thumbnail={`https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`}
                  savedMovies={savedMovies}
                  onSave={onSave}
                  onDelete={onDelete}
                  movie={card}
                  allSavedMovies={allSavedMovies}
                />
              );
            })}
          </ul>
          <button
            type="button"
            className={`movie-cards__button ${
              !isMoreButton && "movie-cards__button_hidden"
            }`}
            onClick={handleShowMoreMovies}
          >
            Ещё
          </button>
        </>
      ) : (
        <>
          <ul className="movies-cards__list">
            {saveMoviesArr.map((card) => {
              return (
                <MovieCard
                  key={card._id}
                  name={card.nameRU}
                  duration={card.duration}
                  trailerLink={card.trailerLink}
                  thumbnail={card.thumbnail}
                  savedMovies={savedMovies}
                  onSave={onSave}
                  onDelete={onDelete}
                  movie={card}
                  allSavedMovies={allSavedMovies}
                />
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default MoviesCardList;
