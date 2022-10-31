import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../../store/orders-actions";
import OrderItem from "../Orders/OrderItem";
import classes from "./Orders.module.scss";
import Card from "../UI/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useSelector((state) => state.i18n.selectedTranslation);
  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";
  const ordersData = useSelector((state) => state.orders.ordersData);
  const status = useSelector((state) => state.ui.status);

  console.log(status);

  const sortOrders = (array, ascending) => {
    if (!ascending) {
      return array.reverse();
    } else {
      return array;
    }
  };

  const changeSortingHandler = () => {
    navigate("/orders?sort=" + (isSortingAscending ? "desc" : "asc"));
  };

  useEffect(() => {
    dispatch(fetchOrderData());
    return () => {
      dispatch(uiActions.setStatus(null));
    };
  }, [dispatch]);

  const loadedOrdersData = [];
  for (const key in ordersData) {
    loadedOrdersData.push({
      id: key,
      orderedItems: ordersData[key].orderedItems,
      user: ordersData[key].user,
      totalAmount: ordersData[key].totalAmount,
    });
  }
  const sortedOrders = sortOrders(loadedOrdersData, isSortingAscending);
  const ordersList = sortedOrders.map((order) => (
    <OrderItem
      orderedItems={order.orderedItems}
      key={order.id}
      id={order.id}
      userName={order.user.name}
      totalAmount={order.totalAmount}
    />
  ));

  return (
    <section className={`sectionContent ${classes.orders}`}>
      <button className={classes.sorting_button} onClick={changeSortingHandler}>
        {t.sort} {`${isSortingAscending ? t.descending : t.ascending}`}
      </button>
      <Card>
        <ul>{ordersList}</ul>
      </Card>
    </section>
  );
};
export default Orders;
