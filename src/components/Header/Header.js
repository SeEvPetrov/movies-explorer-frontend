import './Header.css';
import { Link } from 'react-router-dom';

function Header({ children, color, location }) {
  return (
    <header className={`header ${color}`}>
      <div className={`header__container ${location}`}>
        <Link to='/' className='header__logo'></Link>
        {children}
      </div>
    </header>
  );
}

export default Header;
