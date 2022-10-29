import Header from "../Header/Header";
import MainMovies from "../Header/MoviesHeader/MoviesHeader";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import "./Profile.css";

function Profile() {
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
                placeholder="UserName"
                className="profile__label_input"
                minLength="3"
                maxLength="30"
                name="name"
                required={true}
              />
            </label>
            <label className="profile__label">
              <p className="profile__label-title">E-mail</p>
              <input
                type="email"
                placeholder="UserEmail"
                className="profile__label_input"
                minLength="3"
                maxLength="30"
                name="name"
                required={true}
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
