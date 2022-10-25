import Header from "../Header/Header";
import MainMovies from "../Header/MoviesHeader/MoviesHeader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

function SavedMovies({ isLoading }) {
  return (
    <>
      <Header
        color={"header__theme_black"}
        location={"header__container_movies"}
      >
        <MainMovies />
      </Header>
      <section className="movie-saved">
        <SearchForm />
        {isLoading && <Preloader />}
        <MoviesCardList />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
