import Header from "../Header/Header";
import MainMovies from '../Header/MoviesHeader/MoviesHeader';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from '../Footer/Footer';

import './Movies.css';

function Movies () {
    return (
        <section className="movies">
        <Header
        color={'header__theme_black'}
        location={'header__container_movies'}
      >
        <MainMovies />
      </Header>
      <SearchForm />
      <MoviesCardList />
      <Footer />
      </section>
    );
}

export default Movies;