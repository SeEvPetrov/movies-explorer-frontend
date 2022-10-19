import { Link } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu({ isOpen, isClose }) {
  return (
    <div className={`burger-menu ${isOpen && 'open'}`}>
      <div className='burger-menu__container'>
        <button
          className='burger-menu__close-icon'
          onClick={isClose}
          type='button'
        />
        <nav className='burger-menu__link-wrapper'>
          <Link to='/' className='burger-menu__link'>
            Главная
          </Link>
          <Link to='/movies' className='burger-menu__link'>
            Фильмы
          </Link>
          <Link to='/saved-movies' className='burger-menu__link'>
            Сохраненные фильмы
          </Link>
        </nav>
        <div className="burger-menu__btn-profile">
          <Link to="/profile" className="navigate__account-link">
            <p className="navigate__account_text">Аккаунт</p>
          </Link>
          <Link to="/profile">
            <button className="navigate__account_img"></button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
