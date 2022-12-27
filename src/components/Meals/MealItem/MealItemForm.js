import { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountRef = useRef();
  const inputGetDataHandler = (event) => {
    event.preventDefault();
    const refAmount = amountRef.current.value;

    const refAmountNum = +refAmount;
    if (refAmountNum < 0 && refAmount > 5) {
      return;
    }
    props.onsendData(refAmountNum);
  };
  return (
    <form className={classes.form} onSubmit={inputGetDataHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
