import { useSelector } from "react-redux";
import classes from "./CartItem.module.scss";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const t = useSelector((state) => state.i18n.selectedTranslation);
  const lang = useSelector((state) => state.i18n.lang);

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name[lang]}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
