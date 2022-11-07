import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./Profile.module.scss";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newPassInputRef = useRef();
  const t = useSelector((state) => state.i18n.selectedTranslation);
  const token = useSelector((state) => state.auth.token);
  const [status, setStatus] = useState({ status: null, errorMessage: "" });

  const changePassUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=";
  const APIkey = "AIzaSyCl-QTc4SoudPkwCMTkO-A4SUnh50Z7TwY";

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/login", { replace: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPass = newPassInputRef.current.value;

    fetch(changePassUrl + APIkey, {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        password: enteredNewPass,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        setStatus({ status: "success" });
      })
      .catch((error) => {
        console.log(error.message);
        setStatus({ status: "error", errorMessage: error.message });
      });
  };

  if (status.status === "success") {
    return (
      <section className={`sectionContent ${classes.profile}`}>
        <form onSubmit={submitHandler} className={classes.form}>
          <p className={classes.statusMessageSuccess}>Successfully changed!</p>
        </form>
      </section>
    );
  }

  if (status.status === "error") {
    return (
      <section className={`sectionContent ${classes.profile}`}>
        <form onSubmit={submitHandler} className={classes.form}>
          <p className={classes.statusMessageError}>
            Error: {status.errorMessage}
          </p>
        </form>
      </section>
    );
  }

  return (
    <section className={`sectionContent ${classes.profile}`}>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="new-password">{t.new_password}</label>
          <input
            ref={newPassInputRef}
            minLength="7"
            type="password"
            id="new-password"
          />
        </div>
        <div className={classes.action}>
          <button>{t.change_password}</button>
        </div>
      </form>
      <div className={classes.action}>
        <button onClick={logoutHandler}>{t.logout}</button>
      </div>
    </section>
  );
};

export default Profile;
