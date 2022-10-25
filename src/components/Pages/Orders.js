import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../../store/orders-actions";
import OrderItem from "../Orders/OrderItem";
import classes from "./Orders.module.scss";
import Card from "../UI/Card";

const Orders = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector((state) => state.orders.ordersData);

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

  const ordersList = loadedOrdersData.map((order) => (
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
        <ul>{ordersList}</ul>
      </Card>
    </section>
  );
};
export default Orders;
