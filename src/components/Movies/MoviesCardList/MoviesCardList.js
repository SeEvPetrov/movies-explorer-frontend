import "./MoviesCardList.css";
import MovieCard from "../MoviesCard/MovieCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  displayedSavedMovies,
  errorMessageMovies,
  errorMessageSavedMovies,
  handleShowMoreMovies,
  displayedMovies,
  movies,
  savedMovies,
  onSave,
  onDelete,
  checked,
  checkedSavedMovies,
}) {
  const location = useLocation();
  let moviesPage = location.pathname === "/movies";

  const searchShortMovies = (movies) => {
    if (typeof movies === 'undefined') {
      return
    } 
    const resultShortMoviesArray = movies.filter((item) => item.duration <= 40);
    return resultShortMoviesArray;
  };

  let saveMoviesArray = !checkedSavedMovies
    ? searchShortMovies(displayedSavedMovies)
    : displayedSavedMovies;

  let moviesArray = !checked ? searchShortMovies(movies) : movies;

  let buttonClass =
    !(movies.length > 4) ||
    displayedMovies >= movies.length ||
    displayedMovies >= moviesArray.length
      ? 'movie-cards__button movie-cards__button_hidden'
      : 'movie-cards__button';

  return (
    <div className="movies-cards">
      {moviesPage ? (
        <>
        <span className="movies-cards__response">{errorMessageMovies}</span>
          <ul className="movies-cards__list">
            {moviesArray.slice(0, displayedMovies).map((card) => {
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
                />
              );
            })}
          </ul>
          <button
            type="button"
            className={buttonClass}
            onClick={handleShowMoreMovies}
          >
            Ещё
          </button>
        </>
      ) : (
        <>
        <span className="movies-cards__response">{errorMessageSavedMovies}</span>
          <ul className="movies-cards__list">
            {saveMoviesArray.map((card) => {
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
