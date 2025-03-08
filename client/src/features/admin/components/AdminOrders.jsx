import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrdersAsync,
  resetOrderUpdateStatus,
  selectOrderUpdateStatus,
  selectOrders,
  updateOrderByIdAsync
} from '../../order/OrderSlice';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Avatar, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Select,
  Stack, Typography, useMediaQuery, useTheme
} from '@mui/material';
import { EditOutlined, CheckCircleOutlined } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import { noOrdersAnimation } from '../../../assets/index';

export const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [editIndex, setEditIndex] = useState(-1);
  const orderUpdateStatus = useSelector(selectOrderUpdateStatus);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(768));

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (orderUpdateStatus === 'fulfilled') toast.success("Status updated");
    else if (orderUpdateStatus === 'rejected') toast.error("Error updating order status");
  }, [orderUpdateStatus]);

  useEffect(() => {
    return () => dispatch(resetOrderUpdateStatus());
  }, []);

  const handleUpdateOrder = (data) => {
    const update = { ...data, _id: orders[editIndex]._id };
    setEditIndex(-1);
    dispatch(updateOrderByIdAsync(update));
  };

  const editOptions = ['Pending', 'Dispatched', 'Out for delivery', 'Delivered', 'Cancelled'];

  const getStatusColor = (status) => ({
    'Pending': { bgcolor: '#dfc9f7', color: '#7c59a4' },
    'Dispatched': { bgcolor: '#feed80', color: '#927b1e' },
    'Out for delivery': { bgcolor: '#AACCFF', color: '#4793AA' },
    'Delivered': { bgcolor: "#b3f5ca", color: "#548c6a" },
    'Cancelled': { bgcolor: "#fac0c0", color: '#cc6d72' }
  }[status]);

  return (
    <Stack ml={isMobile ? 0 : '110px'} mt={3} alignItems={'center'} width="100%">
      {orders.length ? (
        <TableContainer component={Paper} sx={{ width: isMobile ? '95%' : '80%', overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status&location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order._id.slice(-5)}</TableCell>
                  <TableCell>
                    {order.item.map((product) => (
                      <Stack direction="row" alignItems="center" spacing={1} key={product.product._id}>
                        <Avatar src={product.product.thumbnail} sx={{ width: 30, height: 30 }} />
                        <Typography variant="body2">{product.product.title}</Typography>
                      </Stack>
                    ))}
                  </TableCell>
                  <TableCell>₹{order.total}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.address[0].street}, {order.address[0].city}</Typography>
                  </TableCell>
                  <TableCell>{order.paymentMode}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <FormControl size="small" fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          defaultValue={order.status}
                          {...register('status')}
                        >
                          {editOptions.map((option) => (
                            <MenuItem value={option} key={option}>{option}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Chip label={order.status} sx={getStatusColor(order.status)} size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    
                      <IconButton component={Link} to={`/admin/order/${order.orderNumber}/update`}>
                        <EditOutlined fontSize="small" />
                      </IconButton>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <Lottie animationData={noOrdersAnimation} style={{ width: 200 }} />
          <Typography variant="body1">No orders found</Typography>
        </Stack>
      )}
    </Stack>
  );
};
