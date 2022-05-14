import React from "react"
import styles from "./HeaderCartButton.module.css"
import CartIcon from "../Cart/CartIcon"
import { useContext, useEffect, useState } from "react"
import CartContext from "../../store/cart-context"
const HeaderCartButton = (props) => {
  const [btnIsHighligted, setBtnIsHighligted] = useState(false)
  const cartCtx = useContext(CartContext)
  const numberOfCartItems = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.amount
  }, 0)
  const btnClasses = `${styles.button} ${btnIsHighligted ? styles.bump : ""}`
  const { items } = cartCtx
  useEffect(() => {
    if (items.length === 0) return
    setBtnIsHighligted(true)

    const timer = setTimeout(() => {
      setBtnIsHighligted(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
