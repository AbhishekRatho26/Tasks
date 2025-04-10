import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import AddCategory from "./AddCategory";

interface Category {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  createdAt: string;
  count: number;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategory, setEditCategory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [addCategory, setAddCategory] = useState<boolean>(false);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/categories/count/category"
      );
      const fetchedCategories: Category[] = response?.data?.data || [];
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;

    try {
      await axios.put(
        `http://localhost:5000/api/categories/${selectedCategory.categoryId}`,
        {
          name: selectedCategory.categoryName,
          description: selectedCategory.categoryDescription,
        }
      );
      fetchCategory();
      setEditCategory(false);
      setSnackbarMessage("Category updated successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/categories/${selectedCategory.categoryId}`
      );
      fetchCategory();
      setEditCategory(false);
      setSnackbarMessage("Category deleted successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginBottom: "20px" }}
        onClick={() => setAddCategory(true)}
      >
        Add Category
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Post Count</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.categoryId}
                onClick={() => {
                  setSelectedCategory(category);
                  setEditCategory(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{category.categoryId}</TableCell>
                <TableCell>{category.categoryName}</TableCell>
                <TableCell>{category.categoryDescription || "-"}</TableCell>
                <TableCell>{category.count}</TableCell>
                <TableCell>
                  {new Date(category.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={editCategory}
        onClose={() => setEditCategory(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Category Details</DialogTitle>
        <DialogContent>
          {selectedCategory && (
            <>
              <TextField
                fullWidth
                margin="dense"
                label="Category ID"
                value={selectedCategory.categoryId}
                disabled
              />
              <TextField
                fullWidth
                margin="dense"
                label="Category Name"
                value={selectedCategory.categoryName}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    categoryName: e.target.value,
                  })
                }
                disabled={selectedCategory.count > 0}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Description"
                value={selectedCategory.categoryDescription}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    categoryDescription: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                margin="dense"
                label="Post Count"
                value={selectedCategory.count}
                disabled
              />
              <TextField
                fullWidth
                margin="dense"
                label="Created At"
                value={new Date(selectedCategory.createdAt).toLocaleString()}
                disabled
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditCategory(false)} color="secondary">
            Cancel
          </Button>
          {selectedCategory?.count === 0 ? (
            <>
              <Button
                onClick={handleUpdateCategory}
                color="primary"
                variant="contained"
              >
                Save Changes
              </Button>
              <Button
                onClick={handleDeleteCategory}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </>
          ) : (
            <Button
              onClick={handleUpdateCategory}
              color="primary"
              variant="contained"
            >
              Save Changes
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <AddCategory addCategory={addCategory} setAddCategory={setAddCategory} />

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Category;
