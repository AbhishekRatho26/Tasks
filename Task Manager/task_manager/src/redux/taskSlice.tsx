import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Updated Task interface with description
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

interface TaskState {
  tasks: Task[];
}

// Fetch tasks from localStorage (if any)
const initialState: TaskState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Add task with generated id
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newTask = { ...action.payload, id: uuidv4() };
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    // Update task by id
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },

    // Delete task by id
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
