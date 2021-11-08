import React from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  AddCircleOutline,
  CreditCard,
  IndeterminateCheckBoxOutlined,
  Cancel,
} from "@material-ui/icons";
import axios from "axios";

const Cart = (props) => {
  let price = 0;
  let quantity = 0;
  const handleCheckout = () => {
    let cart_ID = localStorage.getItem("cart_ID");
    let customer_ID = localStorage.getItem("customer_ID");
    let product_no = props.products.length;
    var body = {
      cart_ID: cart_ID,
      customer_ID: customer_ID,
      product_number: product_no,
      total_cost: price,
      total_quantity: quantity,
      products: props.products,
    };
    axios
      .post("http://localhost:5000/cart/checkout", body)
      .then((res) => {
        alert("Successful");
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Dialog open={props.openCart} onClose={props.setCloseCart}>
        <DialogTitle>Cart</DialogTitle>
        <DialogContent>
          {props.products.length ? (
            <>
              <DialogContentText>Items in Cart</DialogContentText>
              <Grid container spacing={2}>
                {props.products.map((item) => {
                  price += item.price * item.quantity;
                  quantity += item.quantity;
                  return (
                    <>
                      <Grid item lg={8}>
                        <Typography>
                          <b>Name:</b> {item.name}
                        </Typography>
                        <Typography>
                          <b>Price:</b> {"₹"}
                          {item.price}
                        </Typography>
                        <Typography>
                          <b>Quantity:</b>{" "}
                          <IconButton>
                            <IndeterminateCheckBoxOutlined />
                          </IconButton>
                          {item.quantity}
                          <IconButton>
                            <AddCircleOutline />
                          </IconButton>
                        </Typography>
                      </Grid>
                      <Grid item lg={4}>
                        <img
                          style={{ height: "10em", width: "10em" }}
                          src={item.image}
                          alt="img"
                        />
                      </Grid>
                    </>
                  );
                })}
                <Grid container>
                  <Grid item lg={4}>
                    <Typography>
                      <b>
                        Total Cost: {"₹"}
                        {price}
                      </b>
                    </Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <Typography>
                      <b>Total Quantity: {quantity}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <center>
                <img
                  src="https://i.ibb.co/wSdPGnp/empty-cart.png"
                  alt="empty-cart"
                />
              </center>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.setCloseCart} startIcon={<Cancel />}>
            Cancel
          </Button>
          {props.products.length ? (
            <Button
              onClick={handleCheckout}
              color="secondary"
              startIcon={<CreditCard />}
            >
              Checkout
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
