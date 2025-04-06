
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus, X } from "lucide-react";
import { RootState } from "../store/store";
import { addRecipe, updateRecipe } from "../store/recipeSlice";
import { Recipe } from "../types/recipe";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { styled } from "styled-components";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormContainer = styled(Paper)`
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const InputGroup = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  imageUrl: Yup.string().url("Enter a valid URL").required("Image URL is required"),
  ingredients: Yup.array().of(Yup.string().required("Ingredient cannot be empty")),
  instructions: Yup.array().of(Yup.string().required("Instruction cannot be empty")),
});

function RecipeForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const existingRecipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((r) => r.id === id)
  );

  const initialValues: Omit<Recipe, "id"> = existingRecipe || {
    title: "",
    description: "",
    imageUrl: "",
    ingredients: [""],
    instructions: [""],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (id) {
          dispatch(updateRecipe({ ...values, id }));
        } else {
          dispatch(addRecipe({ ...values, id: Date.now().toString() }));
        }
        navigate("/");
      }}
    >
      {({ values }) => (
        <FormContainer elevation={3}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {id ? "Edit Recipe" : "Add New Recipe"}
          </Typography>

          <Form>
            <Field as={TextField} fullWidth label="Title" name="title" margin="normal" />
            <ErrorMessage name="title" component="div" className="error-message" />

            <Field as={TextField} fullWidth label="Description" name="description" margin="normal" multiline rows={3} />
            <ErrorMessage name="description" component="div" className="error-message" />

            <Field as={TextField} fullWidth label="Image URL" name="imageUrl" margin="normal" />
            <ErrorMessage name="imageUrl" component="div" className="error-message" />

            <Typography variant="h6">Ingredients</Typography>
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <>
                  {values.ingredients.map((_, index) => (
                    <InputGroup key={index}>
                      <Field as={TextField} fullWidth name={`ingredients.${index}`} />
                      {values.ingredients.length > 1 && (
                        <IconButton onClick={() => remove(index)}>
                          <X size={20} />
                        </IconButton>
                      )}
                    </InputGroup>
                  ))}
                  <Button onClick={() => push("")}> <Plus size={20} /> Add Ingredient </Button>
                </>
              )}
            </FieldArray>
            <ErrorMessage name="ingredients" component="div" className="error-message" />

            <Typography variant="h6">Instructions</Typography>
            <FieldArray name="instructions">
              {({ push, remove }) => (
                <>
                  {values.instructions.map((_, index) => (
                    <InputGroup key={index}>
                      <Field as={TextField} fullWidth name={`instructions.${index}`} />
                      {values.instructions.length > 1 && (
                        <IconButton onClick={() => remove(index)}>
                          <X size={20} />
                        </IconButton>
                      )}
                    </InputGroup>
                  ))}
                  <Button onClick={() => push("")}> <Plus size={20} /> Add Instruction </Button>
                </>
              )}
            </FieldArray>
            <ErrorMessage name="instructions" component="div" className="error-message" />

            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="outlined" onClick={() => navigate("/")}>Cancel</Button>
              <Button variant="contained" type="submit" color="primary">
                {id ? "Update Recipe" : "Add Recipe"}
              </Button>
            </Box>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
}

export default RecipeForm;
