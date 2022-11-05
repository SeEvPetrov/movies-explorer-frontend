import { useEffect } from "react";
import Header from "../Header/Header";
import MainMovies from "../Header/MoviesHeader/MoviesHeader";
import { useState, useContext } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./Profile.css";
import "../User/Auth/Auth.css";

function Profile({ onSignOut, onUpdateUser, errorMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const [isUnlockedInput, setIsUnlockedInput] = useState(true);
  const [disableSavedBtn, setDisableSavedBtn] = useState(true);
  const checkInput = useFormWithValidation();
  const { name, email } = checkInput.errors;
  const { textError, isError } = errorMessage;

  const switchStateInput = (e) => {
    e.preventDefault();
    setIsUnlockedInput((state) => !state);
  };

useEffect(() => {
  if (currentUser.name === checkInput?.values?.name ||
    currentUser.email === checkInput?.values?.email ) {
      setDisableSavedBtn(true);
    } else {
      setDisableSavedBtn(false);
    }
   }, [checkInput?.values?.name, checkInput?.values?.email, currentUser]);  

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = checkInput.values;
    if (!name) {
      onUpdateUser(currentUser.name, email);
    } else if (!email) {
      onUpdateUser(name, currentUser.email);
    } else {
      onUpdateUser(name, email);
    }
    setTimeout(() => setIsUnlockedInput((state) => !state), 1000);
    checkInput.resetForm();
  };

  return (
    <>
      <Header
        color={"header__theme_black"}
        location={"header__container_movies"}
      >
        <MainMovies />
      </Header>
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__label">
              <p className="profile__label-title">Имя</p>
              <input
                type="text"
                placeholder={currentUser.name}
                className="profile__label_input"
                minLength="2"
                maxLength="30"
                name="name"
                pattern="[A-Za-zА-Яа-яЁё\s-]+"
                onChange={checkInput.handleChange}
                value={checkInput?.values?.name ?? ''}
                {...(!isUnlockedInput ? {} : { disabled: true })}
                required
              />
              <span
                className={`profile__error__input ${
                  !checkInput.isValid && "profile__error__input_visible"
                }`}
              >
                {name}
              </span>
            </label>
            <label className="profile__label">
              <p className="profile__label-title">E-mail</p>
              <input
                type="email"
                placeholder={currentUser.email}
                className="profile__label_input"
                minLength="4"
                maxLength="30"
                name="email"
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                onChange={checkInput.handleChange}
                value={checkInput?.values?.email ?? ''}
                {...(!isUnlockedInput ? {} : { disabled: true })}
                required
              />
              <span
                className={`profile__error__input ${
                  !checkInput.isValid && "profile__error__input_visible"
                }`}
              >
                {email}
              </span>
            </label>
            {!isUnlockedInput && (
              <div className="save__container">
                <span
                  className={`profile__res ${
                    !isError && "profile__res_success"
                  }`}
                >
                  {textError}
                </span>
                <button
                  className="profile__btn_save"
                  disabled={disableSavedBtn || !checkInput.isValid}
                >
                  Сохранить
                </button>
              </div>
            )}
          </form>

          {isUnlockedInput && (
            <div className="profile__btns">
              <button
                type="submit"
                className="profile__btn_edit"
                onClick={switchStateInput}
              >
                Редактировать
              </button>
              <button
                type="submit"
                className="profile__btn_out"
                onClick={onSignOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Profile;
