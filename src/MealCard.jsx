import React from 'react';
import { Card, Button } from 'react-bootstrap';

function MealCard({ meal }) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={meal.strMealThumb}
        alt={meal.strMeal}
      />
      <Card.Body>
        <Card.Title>{meal.strMeal}</Card.Title>
        <Button
          variant="outline-success"
          href={`https://www.themealdb.com/meal/${meal.idMeal}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MealCard;
