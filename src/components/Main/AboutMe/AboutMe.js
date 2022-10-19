import "./AboutMe.css";
import student from "../../../images/student.jpg";

function AboutMe() {
  return (
    <section className="info" id="student">
      <div className="info__container">
        <h2 className="info__title">Студент</h2>
        <div className="student__block">
          <div className="student__info">
            <h3 className="student__name">Сергей</h3>
            <p className="student__specialization">
              Фронтенд-разработчик, 30 лет
            </p>
            <p className="student__description">
              Я родился в городе Орске, а проживаю в Санкт-Петербурге. Закончил
              факультет ракетостроения БГТУ "ВОЕНМЕХ". У меня есть жена и сын.
              Люблю заниматься стройкой и проектированием. Начал обучение год
              назад с курсов на Udemy, YouTube и оффициальной документации. с
              2017 года проектирую автоматизированные системы управления для
              АЭС. В свободное время разваваюсь в сфере веб-разработки.
            </p>
            <a
              className="student__github-link"
              href="https://github.com/SeEvPetrov"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <img className="student__photo" src={student} alt="Фото студента" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
