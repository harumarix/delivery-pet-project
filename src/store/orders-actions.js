import { cartActions } from "./cart-slice";
import { ordersActions } from "./orders-slice";
import { uiActions } from "./ui-slice";

export const fetchOrderData = () => {
  return async (dispatch) => {
    dispatch(uiActions.setStatus("loading"));

    const fetchData = async () => {
      const response = await fetch(
        "https://delivery-e2a89-default-rtdb.firebaseio.com/orders.json"
      );
      if (!response.ok) {
        throw new Error("Could not get data!");
      }
      return await response.json();
    };

    try {
      const data = await fetchData();
      dispatch(uiActions.setStatus("success"));
      dispatch(ordersActions.replaceOrders(data || []));
    } catch (error) {
      dispatch(uiActions.setStatus("error"));
    }
  };
};

export const sendOrderData = (order, userData) => {
  return async (dispatch) => {
    dispatch(uiActions.setStatus("loading"));
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://delivery-e2a89-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: order.items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(uiActions.setStatus("success"));

      dispatch(cartActions.clearCart());
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent data successfully!",
        })
      );
      setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 1000);
    } catch (error) {
      dispatch(uiActions.setStatus("error"));
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending data failed!",
        })
      );
      setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 1000);
    }
  };
};
