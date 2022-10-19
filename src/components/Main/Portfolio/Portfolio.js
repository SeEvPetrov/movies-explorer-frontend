import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://github.com/SeEvPetrov/how-to-learn"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__link-text">Статичный сайт</p>
              <p className="portfolio__link-arrow">↗</p>
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://seevpetrov.github.io/russian-travel/"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__link-text">Адаптивный сайт</p>
              <p className="portfolio__link-arrow">↗</p>
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://github.com/SeEvPetrov/react-mesto-api-full"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__link-text">Одностраничное приложение</p>
              <p className="portfolio__link-arrow">↗</p>
            </a>
          </li>
          {/* <li className="portfolio__item">
            <a
              className="portfolio__website"
              href="https://goldlexx.github.io/russian-travel/"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
            </a>
            <a
              className="portfolio__arrow"
              href="https://goldlexx.github.io/russian-travel/"
              target="_blank"
              rel="noreferrer"
            />
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__website"
              href="https://место.site/"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение
            </a>
            <a
              className="portfolio__arrow"
              href="https://место.site/"
              target="_blank"
              rel="noreferrer"
            />
          </li> */}
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
