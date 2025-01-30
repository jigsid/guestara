import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Category as CategoryIcon,
  ListAlt as SubcategoryIcon,
  Restaurant as ItemIcon,
} from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const navItems = [
  { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { text: "Categories", path: "/categories", icon: <CategoryIcon /> },
  { text: "Subcategories", path: "/subcategories", icon: <SubcategoryIcon /> },
  { text: "Items", path: "/items", icon: <ItemIcon /> },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => location.pathname === path;

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{
              color: isActive(item.path)
                ? theme.palette.primary.main
                : theme.palette.text.primary,
              bgcolor: isActive(item.path)
                ? theme.palette.primary.light + "20"
                : "transparent",
              "&:hover": {
                bgcolor: theme.palette.primary.light + "10",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, color: "text.primary" }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Menu Management
            </Typography>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: isActive(item.path)
                        ? "primary.main"
                        : "text.primary",
                      bgcolor: isActive(item.path)
                        ? "primary.light" + "20"
                        : "transparent",
                      "&:hover": {
                        bgcolor: "primary.light" + "10",
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;
