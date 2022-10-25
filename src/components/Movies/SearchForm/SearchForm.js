import Checkbox from "../Checkbox/Checkbox";
import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="search">
      <div className="search__container">
        <form action="#" className="search__form">
          <input
            type="text"
            className="search__input"
            placeholder="Фильм"
            required
          />
          <button type="submit" className="search__button">
            Поиск
          </button>
          <span className="search__error"></span>
        </form>
        <Checkbox />
      </div>
    </div>
  );
}

export default SearchForm;
