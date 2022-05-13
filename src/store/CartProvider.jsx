import React from "react"
import { useReducer } from "react/cjs/react.development"
import CartContext from "./cart-context"
const defaultCartState = {
  item: [],
  totalAmount: 0,
}
const cartReducer = (state, action) => {
  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item })
  }
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id })
  }

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItems: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
