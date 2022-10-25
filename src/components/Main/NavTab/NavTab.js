import "./NavTab.css";

function NavTab() {
  return (
    <section className="nav">
      <nav className="nav__container">
        <ul className="nav__list">
          <li className="nav__item">
            <a href="#about" className="nav__link">
              О проекте
            </a>
          </li>
          <li className="nav__item">
            <a href="#techs" className="nav__link">
              Технологии
            </a>
          </li>
          <li className="nav__item">
            <a href="#student" className="nav__link">
              Студент
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;
