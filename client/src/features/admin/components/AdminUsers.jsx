import React, { useEffect, useState } from "react";
import { fetchAllUsers, createUser, updateUser, deleteUser } from "../../user/UserApi";
import { Table, TableBody, TableCell, TableContainer, Checkbox, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", isAdmin: false });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const usersData = await fetchAllUsers();
            setUsers(usersData);
        } catch (err) {
            setError(err || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = (user = null) => {
        setEditId(user ? user._id : null);
        setFormData(user || { name: "", email: "", password: "", isAdmin: false });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ name: "", email: "", password: "", isAdmin: false });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, isAdmin: e.target.checked });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (editId) {
                await updateUser(editId, formData);
            } else {
                await createUser(formData);
            }
            loadUsers();
            handleClose();
        } catch (err) {
            setError(err || "Operation failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await deleteUser(id);
            loadUsers();
        } catch (err) {
            setError(err || "Failed to delete user");
        } finally {
            setLoading(false);
        }
    };

    const toggleAdmin = async (user) => {
        try {
            setLoading(true);
            await updateUser(user._id, { ...user, isAdmin: !user.isAdmin });
            loadUsers();
        } catch (err) {
            setError(err || "Failed to update admin status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginLeft: 250, padding: "20px" }}>
            <h2>Admin Users</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <Button variant="contained" onClick={() => handleOpen()} sx={{ marginBottom: 2 }}>
                Add User
            </Button>

            <TableContainer component={Paper} sx={{ maxWidth: "95%" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={user.isAdmin}
                                        onChange={() => toggleAdmin(user)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(user)}><Edit /></IconButton>
                                    <IconButton onClick={() => handleDelete(user._id)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for Add/Edit User */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? "Edit User" : "Add User"}</DialogTitle>
                <DialogContent>
                    <TextField label="Name" name="name" fullWidth margin="dense" value={formData.name} onChange={handleChange} />
                    <TextField label="Email" name="email" fullWidth margin="dense" value={formData.email} onChange={handleChange} />
                    <Checkbox checked={formData.isAdmin} onChange={handleCheckboxChange} /> isAdmin
                    {!editId && <TextField label="Password" name="password" fullWidth margin="dense" type="password" value={formData.password} onChange={handleChange} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">{editId ? "Update" : "Create"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
