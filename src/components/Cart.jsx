import React from "react";
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Add, Cancel } from "@material-ui/icons";

const Cart = (props) => {
  return (
    <>
      <Dialog open={props.isAddClicked} onClose={props.handleAddClick}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the product details below to add a new product.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item lg={12} xs={12}>
              <TextField
                name="productName"
                variant="outlined"
                fullWidth
                id="productName"
                label="Product Name"
                type="text"
                required
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <Select
                name="productCategory"
                variant="outlined"
                required
                fullWidth
                id="productCategory"
                label="Product Category"
              >
                <MenuItem value={"Grocery"}>Grocery</MenuItem>
                <MenuItem value={"Stationary and Novelties"}>
                  Stationary and Novelties
                </MenuItem>
                <MenuItem value={"Pharmacy"}>Pharmacy</MenuItem>
                <MenuItem value={"Clothing and Accessories"}>
                  Clothing and Accessories
                </MenuItem>
                <MenuItem value={"Cosmetics"}>Cosmetics</MenuItem>
              </Select>
            </Grid>
            <Grid item lg={12} xs={12}>
              <TextField
                name="productQuantity"
                variant="outlined"
                required
                fullWidth
                id="productQuantity"
                label="Product Quantity"
                type="number"
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <TextField
                name="productPrice"
                variant="outlined"
                required
                fullWidth
                id="productPrice"
                label="Product Price"
                type="number"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleAddClick} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button onClick={props.handleAddClick} startIcon={<Add />}>
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
