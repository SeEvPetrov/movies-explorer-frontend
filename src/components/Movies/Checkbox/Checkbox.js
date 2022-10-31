import { useLocation } from "react-router-dom";
import "./Checkbox.css";

function Checkbox({ onCheckbox, checked, checkedSaveMovies }) {
  const location = useLocation();
  const handleCheckbox = (evt) => {
    onCheckbox(evt.target.checked);
  };

  return (
    <div className="checkbox checkbox__container">
      <input
        type="checkbox"
        className="custom-checkbox"
        id="custom-checkbox"
        name="custom-checkbox"
        defaultValue="yes"
        checked={checked}
        onChange={handleCheckbox}
      />

      <label htmlFor="custom-checkbox"></label>
      <p className="checkbox__title">Короткометражки</p>
    </div>
  );
}

export default Checkbox;
