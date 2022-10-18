import '../Main.css';
import './AboutProject.css';


function AboutProject() {
  return (
    <section className='info' id='about'>
        <h2 className='info__title'>О проекте</h2>
        <ul className='about__list'>
          <li className='about__item'>
            <h3 className='about__item-title'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='about__item-text'>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className='about__item'>
            <h3 className='about__item-title'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='about__item-text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className='about__graph'>
          <li className='about__graph-item'>
            <p className='about__graph-time about__graph-time_green'>
              1 неделя
            </p>
            <p className='about__graph-technology'>Back-end</p>
          </li>
          <li className='about__graph-item'>
            <p className='about__graph-time about__graph-time_black'>
              4 недели
            </p>
            <p className='about__graph-technology'>Front-end</p>
          </li>
        </ul>
    </section>
  );
}

export default AboutProject;
