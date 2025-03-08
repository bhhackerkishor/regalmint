import React, { useEffect, useState } from "react";
import { fetchAllBrands, createBrand, updateBrand, deleteBrand } from "../../Brands/BrandApi.jsx";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AdminBrands = () => {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const data = await fetchAllBrands();
    setBrands(data);
  };

  const handleSave = async () => {
    if (!name.trim()) return; // Prevent empty input submission

    if (editId) {
      await updateBrand(editId, { name });
    } else {
      await createBrand({ name });
    }
    setEditId(null);
    setName("");
    fetchBrands();
  };

  const handleEdit = (brand) => {
    setName(brand.name);
    setEditId(brand._id);
  };

  const handleDelete = async (id) => {
    await deleteBrand(id);
    fetchBrands();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <Paper sx={{ p: 3, width: 400, textAlign: "center" }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Manage Brands
        </Typography>

        {/* Form for Adding/Editing Brands */}
        <TextField
          label="Brand Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary" 
          fullWidth
          disabled={!name.trim()} 
        >
          {editId ? "Update Brand" : "Add Brand"}
        </Button>
      </Paper>

      {/* Brands Table */}
      <TableContainer component={Paper} sx={{ mt: 3, width: 400 }} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <TableRow key={brand._id}>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(brand)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(brand._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography color="textSecondary">No brands available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminBrands;
