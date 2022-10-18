import './AboutMe.css';
import student from '../../../images/student.jpg';

function AboutMe() {
  return (
    <section className='student' id='student'>
      <div className='student__container'>
        <h2 className='student__title'>Студент</h2>
        <div className='student__block'>
          <div className='student__info'>
            <h3 className='student__name'>Сергей</h3>
            <p className='student__specialization'>
              Фронтенд-разработчик, 30 лет
            </p>
            <p className='student__description'>
              Живу в Санкт-Петербурге.
            </p>
            <a
              className='student__github-link'
              href='https://github.com/SeEvPetrov'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </div>
          <img className='student__photo' src={student} alt='Фото студента' />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
