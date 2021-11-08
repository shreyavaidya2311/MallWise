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
} from "@material-ui/core";
import { Add, Cancel } from "@material-ui/icons";
import axios from "axios";

const AddProduct = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const handleAdd = () => {
    if (
      name === "" ||
      category === "" ||
      price === 0 ||
      quantity === 0 ||
      link === 0
    ) {
      alert("Please fill all values");
    } else {
      let shop_id = localStorage.getItem("shop_ID");
      var body = {
        shop_id: shop_id,
        name: name,
        section: category,
        price: price,
        quantity: quantity,
        image: link,
      };
      axios
        .post("http://localhost:5000/product/add-product", body)
        .then((res) => {
          window.location.reload();
        })
        .catch((e) => console.log(e));
    }
  };
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
                value={name}
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
                value={category}
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
                value={quantity}
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
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <TextField
                name="productImage"
                variant="outlined"
                required
                fullWidth
                id="productImage"
                label="Product Image Link"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleAddClick} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button onClick={handleAdd} startIcon={<Add />}>
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProduct;
