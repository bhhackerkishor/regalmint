import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { fetchAllCategories, createCategory, updateCategory, deleteCategory } from "../../categories/CategoriesApi";

export const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetchAllCategories();
            setCategories(response);
            console.log(response)
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleOpen = (category = null) => {
        if (category) {
            setCategoryName(category.name);
            setEditId(category._id);
        } else {
            setCategoryName("");
            setEditId(null);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            if (editId) {
                await updateCategory(editId, { name: categoryName });
            } else {
                await createCategory({ name: categoryName });
            }
            fetchCategories();
            handleClose();
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(id);
                fetchCategories();
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    return (
        <Container sx={{ marginLeft: 30}} >
            <Typography variant="h4" gutterBottom>Admin - Manage Categories</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Add Category
            </Button>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell>{category._id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpen(category)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(category._id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for Adding/Editing Category */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? "Edit Category" : "Add Category"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        fullWidth
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">{editId ? "Update" : "Create"}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

