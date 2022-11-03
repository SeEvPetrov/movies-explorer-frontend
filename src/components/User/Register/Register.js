import "../Auth/Auth.css";
import { useFormWithValidation } from "../../../hooks/useFormWithValidation";
import { Link } from "react-router-dom";

function Register({ onRegister, errorMessage }) {
  const checkInput = useFormWithValidation();
  const { name, email, password } = checkInput.errors;
  const { textError } = errorMessage;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = checkInput.values;
    console.log(checkInput.values);
    onRegister(name, email, password);
    checkInput.resetForm();
  };

  return (
    <section className="register">
      <div className="auth__container">
        <header className="auth__header">
          <Link to="/" className="auth__logo"></Link>
          <h2 className="auth__title">Добро пожаловать!</h2>
        </header>
        <form
          action="#"
          className="auth__form"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="auth__form_fildset">
            <label className="auth__input-container">
              <span className="auth__label">Имя</span>
              <input
                type="text"
                name="name"
                placeholder="Имя"
                className="auth__input"
                autoComplete="off"
                minLength="2"
                maxLength="30"
                pattern="[A-Za-zА-Яа-яЁё\s-]+"
                onChange={checkInput.handleChange}
                value={checkInput?.values?.name || ""}
                required
              />
              <span
                className={`error__input ${
                  !checkInput.isValid && "error__input_visible"
                }`}
              >
                {name}
              </span>
            </label>
            <label className="auth__input-container">
              <span className="auth__label">E-mail</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="auth__input"
                autoComplete="off"
                minLength="2"
                maxLength="30"
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                onChange={checkInput.handleChange}
                value={checkInput?.values?.email || ""}
                required
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
                placeholder="Пароль"
                autoComplete="off"
                className="auth__input"
                minLength="4"
                maxLength="30"
                onChange={checkInput.handleChange}
                value={checkInput?.values?.password || ""}
                required
              />
              <span
                className={`error__input ${
                  !checkInput.isValid && "error__input_visible"
                }`}
              >
                {password}
              </span>
            </label>
            <div className="auth__btn-container auth__btn-container_register">
              <span className="error__res">{textError}</span>
              <button
                type="submit"
                className="auth__submit-btn auth__submit-btn_register"
                disabled={!checkInput.isValid}
              >
                Зарегистрироваться
              </button>
            </div>
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
