import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/use-context";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import React from "react";
const Cart = (props) => {
  const context = useContext(CartContext);
  const [isCheckout, setCheckout] = useState(false);
  const [isSubmmiting, setSubmmiting] = useState(false);
  const [didSubmit, setSubmit] = useState(false);
  const totalAmount = context.totalAmount.toFixed(2);
  const cartItemRemoveHandler = (id) => {
    context.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    context.addItem({ ...item, amount: 1 });
  };
  const orderButtonHandler = () => {
    setCheckout(true);
  };
  const onsendDataUser = (userData) => {
    setSubmmiting(true);
   
    setSubmmiting(false);
    setSubmit(true);
    context.clearItem();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      <button className={classes.button} onClick={orderButtonHandler}>
        Order
      </button>
    </div>
  );
  const modalData = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm
          onsendUserData={onsendDataUser}
          onCancel={props.onClose}
        />
      )}
      {!isCheckout && modalAction}
    </React.Fragment>
  );
  const isSubmmitingDataContent = <p>Submitting Data...</p>;
  const dataSubmited = (
    <section>
      <p>Data Has Been Submitted</p>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </section>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmmiting && !didSubmit && modalData}
      {isSubmmiting && isSubmmitingDataContent}
      {!isSubmmiting && didSubmit && dataSubmited}
    </Modal>
  );
};

export default Cart;
