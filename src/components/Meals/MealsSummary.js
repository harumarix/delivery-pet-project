import { useSelector } from "react-redux";
import classes from "./MealsSummary.module.scss";

const MealsSummary = () => {
  const t = useSelector((state) => state.i18n.selectedTranslation);

  return (
    <section className={classes.summary}>
      <h2>{t.main_description_h2}</h2>
      <p>{t.main_description_p1}</p>
      <p>{t.main_description_p2}</p>
    </section>
  );
};

export default MealsSummary;
