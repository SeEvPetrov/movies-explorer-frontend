import "../Info/info.css";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="info about" id="about">
      <div className="info__container">
        <h2 className="info__title">О проекте</h2>
        <ul className="about__list">
          <li className="about__item">
            <h3 className="about__item-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about__item-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about__item">
            <h3 className="about__item-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about__item-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className="about__duration">
          <li className="about__duration-item">
            <p className="about__duration-time about__duration-time_green">
              1 неделя
            </p>
            <p className="about__duration-techs">Back-end</p>
          </li>
          <li className="about__duration-item">
            <p className="about__duration-time about__duration-time_black">
              4 недели
            </p>
            <p className="about__duration-techs">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
