import Header from "../Header/Header";
import MainMovies from "../Header/MoviesHeader/MoviesHeader";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";

function Movies({
  displayedMovies,
  onSubmit,
  movies,
  preloader,
  isFailed,
  notFoundMovies,
  searchKey,
  savedMovies,
  onSave,
  onDelete,
  onCheckbox,
  checked,
  checkedSavedMovies,
  allSavedMovies,
  handleShowMoreMovies,
}) {
  return (
    <>
      <Header
        color={"header__theme_black"}
        location={"header__container_movies"}
      >
        <MainMovies />
      </Header>
      <section className="movies">
        <SearchForm
          onSubmit={onSubmit}
          searchKey={searchKey}
          onCheckbox={onCheckbox}
          checked={checked}
          checkedSavedMovies={checkedSavedMovies}
        />
        {preloader ? (
          <Preloader />
        ) : (
          <MoviesCardList
            displayedMovies={displayedMovies}
            movies={movies}
            notFoundMovies={notFoundMovies}
            isFailed={isFailed}
            searchKey={searchKey}
            savedMovies={savedMovies}
            onSave={onSave}
            onDelete={onDelete}
            checked={checked}
            checkedSavedMovies={checkedSavedMovies}
            allSavedMovies={allSavedMovies}
            handleShowMoreMovies={handleShowMoreMovies}
          />
        )}
        <Footer />
      </section>
    </>
  );
}

export default Movies;
