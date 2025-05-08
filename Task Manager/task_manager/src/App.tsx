import { useState } from "react";
import { Container } from "@mui/material";
import { Task } from "./redux/taskSlice";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedTask(null);
    setOpen(true);
  };

  return (
    <>
      <Navbar onAddTask={handleAdd} />
      <Container sx={{ mt: 4 }}>
        <TaskList onEdit={handleEdit} />
      </Container>
      <TaskForm open={open} setOpen={setOpen} initialData={selectedTask} />
    </>
  );
};

export default App;
