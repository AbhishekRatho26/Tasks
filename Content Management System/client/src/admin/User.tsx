import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  posts: Post[];
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newChecked = event.target.checked;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/access/${id}`
      );
      console.log(response.data.message)
      alert(response.data.message);

      // Refresh users after role change
      await fetchUsers();

      // Update modal state user role after role update
      if (selectedUser && selectedUser._id === id) {
        const updatedUser = {
          ...selectedUser,
          role: newChecked ? 'admin' : 'user',
        };
        setSelectedUser(updatedUser);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/admin/users-with-posts'
      );
      const sortedUsers = res.data.data.sort((a: User, b: User) =>
        a.name.localeCompare(b.name)
      );
      setUsers(sortedUsers);
    } catch (error: any) {
      console.error(
        'Error fetching users:',
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handlePublish = () => {
    // Future implementation for publishing a post
    console.log('Publish post');
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Button onClick={() => navigate('/admin')}>Back</Button>
        <Typography variant="h4" gutterBottom>
          All Users
        </Typography>

        <TextField
          label="Search by name or email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>Role</b>
                </TableCell>
                <TableCell>
                  <b>Created At</b>
                </TableCell>
                <TableCell>
                  <b>Posts</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user._id}
                  onClick={() => handleUserClick(user)}
                  hover
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {dayjs(user.createdAt).format('DD MMM YYYY, HH:mm')}
                  </TableCell>
                  <TableCell>{user.posts.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* User Detail Modal */}
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>User Details</DialogTitle>
          <DialogContent dividers>
            {selectedUser && (
              <>
                <Typography variant="h6">{selectedUser.name}</Typography>
                <Typography>Email: {selectedUser.email}</Typography>
                <Typography>
                  Role: {selectedUser.role}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={selectedUser.role === 'admin'}
                        onChange={(e) => handleChange(e, selectedUser._id)}
                      />
                    }
                    label={selectedUser.role === 'admin' ? 'On' : 'Off'}
                    sx={{ ml: 2 }}
                  />
                </Typography>
                <Typography>
                  Joined On:{' '}
                  {dayjs(selectedUser.createdAt).format('DD MMM YYYY, HH:mm')}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6">
                  Posts ({selectedUser.posts.length})
                </Typography>
                <List>
                  {selectedUser.posts.map((post) => (
                    <React.Fragment key={post._id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={post.title}
                          secondary={
                            <>
                              {post.content}
                              <br />
                              <em>
                                {dayjs(post.createdAt).format(
                                  'DD MMM YYYY, HH:mm'
                                )}
                              </em>
                              <Button
                                variant="contained"
                                color="secondary"
                                sx={{ ml: '20px' }}
                                onClick={handlePublish}
                              >
                                Publish
                              </Button>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AdminUsersPage;
