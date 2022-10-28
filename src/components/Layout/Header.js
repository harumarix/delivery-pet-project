import React, { useEffect, useRef, useState } from "react";
import classes from "./Header.module.scss";
import main_image from "../../asssets/coffee.png";
import HeaderCartButton from "./HeaderCartButton";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useDispatch, useSelector } from "react-redux";
import { i18nActions } from "../../store/i18n-slice";
import { Link } from "react-router-dom";

const Header = (props) => {
  const lang = useSelector((state) => state.i18n.lang);
  const t = useSelector((state) => state.i18n.selectedTranslation);
  const dispatch = useDispatch();
  const refBurger = useRef(null);
  const [burgerClicked, setBurgerClicked] = useState(false);
  const cahngeLangHandler = (lang) => {
    const newLang = lang.target.id.replace("changeTo_", "");
    dispatch(i18nActions.setLang(newLang));
  };

  const burgerClickedHandler = () => {
    setBurgerClicked(!burgerClicked);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (burgerClicked && !refBurger.current.contains(event.target)) {
        setBurgerClicked(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refBurger, burgerClicked]);

  const languageButton = (
    <React.Fragment>
      {lang === "en" && (
        <div
          className={classes.flag}
          onClick={cahngeLangHandler}
          id="changeTo_ru"
        >
          {getUnicodeFlagIcon("RUS")}
        </div>
      )}
      {lang == "ru" && (
        <div
          className={classes.flag}
          onClick={cahngeLangHandler}
          id="changeTo_en"
        >
          {getUnicodeFlagIcon("US")}
        </div>
      )}
    </React.Fragment>
  );

  const burgerWrapperClasses = burgerClicked
    ? `${classes["wrapper-burger"]} ${classes["wrapper-burger-active"]}`
    : `${classes["wrapper-burger"]}`;

  const burgerContent = (
    <div className={classes.burgerContent} ref={refBurger}>
      <button onClick={burgerClickedHandler} className={classes.burger}>
        ≡
      </button>
      <ul className={burgerWrapperClasses}>
        <li className={classes.burgerItem}>
          <HeaderCartButton onCartClick={props.onCartBtnClick} />
        </li>
        <li className={classes.burgerItem}>
          <Link
            onClick={burgerClickedHandler}
            to="/orders"
            className={classes.history}
          >
            {t.order_history}
          </Link>
        </li>
        <li className={classes.burgerItem}>{languageButton}</li>
      </ul>
    </div>
  );

  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to="/">
          <h1 className={classes.title}>{t.main_title}</h1>
        </Link>
        {burgerContent}
        <div className={classes.wrapper}>
          <Link to="/orders" className={classes.history}>
            {t.order_history}
          </Link>
          <HeaderCartButton onCartClick={props.onCartBtnClick} />
          {languageButton}
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={main_image} alt="Main image" />
      </div>
    </React.Fragment>
  );
};

export default Header;
