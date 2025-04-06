import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';

function Favorites() {
  const { recipes, favorites } = useSelector((state: RootState) => state.recipes);
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div>
      <h1 className="page-title">Favorite Recipes</h1>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet. Start adding some!</p>
      ) : (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="recipe-card"
            >
              <div className="recipe-image-container">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="recipe-image"
                />
              </div>
              <div className="recipe-content">
                <h2 className="recipe-title">{recipe.title}</h2>
                <p className="recipe-description">{recipe.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;