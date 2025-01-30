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
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import api from "../services/api";

function Items() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    categoryId: "",
    subcategoryId: "",
    taxApplicability: false,
    tax: "",
    baseAmount: "",
    discount: "0",
  });

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      fetchSubcategoriesByCategory(formData.categoryId);
    }
  }, [formData.categoryId]);

  const fetchItems = async () => {
    try {
      const response = await api.getAllItems();
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
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

  const fetchSubcategoriesByCategory = async (categoryId) => {
    try {
      const response = await api.getSubcategoriesByCategory(categoryId);
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchQuery.trim()) {
        const response = await api.searchItems(searchQuery);
        setItems(response.data);
      } else {
        fetchItems();
      }
    } catch (error) {
      console.error("Error searching items:", error);
    }
  };

  const handleOpen = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
      if (item.categoryId) {
        fetchSubcategoriesByCategory(item.categoryId);
      }
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        image: "",
        description: "",
        categoryId: "",
        subcategoryId: "",
        taxApplicability: false,
        tax: "",
        baseAmount: "",
        discount: "0",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
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
      if (editingItem) {
        await api.updateItem(editingItem.id, formData);
      } else {
        await api.createItem(formData);
      }
      handleClose();
      fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Items</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Add Item
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
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
                    {item.name}
                  </Typography>
                  <IconButton onClick={() => handleOpen(item)}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Category: {item.category?.name}
                  {item.subcategory && ` > ${item.subcategory.name}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" color="primary">
                    ₹{item.totalAmount}
                  </Typography>
                  {item.discount > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Original: ₹{item.baseAmount} (Save ₹{item.discount})
                    </Typography>
                  )}
                  {item.taxApplicability && (
                    <Typography variant="body2" color="text.secondary">
                      +{item.tax}% Tax
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? "Edit Item" : "Add Item"}</DialogTitle>
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
            {formData.categoryId && (
              <TextField
                select
                fullWidth
                label="Subcategory"
                name="subcategoryId"
                value={formData.subcategoryId}
                onChange={handleChange}
                margin="normal"
              >
                <MenuItem value="">None</MenuItem>
                {subcategories.map((subcategory) => (
                  <MenuItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
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
            <TextField
              fullWidth
              label="Base Amount"
              name="baseAmount"
              type="number"
              value={formData.baseAmount}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Discount"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
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
            {editingItem ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Items;
