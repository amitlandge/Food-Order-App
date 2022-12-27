import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const isEmpty = (value) => value.trim() === "";
const fiveChar = (value) => value.trim().length === 6;

const CheckoutForm = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const [validity, setValidity] = useState({
    name: true,
    street: true,
    code: true,
    city: true,
  });

  const onSubmitHAndler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const codeIsValid = fiveChar(enteredCode);
    const cityIsValid = !isEmpty(enteredCity);
    setValidity({
      name: nameIsValid,
      street: streetIsValid,
      code: codeIsValid,
      city: cityIsValid,
    });
    const validation =
      nameIsValid && streetIsValid && codeIsValid && cityIsValid;
    if (!validation) {
      return;
    }
    props.onsendUserData({
        name:enteredName,
        street:enteredStreet,
        code:enteredCode,
        city:enteredCity
    })
  };
  const nameClasses = `${classes.control} ${
    validity.name ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    validity.street ? "" : classes.invalid
  }`;
  const postalCodeClasses = `${classes.control} ${
    validity.code ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    validity.city ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={onSubmitHAndler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" className="name" ref={nameInputRef} />
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" className="street" ref={streetInputRef} />
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="PostalCode">Postal Code</label>
        <input type="text" className="code" ref={postalCodeInputRef} />
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" className="city" ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default CheckoutForm;
