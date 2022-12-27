import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import { useContext } from "react";
import CartContext from "../../../store/use-context";
const MealItem = (props) => {
  const context = useContext(CartContext);
  const price = `Rs ${props.price.toFixed(2)}`;
  const dataHandler = (amount) => {

    context.addItem({
      id: props.id,
      amount: amount,
      name: props.name,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onsendData={dataHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
