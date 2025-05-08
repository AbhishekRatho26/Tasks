import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Task } from "../redux/taskSlice";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

interface TaskListProps {
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const statusColor: Record<string, string> = {
  "To Do": "#f44336",
  "In Progress": "#ff9800",
  "Done": "#4caf50",
};

const TaskList: React.FC<TaskListProps> = ({ onEdit, onDelete }) => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const groupedTasks = {
    "To Do": filteredTasks.filter((task) => task.status === "To Do"),
    "In Progress": filteredTasks.filter((task) => task.status === "In Progress"),
    "Done": filteredTasks.filter((task) => task.status === "Done"),
  };

  const pieData = Object.entries(groupedTasks).map(([status, group]) => ({
    name: status,
    value: group.length,
  }));

  return (
    <>
      <Box mt={2} mb={4}>
        <TextField
          fullWidth
          label="Search Tasks by Title"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Task Summary
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={statusColor[entry.name] || "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {Object.entries(groupedTasks).map(([status, taskGroup]) => (
        <Box key={status} mb={5}>
          <Typography variant="h5" gutterBottom>
            {status}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {taskGroup.length === 0 ? (
            <Typography color="text.secondary">
              {status === "To Do" && "No tasks to do"}
              {status === "In Progress" && "No tasks in progress"}
              {status === "Done" && "No task completed yet"}
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {taskGroup.map((task) => {
                const isOverdue =
                  task.status !== "Done" && task.dueDate < today;
                return (
                  <Grid item xs={12} sm={6} md={4} key={task.id}>
                    <Card
                      sx={{
                        borderLeft: `6px solid ${statusColor[task.status]}`,
                        backgroundColor: isOverdue ? "#fdecea" : "inherit",
                        cursor: "pointer",
                        transition: "0.3s",
                        "&:hover": {
                          boxShadow: 4,
                        },
                      }}
                      onClick={() => setSelectedTask(task)}
                    >
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={1}
                        >
                          <Typography variant="h6">{task.title}</Typography>
                          <Box display="flex" gap={1}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(task);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(task.id);
                              }}
                            >
                              Delete
                            </Button>
                          </Box>
                        </Box>
                        <Typography variant="body2">
                          <strong>Priority:</strong> {task.priority}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Status:</strong> {task.status}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Due:</strong> {task.dueDate}
                        </Typography>
                        {task.status === "Done" && task.completedAt && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            Completed At: {task.completedAt}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      ))}

      <Dialog
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { p: 3 } }}
      >
        <DialogTitle sx={{ fontSize: "1.5rem" }}>Task Details</DialogTitle>
        <DialogContent dividers>
          {selectedTask && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">
                <strong>Title:</strong> {selectedTask.title}
              </Typography>
              <Typography variant="h6">
                <strong>Description:</strong> {selectedTask.description}
              </Typography>
              <Typography>
                <strong>Priority:</strong> {selectedTask.priority}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedTask.status}
              </Typography>
              <Typography>
                <strong>Due Date:</strong> {selectedTask.dueDate}
              </Typography>
              {selectedTask.status === "Done" && selectedTask.completedAt && (
                <Typography>
                  <strong>Completed At:</strong> {selectedTask.completedAt}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTask(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
