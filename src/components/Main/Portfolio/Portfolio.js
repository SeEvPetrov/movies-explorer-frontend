import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__item'>
            <a
              className='portfolio__website'
              href='https://goldlexx.github.io/how-to-learn/'
              target='_blank'
              rel='noreferrer'
            >
              Статичный сайт
            </a>
            <a
              className='portfolio__arrow'
              href='https://goldlexx.github.io/how-to-learn/'
              target='_blank'
              rel='noreferrer'
            />
          </li>
          <li className='portfolio__item'>
            <a
              className='portfolio__website'
              href='https://goldlexx.github.io/russian-travel/'
              target='_blank'
              rel='noreferrer'
            >
              Адаптивный сайт
            </a>
            <a
              className='portfolio__arrow'
              href='https://goldlexx.github.io/russian-travel/'
              target='_blank'
              rel='noreferrer'
            />
          </li>
          <li className='portfolio__item'>
            <a
              className='portfolio__website'
              href='https://место.site/'
              target='_blank'
              rel='noreferrer'
            >
              Одностраничное приложение
            </a>
            <a
              className='portfolio__arrow'
              href='https://место.site/'
              target='_blank'
              rel='noreferrer'
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
