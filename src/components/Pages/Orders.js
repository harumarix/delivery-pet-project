import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../../store/orders-actions";
import OrderItem from "../Orders/OrderItem";
import classes from "./Orders.module.scss";
import Card from "../UI/Card";
import { useHistory, useLocation } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";
  const ordersData = useSelector((state) => state.orders.ordersData);

  const sortOrders = (array, ascending) => {
    if (!ascending) {
      return array.reverse();
    } else {
      return array;
    }
  };

  const changeSortingHandler = () => {
    history.push("/orders?sort=" + (isSortingAscending ? "desc" : "asc"));
  };

  useEffect(() => {
    dispatch(fetchOrderData());
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
    <section className={classes.orders}>
      <Card>
        <h1>Order history</h1>
        <div className={classes.sorting}>
          <button onClick={changeSortingHandler}>
            Sort {`${isSortingAscending ? "Descending" : "Ascending"}`}
          </button>
        </div>
        <ul>{ordersList}</ul>
      </Card>
    </section>
  );
};
export default Orders;
