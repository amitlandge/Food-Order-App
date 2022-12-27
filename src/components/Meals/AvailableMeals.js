import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

let availableMeal = [
  {
    id: "m1",
    name: "Chinease",
    description: "The best delicious Chinease ever",
    price: 250,
  },
  {
    id: "m2",
    name: "Biryani",
    description: "Hydrabadi biryani",
    price: 300,
  },
  {
    id: "m3",
    name: "Paneer Tikka",
    description: "Spicy Paneer Tikka",
    price: 150,
  },
  {
    id: "m4",
    name: "Chicken Thali",
    description: "Best Chicken Thali",
    price: 350,
  },
];

const AvailableMeals = () => {
  const mealsList = availableMeal.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
