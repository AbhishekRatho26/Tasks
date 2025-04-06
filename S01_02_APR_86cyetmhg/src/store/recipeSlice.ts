import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../types/recipe';

interface RecipeState {
  recipes: Recipe[];
  favorites: string[];
  searchQuery: string;
}

// Load initial state from localStorage
const loadState = (): RecipeState => {
  try {
    const savedState = localStorage.getItem('recipeState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (err) {
    console.error('Error loading state:', err);
  }
  
  return {
    recipes: [
      {
        id: '1',
        title: 'Classic Margherita Pizza',
        description: 'Traditional Italian pizza with fresh basil and mozzarella',
        imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
        ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
        instructions: [
          'Preheat oven to 450°F',
          'Roll out the pizza dough',
          'Spread tomato sauce',
          'Add mozzarella',
          'Bake for 12-15 minutes',
          'Top with fresh basil'
        ]
      }
    ],
    favorites: [],
    searchQuery: ''
  };
};

const initialState: RecipeState = loadState();

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
      saveState(state);
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
        saveState(state);
      }
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
      state.favorites = state.favorites.filter(id => id !== action.payload);
      saveState(state);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const recipeId = action.payload;
      const index = state.favorites.indexOf(recipeId);
      if (index === -1) {
        state.favorites.push(recipeId);
      } else {
        state.favorites.splice(index, 1);
      }
      saveState(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }
  }
});

// Save state to localStorage
const saveState = (state: RecipeState) => {
  try {
    localStorage.setItem('recipeState', JSON.stringify(state));
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

export const { addRecipe, updateRecipe, deleteRecipe, toggleFavorite, setSearchQuery } = recipeSlice.actions;
export default recipeSlice.reducer;