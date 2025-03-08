import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";
import { AttachMoney, ShoppingCart, Payment, PendingActions, LocalShipping, CheckCircle, People, AdminPanelSettings, Person } from "@mui/icons-material";
import { fetchAdminDashboardInfo } from "../adminApi.jsx";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAdminDashboardInfo();
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading)
    return (
      <Container style={{ textAlign: "center", marginTop: "20px", marginLeft: "200px" }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container style={{ textAlign: "center", marginTop: "20px", marginLeft: "200px" }}>
        <Alert severity="error">Error fetching data. Try again later.</Alert>
      </Container>
    );

  const stats = [
    { label: "Total Revenue", value: `₹${data.totalRevenue?.toLocaleString() || 0}`, icon: <AttachMoney fontSize="small" color="primary" /> },
    { label: "Total Orders", value: data.totalOrders || 0, icon: <ShoppingCart fontSize="small" color="secondary" /> },
    { label: "Paid Orders", value: data.paidOrders || 0, icon: <Payment fontSize="small" color="success" /> },
    { label: "Unpaid Orders", value: data.unpaidOrders || 0, icon: <PendingActions fontSize="small" color="warning" /> },
    { label: "Pending Orders", value: data.pendingOrders || 0, icon: <PendingActions fontSize="small" color="error" /> },
    { label: "Shipped Orders", value: data.shippedOrders || 0, icon: <LocalShipping fontSize="small" color="info" /> },
    { label: "Delivered Orders", value: data.deliveredOrders || 0, icon: <CheckCircle fontSize="small" color="success" /> },
    { label: "Total Users", value: data.totalUsers || 0, icon: <People fontSize="small" color="primary" /> },
    { label: "Admin Users", value: data.adminUsers || 0, icon: <AdminPanelSettings fontSize="small" color="secondary" /> },
    { label: "Normal Users", value: data.normalUsers || 0, icon: <Person fontSize="small" color="success" /> },
  ];

  return (
    <Container sx={{ mt: 5, ml: "220px" }}>
      <Grid container spacing={1}>
        {stats.map((item, index) => (
          <Grid item md={3} sm={4} xs={6} key={index}>
            <Card sx={{ textAlign: "center", p: 1, borderRadius: 2, boxShadow: 2,marginBottom:"5px", backgroundColor: "#f5f5f5", width: "250px", height: "120px" }}>
              <CardContent>
                {item.icon}
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "primary.dark", mt: 1 }}>{item.label}</Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: "medium", color: "secondary.dark" }}>{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
