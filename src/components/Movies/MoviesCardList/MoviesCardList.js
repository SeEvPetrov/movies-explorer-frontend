
import MovieCard from '../MoviesCard/MovieCard';
import moviesArray from '../../../utils/moviesArray';
import "./MoviesCardList.css";

function MoviesCardList() {
  return (
    <section className="movies-cards">
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