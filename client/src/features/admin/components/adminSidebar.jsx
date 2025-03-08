import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from '@mui/icons-material/Category';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import MenuIcon from "@mui/icons-material/Menu";
import DiscountIcon from '@mui/icons-material/Discount';
import HomeIcon from '@mui/icons-material/Home';


const drawerWidth = 240;

const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
          Admin Panel
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
            ✖
          </IconButton>
        )}
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
      <List>
        <SidebarItem to="/admin/dashboard" text="Dashboard" icon={<DashboardIcon />} />
        <SidebarItem to="/admin/orders" text="Orders" icon={<ShoppingCartIcon />} />
        <SidebarItem to="/admin/products" text="Products" icon={<InventoryIcon />} />
        <SidebarItem to="/admin/users" text="Users" icon={<PeopleIcon />} />
        <SidebarItem to="/admin/brands" text="Brand" icon={<AddBusinessIcon />} />
        <SidebarItem to="/admin/Categorys" text="Category" icon={<CategoryIcon />} />
        <SidebarItem to="/admin/contact" text="ContactUsForms" icon={<ContactPageIcon />} />
		    <SidebarItem to="/admin/Coupons" text="Coupons" icon={<DiscountIcon />} />
		
		
      </List>
    </>
  );

  return (
    <>
      {isMobile && (
	  <>
	  
	  
        <IconButton onClick={handleDrawerToggle} sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300, color: "black" }}>
          <MenuIcon />
		  
        </IconButton>
		 
		 
		</>
      )}

      {/* Desktop Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: isMobile ? "auto" : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1E1E2D",
            color: "#ffffff",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

// Reusable Sidebar Item Component
const SidebarItem = ({ to, text, icon }) => (
  <ListItemButton
    component={Link}
    to={to}
    sx={{
      color: "#ffffff",
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
    }}
  >
    <ListItemIcon sx={{ color: "#ffffff" }}>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItemButton>
);

export default AdminSidebar;
