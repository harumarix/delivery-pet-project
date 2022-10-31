import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./BackButton.module.scss";
const BackButton = () => {
  const t = useSelector((state) => state.i18n.selectedTranslation);
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };
  return (
    <button onClick={goBackHandler} className={classes.backButton}>
      {t.back_button}
    </button>
  );
};

export default BackButton;
