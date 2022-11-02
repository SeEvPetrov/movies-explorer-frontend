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
  isLoading,
  isFailed,
  isNotFound,
  searchKey,
  onCheckbox,
  checked,
  checkedSaveMovies,
  savedMovies,
  onSave,
  onDelete,
  allSavedMovies,
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
          checkedSaveMovies={checkedSaveMovies}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            checked={checked}
            checkedSaveMovies={checkedSaveMovies}
            movies={movies}
            isNotFound={isNotFound}
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
