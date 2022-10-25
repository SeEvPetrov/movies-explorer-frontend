import { Link } from "react-router-dom";
import "./MainHeader.css";

function MainHeader() {
  return (
    <nav className="auth-links">
      <ul className="auth-links__list">
        <li className="auth-links__item">
          <Link to="/signup" className="auth-links__registration">
            Регистрация
          </Link>
        </li>
        <li className="auth-links__item">
          <Link to="/signin" className="auth-links__login">
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainHeader;
