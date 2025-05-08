import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addTask, updateTask, Task } from "../redux/taskSlice";
import { v4 as uuidv4 } from "uuid";

interface FormComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: Task | null;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string().oneOf(["Low", "Medium", "High"]).required(),
  status: Yup.string()
    .oneOf(["To Do", "In Progress", "Done"])
    .required("Status is required"),
  dueDate: Yup.date().required("Due Date is required"),
});

const TaskForm: React.FC<FormComponentProps> = ({ open, setOpen, initialData }) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: Task = initialData || {
    id: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    dueDate: "",
  };

  const handleSubmit = (values: Task) => {
    if (initialData) {
      dispatch(updateTask(values));
    } else {
      dispatch(addTask({ ...values, id: uuidv4() }));
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { fontSize: "1.2rem" } }}
    >
      <DialogTitle sx={{ fontSize: "1.6rem" }}>
        {initialData ? "Edit Task" : "Add Task"}
      </DialogTitle>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                fontSize: "1.2rem",
              }}
            >
              <TextField
                name="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                fullWidth
                InputProps={{ sx: { fontSize: "1.1rem" } }}
                InputLabelProps={{ sx: { fontSize: "1.1rem" } }}
              />
              <TextField
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                multiline
                rows={4}
                fullWidth
                InputProps={{ sx: { fontSize: "1.1rem" } }}
                InputLabelProps={{ sx: { fontSize: "1.1rem" } }}
              />
              <TextField
                select
                name="priority"
                label="Priority"
                value={values.priority}
                onChange={handleChange}
                error={touched.priority && Boolean(errors.priority)}
                helperText={touched.priority && errors.priority}
                fullWidth
                InputProps={{ sx: { fontSize: "1.1rem" } }}
                InputLabelProps={{ sx: { fontSize: "1.1rem" } }}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </TextField>
              <TextField
                select
                name="status"
                label="Status"
                value={values.status}
                onChange={handleChange}
                error={touched.status && Boolean(errors.status)}
                helperText={touched.status && errors.status}
                fullWidth
                InputProps={{ sx: { fontSize: "1.1rem" } }}
                InputLabelProps={{ sx: { fontSize: "1.1rem" } }}
              >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </TextField>
              <TextField
                name="dueDate"
                label="Due Date"
                type="date"
                value={values.dueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true, sx: { fontSize: "1.1rem" } }}
                InputProps={{ sx: { fontSize: "1.1rem" } }}
                error={touched.dueDate && Boolean(errors.dueDate)}
                helperText={touched.dueDate && errors.dueDate}
                fullWidth
              />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setOpen(false)} sx={{ fontSize: "1rem" }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ fontSize: "1rem" }}
              >
                {initialData ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default TaskForm;
