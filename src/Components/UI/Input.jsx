import React from "react"
import styles from "./Input.module.css"
const Input = (props) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        {...props.input}
        value={props.input.value}
        onChange={(e) => props.onClick(e.target.value)}
      />
    </div>
  )
}

export default Input
