import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";
import { RootState } from "../store/store";
import { deleteRecipe } from "../store/recipeSlice";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import { styled } from "styled-components";

const RecipeContainer = styled(Box)`
  max-width: 64rem;
  margin: auto;
`;

const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled(Box)`
  display: flex;
  gap: 1rem;
`;

const DetailImage = styled(CardMedia)`
  width: 100%;
  height: 24rem;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
`;

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((r) => r.id === id)
  );

  if (!recipe) {
    return <Typography variant="h6">Recipe not found</Typography>;
  }

  const handleDelete = () => {
    dispatch(deleteRecipe(id!));
    navigate("/");
  };

  return (
    <RecipeContainer>
      <HeaderContainer>
        <Typography variant="h4" fontWeight="bold">
          {recipe.title}
        </Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Pencil size={20} />}
            onClick={() => navigate(`/edit-recipe/${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Trash2 size={20} />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ButtonGroup>
      </HeaderContainer>

      <DetailImage component="img" image={recipe.imageUrl} alt={recipe.title} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Ingredients
              </Typography>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Instructions
              </Typography>
              <ol>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </RecipeContainer>
  );
}

export default RecipeDetails;
