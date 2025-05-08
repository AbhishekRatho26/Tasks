import {
    Avatar,
    Box,
    Button,
    TextField,
    Typography,
    Paper,
  } from "@mui/material";
  import { useDispatch, useSelector } from "react-redux";
  import { addContact } from "../redux/contactSlice";
  import { v4 as uuidv4 } from "uuid";
  import { useNavigate } from "react-router-dom";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import { RootState } from "../redux/store";
  import { useState } from "react";
  
  interface Contact {
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    notes: string;
    photo: string | null;
  }
  
  const ContactForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
  
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  
    const formik = useFormik<Contact>({
      initialValues: {
        name: "",
        email: "",
        phone: "",
        address: "",
        company: "",
        notes: "",
        photo: null,
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        phone: Yup.string()
          .matches(/^[0-9]{10}$/, "Must be a 10-digit number")
          .required("Required"),
        address: Yup.string(),
        company: Yup.string(),
        notes: Yup.string(),
      }),
      onSubmit: (values, { resetForm }) => {
        const exists = contacts.some(
          (c) => c.name === values.name || c.phone === values.phone
        ); 
  
        if (exists) {
          alert("A contact with this name or phone number already exists.");
          return;
        }
  
        dispatch(addContact({ id: uuidv4(), ...values }));
        alert("Contact Added successfully");
        navigate("/home");
        resetForm();
        setPreviewPhoto(null);
      },
    });
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert("File size must be under 2MB.");
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          formik.setFieldValue("photo", result);
          setPreviewPhoto(result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
    };
  
    return (
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          margin: "auto",
          padding: 3,
          borderRadius: 3,
          mt: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#333" }}>
          Add Contact
        </Typography>
  
        {previewPhoto ? (
          <Avatar
            src={previewPhoto}
            alt="Profile"
            sx={{
              width: 100,
              height: 100,
              margin: "10px auto",
              border: "3px solid #1E40AF",
            }}
          />
        ) : formik.values.name ? (
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#1E40AF",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 30,
              margin: "10px auto",
              border: "3px solid #1E40AF",
            }}
          >
            {getInitials(formik.values.name)}
          </Avatar>
        ) : (
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#ccc",
              color: "#555",
              fontWeight: "bold",
              fontSize: 20,
              margin: "10px auto",
            }}
          >
            DP
          </Avatar>
        )}
  
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Button component="label" fullWidth sx={{ mb: 1 }}>
            Upload Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
  
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && !!formik.errors.phone}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Company"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            multiline
            rows={3}
            label="Notes"
            name="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
          />
  
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#1E40AF",
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "8px",
              paddingY: 1.5,
              "&:hover": {
                backgroundColor: "#1E3A8A",
              },
            }}
          >
            Add Contact
          </Button>
        </Box>
      </Paper>
    );
  };
  
  export default ContactForm;
  