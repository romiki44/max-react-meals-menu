import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    //async nesmie byt v ramci volania useEffect...takto ako samostatna funkcia ale moze!
    const fetchMeals = async () => {
      //setIsLoading(true);
      const response = await fetch(
        'https://max-react-http-c7bbe-default-rtdb.firebaseio.com/meals.json'
      );

      //ak chyba hodime Error...ale POZOR, try-catch nebude tu,
      //lebo toto je len definicia...ale az pri volani funkcie!!!!
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    //try-catch treba tu....lebo tu az volam funkciu!!!
    //vlastne try-catch sa neda pouzit, lebo fetchMeals() je async, cize vracia promise
    //treba preto pouzit then-catch!!!
    fetchMeals().catch((error) => {
      console.log(error);
      setIsLoading(false);
      //ale nie je to nasa message cez new Error()
      //konkretne ak sme zmenili url, napr. vyhodili json tak hodilo Failed to fetch
      //...asi je to s tou message kapanek komplikovanejsie :(
      setHttpError(error.message);
    });
    // try {
    //   fetchMeals();
    // } catch (error) {
    //   setIsLoading(false);
    //   setHttpError(error.message);
    // }
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
