import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(cartActions.setStatus("loading"));

    const fetchData = async () => {
      const response = await fetch(
        "https://delivery-e2a89-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not get cart data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.setStatus("success"));

      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalAmount: cartData.totalAmount,
        })
      );
    } catch (error) {
      dispatch(cartActions.setStatus("error"));

      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Getting cart data failed!",
        })
      );
      setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 1000);
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(cartActions.setStatus("loading"));
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://delivery-e2a89-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalAmount: cart.totalAmount,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Adding to cart failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(cartActions.setStatus("success"));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Added to cart successfully!",
        })
      );
      setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 1000);
    } catch (error) {
      dispatch(cartActions.setStatus("error"));

      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Adding to cart failed!",
        })
      );
      setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 1000);
    }
  };
};
