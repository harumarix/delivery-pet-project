import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../UI/BackButton";
import Card from "../UI/Card";
import classes from "./OrderDetail.module.scss";

const OrderDetail = () => {
  const orderId = useParams().orderId;
  const ordersData = useSelector((state) => state.orders.ordersData);
  const orderDetail = ordersData[orderId];
  const lang = useSelector((state) => state.i18n.lang);
  const t = useSelector((state) => state.i18n.selectedTranslation);
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/orders");
  };

  return (
    <section className={`sectionContent ${classes.orderDetails}`}>
      {/* <button onClick={goBackHandler} className={classes.backButton}>
        {t.back_button}
      </button> */}
      <BackButton />
      <Card>
        <div className={classes.orderDetailWrap}>
          <h3>User info</h3>
          <div>{orderDetail?.user.name}</div>
          <div>{orderDetail?.user.city}</div>
          <div>{orderDetail?.user.street}</div>

          <table className={classes.orderDetailTable}>
            <thead>
              <tr>
                <th>Meal</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail?.orderedItems.map((order) => (
                <tr key={order.id}>
                  <td>{order.name[lang]}</td>
                  <td>{order.price}$</td>
                  <td>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
};
export default OrderDetail;
