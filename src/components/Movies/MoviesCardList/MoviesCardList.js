import "./MoviesCardList.css";
import moviesArray from '../../../utils/moviesArray';
import MovieCard from "../MoviesCard/MovieCard";

function MoviesCardList() {

  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {moviesArray.map((card) => {
          return (
            <MovieCard
              key={card.id.toString()}
              name={card.name}
              hours={card.hours}
              minutes={card.minutes}
              save={card.save}
              image={card.image}
            />
          );
        })}
      </ul>
      <button type="button" className="movie-cards__button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
