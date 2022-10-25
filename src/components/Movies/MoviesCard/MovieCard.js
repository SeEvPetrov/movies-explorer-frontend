import "./MovieCard.css";

function MovieCard({ name, hours, minutes, save, image, classStatus }) {
  return (
    <li className="movie-card">
      <img src={image} alt={name} className="movie-card__img" />
      <div className="movie-card__description">
        <h3 className="movie-card__title">{name}</h3>
        <button
          className={`movie-card__btn ${classStatus} ${
            save && "movie-card__saved_type_active"
          }`}
          type="button"
        ></button>
      </div>
      <p className="movie-card__duration">
        {hours}ч{minutes}м
      </p>
    </li>
  );
}

export default MovieCard;
