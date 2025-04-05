import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Button, TextField, Select, MenuItem, 
  Checkbox, Dialog, DialogTitle, DialogContent, 
  DialogActions, FormControl, InputLabel, IconButton, 
  Typography, Container, Paper, List, ListItem, ListItemText, 
  ListItemSecondaryAction, Fab, ThemeProvider, createTheme 
} from "@mui/material";
import { Add, Edit, Delete, Brightness4, Brightness7 } from "@mui/icons-material";

type Note = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function TodoApp() {
  const [showPopup, setShowPopup] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");  // Search state
  const [darkMode, setDarkMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  };

  const addOrUpdateNote = async () => {
    if (newNote.trim() !== "") {
      try {
        if (editId) {
          await axios.put(`http://localhost:5000/api/todos/${editId}`, { title: newNote });
        } else {
          await axios.post("http://localhost:5000/api/todos", { title: newNote, completed: false });
        }
        fetchNotes();
        setEditId(null);
      } catch (error) {
        console.error("Error saving note", error);
      }
      setNewNote("");
      setShowPopup(false);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed });
      fetchNotes();
    } catch (error) {
      console.error("Error updating note", error);
    }
  };

  const editNote = (note: Note) => {
    setNewNote(note.title);
    setEditId(note._id);
    setShowPopup(true);
  };

  const filteredNotes = notes.filter((note) => {
    return (
      (filter === "all" || (filter === "completed" && note.completed) || (filter === "pending" && !note.completed)) &&
      note.title.toLowerCase().includes(searchTerm.toLowerCase())  // Search filter
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ 
        backgroundColor: darkMode ? "#303030" : "#f5f5f5", 
        minHeight: "100vh", 
        paddingTop: "20px",
        transition: "background 0.3s ease-in-out"
      }}>
        <Container maxWidth="sm">
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>TODO LIST</Typography>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              {/* Search Input */}
              <TextField
                label="Search note..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flexGrow: 1, marginRight: "10px" }}
              />

              <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
                <InputLabel>Filter</InputLabel>
                <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
              <IconButton color="secondary" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </div>

            <List>
              {filteredNotes.map((note) => (
                <ListItem key={note._id} divider>
                  <Checkbox checked={note.completed} onChange={() => toggleComplete(note._id, note.completed)} />
                  <ListItemText primary={note.title} style={{ textDecoration: note.completed ? "line-through" : "none"}} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => editNote(note)}><Edit color="primary" /></IconButton>
                    <IconButton onClick={() => deleteNote(note._id)}><Delete color="error" /></IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>

          <Fab color="secondary" aria-label="add" style={{ position: "fixed", bottom: 20, right: 20 }} onClick={() => setShowPopup(true)}>
            <Add />
          </Fab>

          <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
            <DialogTitle>{editId ? "Edit Note" : "Add Note"}</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Enter note..."
                variant="outlined"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                style={{ marginTop: "10px" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { setShowPopup(false); setEditId(null); }} color="secondary">Cancel</Button>
              <Button onClick={addOrUpdateNote} color="secondary" variant="contained">{editId ? "Update" : "Submit"}</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </ThemeProvider>
  );
}