import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { toast } from "react-toastify";

const ReturnProductButton = ({ id, ReturnProduct, fetchOrderDetails, order }) => {
  const [open, setOpen] = useState(false);

  // Opens the confirmation dialog
  const handleOpen = () => setOpen(true);
  // Closes the confirmation dialog
  const handleClose = () => setOpen(false);

  // Handles the return action
  const handleReturnProduct = async () => {
    try {
      await ReturnProduct(id);
      await fetchOrderDetails();
      toast.success("Return request submitted successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
    handleClose();
  };

  // Optionally, you can also check if the product is eligible for return
  const isEligibleForReturn = order && order.isDelivered && !order.isReturned;

  return (
    <>
      {isEligibleForReturn && (
        <Button variant="contained" color="warning" onClick={handleOpen}>
          Return Product
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Product Return</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to return this product? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReturnProduct} color="warning" variant="contained">
            Confirm Return
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReturnProductButton;
