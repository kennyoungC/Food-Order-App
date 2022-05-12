import React from "react"
import styles from "./Header.module.css"
import mealImg from "../../assets/meals.jpg"
import HeaderCartButton from "./HeaderCartButton"
const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Kenneth's Meals</h1>

        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealImg} alt="A table full of delicious food!" />
      </div>
    </>
  )
}

export default Header
