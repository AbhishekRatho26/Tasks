import { AppBar, Toolbar, Typography, Button } from "@mui/material";

interface NavbarProps {
  onAddTask: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddTask }) => {
  return (
    <>
      <AppBar position="fixed" sx={{ background: "black" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" onClick={onAddTask}>
            Add Task
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
