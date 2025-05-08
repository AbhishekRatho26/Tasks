
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateContact } from "../redux/contactSlice";
import { RootState } from "../redux/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  address?: string;
  notes?: string;
  company?: string;
  photo?: string;
}

const EditContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contactId = localStorage.getItem("id");
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const contact = contacts.find((c) => c.id === contactId);

  const initialValues: FormValues = {
    name: contact?.name || "",
    phone: contact?.phone || "",
    email: contact?.email || "",
    address: contact?.address || "",
    notes: contact?.notes || "",
    company: contact?.company || "",
    photo: contact?.photo || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string(),
    notes: Yup.string(),
    company: Yup.string(),
    photo: Yup.string(),
  });

  const handleSubmit = (values: FormValues) => {
    if (!contactId) return;
    dispatch(updateContact({ id: contactId, ...values }));
    localStorage.removeItem("id");
    navigate("/Home");
  };

  if (!contact) {
    return (
      <Typography variant="h6" color="error" align="center" mt={4}>
        Contact not found!
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          textAlign="center"
          color="#333"
        >
          Edit Contact
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />

                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  name="company"
                  label="Company"
                  value={values.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  fullWidth
                  name="notes"
                  label="Notes"
                  multiline
                  minRows={3}
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Photo
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFieldValue("photo", reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {values.photo && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <Avatar
                        src={values.photo}
                        sx={{ width: 100, height: 100 }}
                        alt="Preview"
                      />
                    </Box>
                  )}
                </Box>

                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: "#28a745", px: 4 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ px: 4 }}
                    onClick={() => navigate("/Home")}
                  >
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default EditContact;
