import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import classes from "./MealItem.module.scss";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const lang = useSelector((state) => state.i18n.lang);
  const dispatch = useDispatch();

  const onAddToCartHandler = (amount) => {
    dispatch(
      cartActions.addItem({
        name: props.name,
        price: props.price,
        amount: amount,
        id: props.id,
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name[lang]}</h3>
        <div className={classes.description}>{props.description[lang]}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={onAddToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
