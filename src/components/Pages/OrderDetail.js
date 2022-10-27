import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./OrderDetail.module.scss";

const OrderDetail = () => {
  const orderId = useParams().orderId;
  const ordersData = useSelector((state) => state.orders.ordersData);
  const orderDetail = ordersData[orderId];
  const lang = useSelector((state) => state.i18n.lang);

  return (
    <section className={classes.order}>
      <Card>
        <div>{orderDetail?.user.Name}</div>
        <div>{orderDetail?.user.city}</div>
        <div>{orderDetail?.user.Street}</div>
        <div>{orderDetail?.user.city}</div>
        {orderDetail?.orderedItems.map((item) => (
          <React.Fragment>
            <div>{item.name[lang]}</div>
            <div>{item.amount[lang]}</div>
            <div>{item.price}</div>
          </React.Fragment>
        ))}
      </Card>
    </section>
  );
};
export default OrderDetail;
