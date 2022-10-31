import "./MoviesCardList.css";
import moviesArray from "../../../utils/moviesArray";
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

  // let classTextError =
  // isFailed && !isNotFound
  //   ? 'movies-list__error_visible'
  //   : 'movies-list__error';

  let buttonClass =
    !(movies.length > 4) ||
    displayedMovies >= movies.length ||
    displayedMovies >= moviesFilterArr.length
      ? "movie-cards__button_hidden"
      : "movie-cards__button";

  // let classTextNotFound =
  //   isNotFound && moviesFilterArr.length === 0
  //     ? 'movies-list__not-found_visible'
  //     : 'movies-list__not-found';

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
                  // classStatus={"movie-card__btn_type_saved"}
                />
              );
            })}
          </ul>
          <button type="button" className={buttonClass}>
            Ещё
          </button>
        </>
      ) : (
        <>
          <ul className="movies-cards__list">
            {saveMoviesFilterArr.map((card) => {
              return (
                <MovieCard
                  key={card.id}
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
