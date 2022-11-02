import "./MoviesCardList.css";
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

  const searchShortMovies = (movies) => {
    const searchShortMoviesArr = movies.slice(0);
    return searchShortMoviesArr.filter((item) => item.duration <= 40);
  };

  let saveMoviesFilterArr = !checkedSaveMovies
    ? searchShortMovies(savedMovies)
    : savedMovies;

  let moviesFilterArr = !checked ? searchShortMovies(movies) : movies;

  let buttonMoreClass =
    !(movies.length > 4) ||
    displayedMovies >= movies.length ||
    displayedMovies >= moviesFilterArr.length
      ? "movie-cards__button_hidden"
      : "movie-cards__button";

  return (
    <div className="movies-cards">
      {moviesPage ? (
        <>
          <ul className="movies-cards__list">
            {moviesFilterArr.slice(0, displayedMovies).map((card) => {
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
          <button type="button" className={buttonMoreClass} onClick={handleShowMoreMovies}>
            Ещё
          </button>
        </>
      ) : (
        <>
          <ul className="movies-cards__list">
            {saveMoviesFilterArr.map((card) => {
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
