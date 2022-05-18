import React from "react"
import styles from "./AvailableMeal.module.css"
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem"
import { useEffect } from "react"
import { useState } from "react"

const AvailableMeal = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [hasError, setHasError] = useState(null)
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-376d5-default-rtdb.europe-west1.firebasedatabase.app/meal.json"
      )
      if (!response.ok) throw new Error("Something went wrong")
      const data = await response.json()
      const loadedMeals = []
      console.log(data)
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setIsloading(false)
      setMeals(loadedMeals)
    }

    fetchMeals().catch((error) => {
      setIsloading(false)
      setHasError(error.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={styles.mealLoading}>
        <p>loading...</p>
      </section>
    )
  }
  if (hasError) {
    return (
      <section className={styles.mealError}>
        <p>{hasError}</p>
      </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeal
