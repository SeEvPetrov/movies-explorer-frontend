import { useLocation } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({
  name,
  duration,
  thumbnail,
  trailerLink,
  savedMovies,
  onSave,
  onDelete,
  movie,
  allSavedMovies,
}) {
  const location = useLocation();
  let hours = Math.floor(duration / 60);
  let minutes = Math.floor(duration - hours * 60);
  const isSaved = savedMovies.some((m) => m.movieId === movie.id);
  const isAllSaved = allSavedMovies.some((m) => m.movieId === movie.id);

  let buttonClass =
    isSaved || isAllSaved
      ? "movie-card__btn movie-card__btn_type_saved movie-card__saved_type_active"
      : "movie-card__btn movie-card__btn_type_saved";

  const handleSaveClick = () => {
    if (isSaved) {
      onDelete(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    } else {
      onSave(movie);
    }
  };

  const handleDeleteMovie = () => onDelete(movie);

  return (
    <li className="movie-card">
      <a
        href={trailerLink}
        className="movie-card__trailer-link"
        rel="noreferrer"
        target="_blank"
      >
        <img src={thumbnail} alt={name} className="movie-card__img" />
      </a>

      <div className="movie-card__description">
        <h3 className="movie-card__title">{name}</h3>
        {location.pathname === "/movies" && (
          <button
            className={buttonClass}
            type="button"
            onClick={handleSaveClick}
          ></button>
        )}

        {location.pathname === "/saved-movies" && (
          <button
            className="movie-card__btn movie-card__btn_type_delete"
            type="button"
            onClick={handleDeleteMovie}
          ></button>
        )}
      </div>
      <p className="movie-card__duration">
        {hours}ч{minutes}м
      </p>
    </li>
  );
}

export default MovieCard;
