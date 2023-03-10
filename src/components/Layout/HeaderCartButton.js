import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/use-context";
const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const totalNumberItem = ctx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalNumberItem}</span>
    </button>
  );
};

export default HeaderCartButton;
 