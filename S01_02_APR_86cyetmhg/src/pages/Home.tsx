import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, Search } from "lucide-react";
import { RootState } from "../store/store";
import { toggleFavorite, setSearchQuery } from "../store/recipeSlice";
import { Box, TextField, Typography, IconButton, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { styled } from "styled-components";

const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  max-width: 500px;
  width: 100%;
`;

const RecipeCard = styled(Card)`
  position: relative;
  width: 320px; 
  height: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`;



function Home() {
  const dispatch = useDispatch();
  const { recipes, favorites, searchQuery } = useSelector((state: RootState) => state.recipes);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFavoriteClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    dispatch(toggleFavorite(id));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <SearchContainer>
        <Search size={20} />
        <TextField
          fullWidth
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          variant="outlined"
        />
      </SearchContainer>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Recipes
      </Typography>

      <Grid container spacing={3} justifyContent="center" maxWidth="1200px">
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <RecipeCard>
                <CardMedia component="img" height="180" image={recipe.imageUrl} alt={recipe.title} />
                
              
                
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "20px",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                  onClick={(e) => handleFavoriteClick(e, recipe.id)}
                >
                    <Heart
                      size={20}
                      fill={favorites.includes(recipe.id) ? "#dc2626" : "none"}
                    />
                </Box>

                <CardContent>
                  <Typography variant="h6" fontWeight="bold" textAlign="center">
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    {recipe.description}
                  </Typography>
                </CardContent>
              </RecipeCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
