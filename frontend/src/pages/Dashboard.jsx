import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  LinearProgress,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  Restaurant,
  Category,
  Fastfood,
  TrendingUp,
  AttachMoney,
  LocalOffer,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import api from "../services/api";

function StatCard({ icon: Icon, title, value, trend, color }) {
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              mr: 2,
            }}
          >
            <Icon />
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" component="div" gutterBottom>
          {value}
        </Typography>
        {trend && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TrendingUp sx={{ color: theme.palette.success.main, mr: 1 }} />
            <Typography variant="body2" color="success.main">
              +{trend}% from last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    subcategories: 0,
    items: 0,
    totalAmount: 0,
    discountedItems: 0,
    taxableItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [categories, subcategories, items] = await Promise.all([
        api.getAllCategories(),
        api.getAllSubcategories(),
        api.getAllItems(),
      ]);

      const totalAmount = items.data.reduce(
        (sum, item) => sum + parseFloat(item.totalAmount),
        0
      );
      const discountedItems = items.data.filter(
        (item) => parseFloat(item.discount) > 0
      ).length;
      const taxableItems = items.data.filter(
        (item) => item.taxApplicability
      ).length;

      setStats({
        categories: categories.data.length,
        subcategories: subcategories.data.length,
        items: items.data.length,
        totalAmount,
        discountedItems,
        taxableItems,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Overview
        </Typography>
        <Tooltip title="Refresh data">
          <IconButton onClick={fetchStats} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {loading ? (
        <LinearProgress sx={{ mb: 4 }} />
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={Category}
                title="Total Categories"
                value={stats.categories}
                trend={12}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={Restaurant}
                title="Total Subcategories"
                value={stats.subcategories}
                trend={8}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={Fastfood}
                title="Total Items"
                value={stats.items}
                trend={15}
                color="success"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={AttachMoney}
                title="Total Amount"
                value={`₹${stats.totalAmount.toFixed(2)}`}
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={LocalOffer}
                title="Items with Discount"
                value={stats.discountedItems}
                color="warning"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={AttachMoney}
                title="Taxable Items"
                value={stats.taxableItems}
                color="error"
              />
            </Grid>
          </Grid>

          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Quick Tips
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • Create categories first, then add subcategories and items
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • Use meaningful descriptions to help customers understand your
              menu items
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Keep your menu organized by using appropriate categories and
              subcategories
            </Typography>
          </Paper>
        </>
      )}
    </Container>
  );
}

export default Dashboard;
