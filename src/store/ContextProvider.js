import { useReducer } from "react";
import CartContext from "./use-context";

let intialState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    console.log(state.items);
    console.log(updateTotalAmount);
    let exitingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    let existingCartItem = state.items[exitingCartItemIndex];
    console.log(existingCartItem);
    let updateItems;
    if (existingCartItem) {
      let updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      console.log(updateItem);
      updateItems = [...state.items];
      console.log(updateItems);
      const itemfg = (updateItems[exitingCartItemIndex] = updateItem);
      console.log(itemfg);
    } else {
      updateItems = state.items.concat(action.item);
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    let exitingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    let existingCartItem = state.items[exitingCartItemIndex];
    let updateTotalAmount = state.totalAmount - existingCartItem.price;
    let updateItems;
    if (existingCartItem.amount === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updateItems = [...state.items];
      updateItems[exitingCartItemIndex] = updateItem;
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return intialState;
  }
  return intialState;
};

const ContextProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, intialState);
  const addItem = (item) => {
    dispatch({ type: "ADD", item: item });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };
  const clearItem = () => {
    dispatch({ type: "CLEAR" });
  };
  let context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItem,
    clearItem: clearItem,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};
export default ContextProvider;
