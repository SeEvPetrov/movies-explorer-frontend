import Header from "../Header/Header";
import MainMovies from "../Header/MoviesHeader/MoviesHeader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

function SavedMovies({
  displayedSavedMovies,
  errorMessageSavedMovies,
  movies,
  onSubmit,
  preloader,
  searchKey,
  onCheckbox,
  checked,
  checkedSavedMovies,
  savedMovies,
  onSave,
  onDelete,
  displayedMovies,
}) {
  return (
    <>
      <Header
        color={"header__theme_black"}
        location={"header__container_movies"}
      >
        <MainMovies />
      </Header>
      <section className="movie-saved">
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
            errorMessageSavedMovies={errorMessageSavedMovies}
            displayedMovies={displayedMovies}
            checked={checked}
            checkedSavedMovies={checkedSavedMovies}
            movies={movies}
            displayedSavedMovies={displayedSavedMovies}
            savedMovies={savedMovies}
            onSave={onSave}
            onDelete={onDelete}
          />
        )}
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
