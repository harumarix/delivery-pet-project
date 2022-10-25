import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.scss";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, isSubmitted, error, sendRequest } = useHttp();

  const showMealsHandler = (responseData) => {
    const loadedMeals = [];
    for (const key in responseData) {
      loadedMeals.push({
        id: key,
        key: key,
        name: responseData[key].name,
        price: responseData[key].price,
        description: responseData[key].description,
      });
    }
    setMeals(loadedMeals);
  };

  useEffect(() => {
    sendRequest(
      { url: "https://delivery-e2a89-default-rtdb.firebaseio.com/meals.json" },
      showMealsHandler
    );
  }, []);

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
