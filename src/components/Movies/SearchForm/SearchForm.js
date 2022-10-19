import Checkbox from '../Checkbox/Checkbox';
import './SearchForm.css';

function SearchForm() {
    return (
        <section className='search'>
      <div className='search__container'>
        <form
          action='#'
          className='search__form'
        >
          <input
            type='text'
            className='search__input'
            placeholder='Фильм'
          />
          <button type='submit' className='search__button'>Найти</button>
          <span className='search__error'></span>
        </form>
        <Checkbox />
      </div>
    </section>
    );
}

export default SearchForm;