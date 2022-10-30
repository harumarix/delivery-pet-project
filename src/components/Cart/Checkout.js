import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Checkout.module.scss";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const t = useSelector((state) => state.i18n.selectedTranslation);
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRed = useRef();
  const streetInputRed = useRef();
  const postalInputRed = useRef();
  const cityInputRed = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRed.current.value;
    const enteredStreet = streetInputRed.current.value;
    const enteredPostal = postalInputRed.current.value;
    const enteredCity = cityInputRed.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isSixChars(enteredPostal);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
  };

  const nameControlClasses = `${classes.control} ${
    !formInputsValidity.name ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    !formInputsValidity.street ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    !formInputsValidity.city ? classes.invalid : ""
  }`;
  const postalControlClasses = `${classes.control} ${
    !formInputsValidity.postal ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">{t.form_name}</label>
        <input type="text" id="name" ref={nameInputRed} />
        {!formInputsValidity.name && <p>{t.form_name_validation}</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">{t.form_street}</label>
        <input type="text" id="street" ref={streetInputRed} />
        {!formInputsValidity.street && <p>{t.form_street_validation}</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">{t.form_postal}</label>
        <input type="text" id="postal" ref={postalInputRed} />
        {!formInputsValidity.postal && <p>{t.form_postal_validation}</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">{t.form_city}</label>
        <input type="text" id="city" ref={cityInputRed} />
        {!formInputsValidity.city && <p>{t.form_city_validation}</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          {t.form_cancel}
        </button>
        <button className={classes.submit}>{t.form_confirm}</button>
      </div>
    </form>
  );
};
export default Checkout;
