import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  IconButton,
  Box,
  MenuItem,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import api from "../services/api";

function Subcategories() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    categoryId: "",
    taxApplicability: false,
    tax: "",
  });

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await api.getAllSubcategories();
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleOpen = (subcategory = null) => {
    if (subcategory) {
      setEditingSubcategory(subcategory);
      setFormData(subcategory);
    } else {
      setEditingSubcategory(null);
      setFormData({
        name: "",
        image: "",
        description: "",
        categoryId: "",
        taxApplicability: false,
        tax: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSubcategory(null);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "taxApplicability" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubcategory) {
        await api.updateSubcategory(editingSubcategory.id, formData);
      } else {
        await api.createSubcategory(formData);
      }
      handleClose();
      fetchSubcategories();
    } catch (error) {
      console.error("Error saving subcategory:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Subcategories</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Subcategory
        </Button>
      </Box>

      <Grid container spacing={3}>
        {subcategories.map((subcategory) => (
          <Grid item xs={12} sm={6} md={4} key={subcategory.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={subcategory.image}
                alt={subcategory.name}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {subcategory.name}
                  </Typography>
                  <IconButton onClick={() => handleOpen(subcategory)}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Category: {subcategory.category?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {subcategory.description}
                </Typography>
                {subcategory.taxApplicability && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Tax: {subcategory.tax}%
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingSubcategory ? "Edit Subcategory" : "Add Subcategory"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              select
              fullWidth
              label="Category"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              margin="normal"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.taxApplicability}
                  onChange={handleChange}
                  name="taxApplicability"
                />
              }
              label="Tax Applicable"
              sx={{ mt: 2 }}
            />
            {formData.taxApplicability && (
              <TextField
                fullWidth
                label="Tax (%)"
                name="tax"
                type="number"
                value={formData.tax}
                onChange={handleChange}
                margin="normal"
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSubcategory ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Subcategories;
