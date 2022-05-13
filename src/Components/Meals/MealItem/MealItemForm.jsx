import React from "react"
import { useState } from "react"
import Input from "../../UI/Input"
import styles from "./MealItemForm.module.css"
const MealItemForm = (props) => {
  const [inputValue, setInputValue] = useState(1)
  const [amountIsValid, setAmountIsValid] = useState(false)
  const submitHandler = (e) => {
    e.preventDefault()
    const enteredAmount = +inputValue
    console.log(enteredAmount)
    if (enteredAmount === 0 || enteredAmount < 1 || enteredAmount > 5) {
      console.log(`error`)
      setAmountIsValid(true)
      return
    }
    props.onAddToCart(enteredAmount)
  }
  const setInputValueHandler = (val) => {
    setInputValue(val)
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        onClick={setInputValueHandler}
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          value: inputValue,
        }}
      />
      <button>+ Add Meal</button>
      {amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  )
}
export default MealItemForm
