import "../Auth/Auth.css";
import { useFormWithValidation } from "../../../hooks/useFormWithValidation";
import { Link } from "react-router-dom";

function Login({ onLogin, errorMessage }) {
  const checkInput = useFormWithValidation();
  const { email, password } = checkInput.errors;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = checkInput.values;
    onLogin(email, password);
    checkInput.resetForm();
  };

  return (
    <section className="login">
      <div className="auth__container">
        <header className="auth__header">
          <Link to="/" className="auth__logo"></Link>
          <h2 className="auth__title">Рады видеть!</h2>
        </header>
        <form
          action="#"
          className="auth__form"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="auth__form_fildset">
            <label className="auth__input-container">
              <span className="auth__label">E-mail</span>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="auth__input"
                autoComplete="off"
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                minLength="2"
                maxLength="30"
                onChange={checkInput.handleChange}
                value={checkInput?.values?.email || ""}
              />
              <span
                className={`error__input ${
                  !checkInput.isValid && "error__input_visible"
                }`}
              >
                {email}
              </span>
            </label>
            <label className="auth__input-container">
              <span className="auth__label">Пароль</span>
              <input
                type="password"
                name="password"
                required
                placeholder="Пароль"
                autoComplete="off"
                className="auth__input"
                minLength="4"
                maxLength="30"
                onChange={checkInput.handleChange}
                value={checkInput?.values?.password || ""}
              />
              <span
                className={`error__input ${
                  !checkInput.isValid && "error__input_visible"
                }`}
              >
                {password}
              </span>
            </label>
            <span className="error__res">{errorMessage}</span>
            <button
              type="submit"
              className="auth__submit-btn auth__submit-btn_login"
              disabled={!checkInput.isValid}
            >
              Войти
            </button>
          </fieldset>
        </form>
        <div className="auth__question">
          <p className="auth__question_text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="auth__question_link">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
