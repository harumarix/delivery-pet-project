import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Layout/Header";
import Meals from "./components/Pages/Meals";
import Cart from "./components/Cart/Cart";
import Notification from "./components/UI/Notification";
import Orders from "./components/Pages/Orders";

let isInitial = true;

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [dispatch, cart]);

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
      <Switch>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/">
          <main>
            <Meals />
          </main>
        </Route>
      </Switch>

      {showNotification}
    </React.Fragment>
  );
}
export default App;
