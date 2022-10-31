import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Meals from "./components/Pages/Meals";
import Cart from "./components/Cart/Cart";
import Notification from "./components/UI/Notification";
import Orders from "./components/Pages/Orders";
import OrderDetail from "./components/Pages/OrderDetail";
import LoginPage from "./components/Pages/LoginPage";
import { cartActions } from "./store/cart-slice";

function App() {
  const dispatch = useDispatch();
  const [cartIsShown, setCartIsShown] = useState(false);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const { totalAmount } = cart;
  const status = useSelector((state) => state.cart.status);
  console.log("cart " + status);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  useEffect(() => {
    dispatch(fetchCartData());
    return () => {
      dispatch(cartActions.setStatus(null));
      console.log("unmluning fetch");
    };
  }, [dispatch]);

  useEffect(() => {
    if (cart.changed) {
      dispatch(sendCartData(cart));

      return () => {
        dispatch(cartActions.setStatus(null));
        console.log("unmounting send");
      };
    }
  }, [dispatch, totalAmount]);

  const showNotification = (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onCartBtnClick={showCartHandler} />
      <Routes>
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/"
          element={
            <main>
              <Meals />
            </main>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {showNotification}
    </React.Fragment>
  );
}
export default App;
