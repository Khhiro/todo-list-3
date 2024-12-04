import React, { useState } from "react";
import {
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ city: "", status: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", photo: "", status: "", city: "" });
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = () => {
    if (editUser) {
      setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
      setEditUser(null);
    } else {
      setUsers([...users, { ...newUser, id: Date.now() }]);
    }
    setNewUser({ name: "", photo: "", status: "", city: "" });
    setDialogOpen(false);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (filters.city ? user.city === filters.city : true) &&
      (filters.status ? user.status === filters.status : true)
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Table
      </Typography>

      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <TextField
          label="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <Select
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">All Cities</MenuItem>
          <MenuItem value="New York">New York</MenuItem>
          <MenuItem value="Los Angeles">Los Angeles</MenuItem>
        </Select>
        <Select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Add User
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <img
                    src={user.photo}
                    alt={user.name}
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editUser ? editUser.name : newUser.name}
            onChange={(e) =>
              editUser
                ? setEditUser({ ...editUser, name: e.target.value })
                : setNewUser({ ...newUser, name: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Photo URL"
            value={editUser ? editUser.photo : newUser.photo}
            onChange={(e) =>
              editUser
                ? setEditUser({ ...editUser, photo: e.target.value })
                : setNewUser({ ...newUser, photo: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <Select
            value={editUser ? editUser.status : newUser.status}
            onChange={(e) =>
              editUser
                ? setEditUser({ ...editUser, status: e.target.value })
                : setNewUser({ ...newUser, status: e.target.value })
            }
            fullWidth
            displayEmpty
            margin="dense"
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
          <TextField
            label="City"
            value={editUser ? editUser.city : newUser.city}
            onChange={(e) =>
              editUser
                ? setEditUser({ ...editUser, city: e.target.value })
                : setNewUser({ ...newUser, city: e.target.value })
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddUser}>
            {editUser ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
