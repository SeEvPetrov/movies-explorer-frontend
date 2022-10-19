import Header from "../Header/Header";
import MainMovies from '../Header/MoviesHeader/MoviesHeader';
import SearchForm from "./SearchForm/SearchForm";

function Movies () {
    return (
        <>
        <Header
        color={'header__theme_black'}
        location={'header__container_movies'}
      >
        <MainMovies />
      </Header>
      <SearchForm />
      </>
    );
}

export default Movies;