import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./OrderDetail.module.scss";

const OrderDetail = (props) => {
  const orderId = useParams().orderId;
  const ordersData = useSelector((state) => state.orders.ordersData);
  const orderDetail = ordersData[orderId];
  console.log(orderDetail);

  return (
    <section className={classes.order}>
      <Card>
        <div>{orderDetail?.user.city}</div>
      </Card>
    </section>
  );
};
export default OrderDetail;
