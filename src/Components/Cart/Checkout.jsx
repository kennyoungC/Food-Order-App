import { useRef } from "react"
import { useState } from "react"
import styles from "./Checkout.module.css"

const isEmpty = (value) => value.trim() === ""
const isFiveChars = (value) => value.trim().length === 5
const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  })

  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()

  const confirmHandler = (e) => {
    e.preventDefault()
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredcity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredCityIsValid = !isEmpty(enteredcity)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)

    setFormInputsValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
    })

    const formIsValid =
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredPostalCodeIsValid &&
      enteredStreetIsValid

    if (!formIsValid) {
      return
    }
    const data = {
      name: enteredName,
      street: enteredStreet,
      city: enteredcity,
      postalCode: enteredPostalCode,
    }
    //Submit Cart Data
    props.onConfirm(data)
  }
  const nameInputstyling = formInputsValidity.name
    ? styles.control
    : `${styles.control} ${styles.invalid}`
  const cityInputstyling = formInputsValidity.city
    ? styles.control
    : `${styles.control} ${styles.invalid}`
  const streetInputstyling = formInputsValidity.street
    ? styles.control
    : `${styles.control} ${styles.invalid}`
  const postalCodeInputstyling = formInputsValidity.postalCode
    ? styles.control
    : `${styles.control} ${styles.invalid}`
  return (
    <form onSubmit={confirmHandler} className={styles.form}>
      <div className={nameInputstyling}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetInputstyling}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeInputstyling}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code</p>
        )}
      </div>
      <div className={cityInputstyling}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  )
}
export default Checkout
