import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

import classes from "./LoginPage.module.scss";

const LoginPage = () => {
  const t = useSelector((state) => state.i18n.selectedTranslation);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const APIkey = "AIzaSyCl-QTc4SoudPkwCMTkO-A4SUnh50Z7TwY";
  const signUpUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  const signInUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const url = isLogin ? signInUrl : signUpUrl;

    setIsLoading(true);
    fetch(url + APIkey, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setIsLoading(false);
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
        dispatch(authActions.login(data.idToken));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <section className={`sectionContent ${classes.login}`}>
      <div className={classes.auth}>
        <h1>{isLogin ? t.login : t.sign_up}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">{t.your_email}</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">{t.your_pass}</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>{isLogin ? t.login : t.create_acc}</button>}
            {isLoading && (
              <p className={classes.loadingParagraph}>{t.loading}</p>
            )}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? t.create_new_acc : t.login_existing_acc}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default LoginPage;
