import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Checkbox from "../Checkbox/Checkbox";
import "./SearchForm.css";

function SearchForm({
  onSubmit,
  searchKey,
  onCheckbox,
  checked,
  checkedSaveMovies,
}) {
  const location = useLocation();
  const [searchFormState, setSearchFormState] = useState({
    errorText: "",
    keyWord: "",
    isFormValid: false,
  });

  useEffect(() => {
    if (searchKey && location.pathname === "/movies") {
      setSearchFormState({ keyWord: searchKey });
    }
  }, []);

  const handleInputChange = (evt) => {
    setSearchFormState({
      ...searchFormState,
      errorText: "",
      keyWord: evt.target.value,
      isFormValid: evt.target.closest("form").checkValidity(),
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSearchFormState({
      ...searchFormState,
      isFormValid: evt.target.closest("form").checkValidity(),
    });
    if (!searchFormState.isFormValid) {
      return setSearchFormState({
        ...searchFormState,
        errorText: "Нужно ввести ключевое слово",
      });
    }
    onSubmit(searchFormState.keyWord);
  };

  return (
    <div className="search">
      <div className="search__container">
        <form action="#" className="search__form" noValidate onSubmit={handleSubmit}>
          <input
            type="text"
            className="search__input"
            alue={searchFormState.keyWord}
            onChange={handleInputChange}
            placeholder="Фильм"
            required
            minLength='1'
            maxLength='33'
          />
          <button type="submit" className="search__button">
            Поиск
          </button>
          <span className="search__error">{!searchFormState.isFormValid && searchFormState.errorText}</span>
        </form>
        <Checkbox
          onCheckbox={onCheckbox}
          checked={checked}
          checkedSaveMovies={checkedSaveMovies}
        />
      </div>
    </div>
  );
}

export default SearchForm;
