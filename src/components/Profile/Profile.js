import Header from "../Header/Header";
import MainMovies from "../Header/MoviesHeader/MoviesHeader";
import { useState, useContext } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import "./Profile.css";

function Profile({ onSignOut, onUpdateUser, errorMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditInput, setIsEditInput] = useState(true);
  const checkInput = useFormWithValidation();
  const { nameErr, emailErr } = checkInput.errors;
  
  const errorClassName = !checkInput.isValid
    ? 'profile__error profile__error_visible'
    : 'profile__error';

  const toggleInput = (e) => {
    e.preventDefault();
    setIsEditInput((state) => !state);
  };

  let disableUserCurrentCheck =
    (currentUser.name === checkInput?.values?.name &&
      typeof checkInput?.values?.email === 'undefined') ||
    (currentUser.email === checkInput?.values?.email &&
      typeof checkInput?.values?.email === 'undefined');

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
    setTimeout(() => setIsEditInput((state) => !state), 1000);
    checkInput.resetForm();
  };

  // let classNameMessageBtn = isMessageProfile
  //   ? 'profile__button-msg'
  //   : 'profile__button-msg profile__button-msg_hidden';
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
          <h2 className="profile__title">Привет, UserName!</h2>
          <form className="profile__form">
            <label className="profile__label">
              <p className="profile__label-title">Имя</p>
              <input
                type="text"
                placeholder={currentUser.name}
                className="profile__label_input"
                minLength="2"
                maxLength="30"
                name="name"
                pattern='[A-Za-zА-Яа-яЁё\s-]+'
                onChange={checkInput.handleChange}
                value={checkInput?.values?.name ?? currentUser.name}
                {...(!isEditInput ? {} : { disabled: true })}
                required
              />
            </label>
            <label className="profile__label">
              <p className="profile__label-title">E-mail</p>
              <input
                type="email"
                placeholder={currentUser.email}
                className="profile__label_input"
                minLength="4"
                maxLength="30"
                name="name"
                pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                onChange={checkInput.handleChange}
                value={checkInput?.values?.email ?? currentUser.email}
                {...(!isEditInput ? {} : { disabled: true })}
                required
              />
            </label>
          </form>
          <div className="profile__btns">
            <button type="submit" className="profile__btn_edit">Редактировать</button>
            <button type="submit" className="profile__btn_out">Выйти из аккаунта</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
