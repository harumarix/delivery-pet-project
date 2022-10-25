import { Fragment } from "react";

import MealsSummary from "../Meals/MealsSummary";
import AvailableMeals from "../Meals/AvailableMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
