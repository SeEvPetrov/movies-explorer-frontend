import { useState } from "react";
import Header from "../Header/Header";
import MainMovies from '../Header/MoviesHeader/MoviesHeader';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies ({isLoading, displayedMovies}) {

    return (
      <>
      <Header
        color={'header__theme_black'}
        location={'header__container_movies'}
      >
        <MainMovies />
      </Header>
        <section className="movies">
      <SearchForm />
      {isLoading && <Preloader /> }
      <MoviesCardList displayedMovies={displayedMovies}/>
      <Footer />
      </section>
      </>
    );
}

export default Movies;