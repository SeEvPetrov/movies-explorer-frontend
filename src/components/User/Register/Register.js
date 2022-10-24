import "../Auth/Auth.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="register">
      <div className="auth__container">
        <header className="auth__header">
          <Link to="/" className="auth__logo"></Link>
          <h2 className="auth__title">Добро пожаловать</h2>
        </header>
        <form action="#" className="auth__form" noValidate>
          <fieldset className="auth__form_fildset">
            <label className="auth__input-container">
              <span className="auth__label">Имя</span>
              <input
                type="text"
                name="name"
                placeholder="Имя"
                className="auth__input"
                autoComplete="off"
              />
              <span className="error__input"></span>
            </label>
            <label className="auth__input-container">
              <span className="auth__label">E-mail</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="auth__input"
                autoComplete="off"
              />
              <span className="error__input"></span>
            </label>
            <label className="auth__input-container">
              <span className="auth__label">Пароль</span>
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                autoComplete="off"
                className="auth__input"
              />
              <span className="error__input"></span>
            </label>
            <button
              type="submit"
              className="auth__submit-btn auth__submit-btn_register"
            >
              Зарегистрироваться
            </button>
          </fieldset>
        </form>
        <div className="auth__question">
          <p className="auth__question_text">Уже зарегистрированы?</p>
          <Link to="/signin" className="auth__question_link">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
