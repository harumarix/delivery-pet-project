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
      <div className={classes.itemWrapper}>
        <div>
          <h3>{props.userName}</h3>
        </div>
        {orders.map((order) => (
          <div className={classes.orderInfo} key={order.id}>
            <div>
              {order.name[lang]} {order.price}$ x{order.amount}
            </div>
          </div>
        ))}
        <div>{t.total_amount} {props.totalAmount}$</div>
      </div>

      <Link className={classes.orderDetailLink} to={`/orders/${props.id}`}>
        Details
      </Link>
    </li>
  );
};

export default OrderItem;
