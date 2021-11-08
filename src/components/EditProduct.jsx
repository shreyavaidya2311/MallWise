import React, { useState } from "react";
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
  CircularProgress,
} from "@material-ui/core";
import { Update, Cancel } from "@material-ui/icons";
import axios from "axios";

const EditProduct = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const handleUpdate = () => {
    if (name === "") {
      setName(props.product.name);
    }
    if (price === 0) {
      setPrice(props.product.price);
    }
    if (quantity === 0) {
      setQuantity(props.product.quantity);
    }
    if (category === "") {
      setCategory(props.product.section);
    } else {
      var body = {
        product_id: props.product.product_ID,
        name: name,
        section: category,
        price: price,
        quantity: quantity,
      };
      axios
        .post("http://localhost:5000/product/update-product", body)
        .then((res) => {
          window.location.reload();
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <>
      <Dialog open={props.isEditClicked} onClose={props.handleEditClick}>
        {props.product ? (
          <>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edit the existing details of chosen product.
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
                    defaultValue={props.product.name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
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
                    defaultValue={props.product.section}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
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
                    defaultValue={props.product.quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
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
                    defaultValue={props.product.price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={props.handleEditClick} startIcon={<Cancel />}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} startIcon={<Update />}>
                Edit Product
              </Button>
            </DialogActions>
          </>
        ) : (
          <CircularProgress />
        )}
      </Dialog>
    </>
  );
};

export default EditProduct;
