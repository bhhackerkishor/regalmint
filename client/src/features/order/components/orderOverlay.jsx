import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { toast } from "react-toastify";

const CancelOrderButton = ({ id, CancelOrder, fetchOrderDetails }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const CancelOrderHandler = async () => {
    try {
      await CancelOrder(id);
      await fetchOrderDetails();
      toast.success("Order canceled successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
    handleClose(); // Close dialog after action
  };

  return (
    <>
      {/* Cancel Order Button */}
      <Button variant="contained" color="error" onClick={handleOpen}>
        Cancel Order
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>Are you sure you want to cancel this order?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No, Keep Order
          </Button>
          <Button onClick={CancelOrderHandler} color="error" variant="contained">
            Yes, Cancel Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CancelOrderButton;
