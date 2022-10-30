import React, { useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.scss";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const t = useSelector((state) => state.i18n.selectedTranslation);
  const [isCheckout, setIsCheckout] = useState(false);
  const {
    isLoading,
    isSubmitted,
    error,
    sendRequest: sendItemRequest,
  } = useHttp();

  const submitOrderHandler = (userData) => {
    sendItemRequest(
      {
        url: "https://delivery-e2a89-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: {
          user: userData,
          orderedItems: cart.items,
          totalAmount: cart.totalAmount,
        },
      },
      (responseData) => {
        dispatch(cartActions.clearCart());
      }
    );
  };

  const totalAmount = `$${cart.totalAmount.toFixed(2)}`;
  const hasItems = cart.items.length > 0;

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
  };
  const cartRemoveAddHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const clearCartHandler = () => {
    dispatch(cartActions.clearCart());
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cart.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartRemoveAddHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      {hasItems && (
        <button onClick={clearCartHandler} className={classes["button--alt"]}>
          {t.cart_clear}
        </button>
      )}
      <div className={classes.mainButtonsWrap}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          {t.cart_close}
        </button>
        {hasItems && (
          <button onClick={orderHandler} className={classes.button}>
            {t.cart_order}
          </button>
        )}
      </div>
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>{t.cart_total}</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const isError = <p>Error: {error}</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          {t.cart_close}
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !isSubmitted && cartModalContent}
      {!error && isLoading && isSubmittingModalContent}
      {!error && !isLoading && isSubmitted && didSubmitModalContent}
      {error && isError}
    </Modal>
  );
};

export default Cart;
