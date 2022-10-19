import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./MoviesHeader.css";

function MoviesHeader() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState("");
  const handleBurgerMenuOpenClick = () => setIsBurgerMenuOpen("open");
  const handleBurgerMenuCloseClick = () => setIsBurgerMenuOpen("");

  return (
    <>
      <nav className="navigate">
        <ul className="navigate__list">
          <li className="navigate__item">
            <NavLink to="/movies" className="navigate__movies">
              Фильмы
            </NavLink>
          </li>
          <li className="navigate__item">
            <NavLink to="/saved-movies" className="navigate__movies">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <div className="navigate__account">
          <Link to="/profile" className="navigate__account-link">
            <p className="navigate__account_text">Аккаунт</p>
          </Link>
          <Link to="/profile">
            <button className="navigate__account_img"></button>
          </Link>
        </div>
      </nav>
      <button
        className="navigate__button-open"
        onClick={handleBurgerMenuOpenClick}
      ></button>
      <BurgerMenu
        isOpen={isBurgerMenuOpen}
        isClose={handleBurgerMenuCloseClick}
      ></BurgerMenu>
    </>
  );
}

export default MoviesHeader;
