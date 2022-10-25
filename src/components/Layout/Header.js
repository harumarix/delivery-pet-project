import React, { Fragment } from "react";
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

  const cahngeLangHandler = (lang) => {
    const newLang = lang.target.id.replace("changeTo_", "");
    dispatch(i18nActions.setLang(newLang));
  };

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

  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to="/">
          <h1 className={classes.title}>{t.main_title}</h1>
        </Link>
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
