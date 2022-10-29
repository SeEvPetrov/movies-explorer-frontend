import "./MoviesCardList.css";
import moviesArray from "../../../utils/moviesArray";
import MovieCard from "../MoviesCard/MovieCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({displayedMovies}) {
  const location = useLocation();
  let moviesPage = location.pathname === "/movies";
  const moviesSaved = moviesArray.filter((movie) => movie.save === true);

  return (
    <div className="movies-cards">
      {moviesPage ? (
        <>
          <ul className="movies-cards__list">
            {moviesArray.map((card) => {
              return (
                <MovieCard
                  key={card.id}
                  name={card.name}
                  hours={card.hours}
                  minutes={card.minutes}
                  save={card.save}
                  image={card.image}
                  classStatus={"movie-card__btn_type_saved"}
                />
              );
            })}
          </ul>
          <button type="button" className="movie-cards__button">
            Ещё
          </button>
        </>
      ) : (
        <>
          <ul className="movies-cards__list">
            {moviesSaved.map((card) => {
              return (
                <MovieCard
                  key={card.id}
                  name={card.name}
                  hours={card.hours}
                  minutes={card.minutes}
                  // save={card.save}
                  image={card.image}
                  classStatus={"movie-card__btn_type_delete"}
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
