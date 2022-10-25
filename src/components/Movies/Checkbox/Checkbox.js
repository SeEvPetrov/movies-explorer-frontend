import { useLocation } from "react-router-dom";
import "./Checkbox.css";

function Checkbox() {
  return (
    <div className="checkbox checkbox__container">
      <input
        type="checkbox"
        className="custom-checkbox"
        id="custom-checkbox"
        name="custom-checkbox"
        defaultValue="yes"
      />

      <label htmlFor="custom-checkbox"></label>
      <p className="checkbox__title">Короткометражки</p>
    </div>
  );
}

export default Checkbox;
