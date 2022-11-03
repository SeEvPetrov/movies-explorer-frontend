import Header from "../Header/Header";
import MainMovies from "../Header/MoviesHeader/MoviesHeader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

function SavedMovies({
  movies,
  onSubmit,
  preloader,
  isFailed,
  notFoundMovies,
  searchKey,
  onCheckbox,
  checked,
  checkedSavedMovies,
  savedMovies,
  onSave,
  onDelete,
  allSavedMovies,
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
          checkedSaveMovies={checkedSavedMovies}
        />
        {preloader ? (
          <Preloader />
        ) : (
          <MoviesCardList
            displayedMovies={displayedMovies}
            checked={checked}
            checkedSaveMovies={checkedSavedMovies}
            movies={movies}
            notFoundMovies={notFoundMovies}
            isFailed={isFailed}
            savedMovies={savedMovies}
            onSave={onSave}
            onDelete={onDelete}
            allSavedMovies={allSavedMovies}
          />
        )}
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
