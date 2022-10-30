import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./OrderItem.module.scss";

const OrderItem = (props) => {
  const lang = useSelector((state) => state.i18n.lang);
  const orders = [];
  const t = useSelector((state) => state.i18n.selectedTranslation);
  const { orderedItems } = props;
  for (const key in orderedItems) {
    orders.push({
      id: orderedItems[key].id,
      key: orderedItems[key].id,
      name: orderedItems[key].name,
      amount: orderedItems[key].amount,
      price: orderedItems[key].price,
    });
  }

  return (
    <li className={classes.order}>
      <h3>{props.userName}</h3>
      <table className={classes.orderItemTable}>
        <thead>
          <tr>
            <th>Meal</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.name[lang]}</td>
              <td>{order.price}$</td>
              <td>{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes.orderItemTotal}>
        {t.total_amount}: {props.totalAmount}$
      </div>
      <Link className={classes.orderDetailBtn} to={`/orders/${props.id}`}>
        {t.details_button}
      </Link>
    </li>
  );
};

export default OrderItem;
