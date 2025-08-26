import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import MealCard from '../MealCard'; 

function Home() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch default recipes on mount
  useEffect(() => {
    async function fetchDefaultRecipes() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s='
        );
        const data = await response.json();
        if (!data.meals) {
          setError('No recipes found.');
        } else {
          setRecipes(data.meals);
        }
      } catch {
        setError('Failed to fetch recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchDefaultRecipes();
  }, []);

  const fetchRecipes = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecipes([]);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      if (!data.meals) {
        setError('No recipes found for this ingredient.');
      } else {
        setRecipes(data.meals);
      }
    } catch {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Recipe Finder</h1>
      <Form onSubmit={fetchRecipes}>
        <Row className="justify-content-center">
          <Col xs={10} sm={8} md={6}>
            <Form.Group controlId="ingredientInput">
              <Form.Control
                type="text"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                placeholder="e.g. chicken, egg, tomato"
                required
              />
            </Form.Group>
          </Col>
          <Col xs="auto" className="align-self-end">
            <Button type="submit" variant="primary" disabled={loading || !ingredient.trim()}>
              {loading ? <Spinner size="sm" /> : 'Search'}
            </Button>
          </Col>
        </Row>
      </Form>

      {error && (
        <Row className="justify-content-center mt-4">
          <Col xs={10} sm={8} md={6}>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      <Row className="mt-4">
        {recipes.map((meal) => (
          <Col key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MealCard meal={meal} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
