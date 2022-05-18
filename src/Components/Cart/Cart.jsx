import React from "react"
import { useContext } from "react"
import { useState } from "react"
import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal"
import styles from "./Cart.module.css"
import CartItem from "./CartItem.jsx"
import Checkout from "./Checkout"
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          price={item.price}
          key={item.id}
          name={item.name}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )
  const chekoutHandler = () => {
    setIsCheckout(true)
  }
  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={chekoutHandler}>
          Order
        </button>
      )}
    </div>
  )
  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onHideCart} />}
      {!isCheckout && modalActions}
    </Modal>
  )
}

export default Cart
