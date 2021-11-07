import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import logo from "../assets/logo-dark.png";
import {
  AddCircleOutline,
  IndeterminateCheckBoxOutlined,
  ShoppingCart,
} from "@material-ui/icons";
import "../App.css";
import axios from "axios";

const Shop = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let shop_id = localStorage.getItem("cshop_ID");
    var body = { shop_id: shop_id };
    axios
      .post("http://localhost:5000/product/get-products", body)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);
  const [quantity, setQuantity] = useState([]);
  const handleAdd = (index) => {
    let tempquantity = [...quantity];
    if (tempquantity[index]) {
      tempquantity[index] += 1;
    } else {
      tempquantity[index] = 1;
    }
    setQuantity(tempquantity);
  };
  const handleSubtract = (index) => {
    let tempquantity = [...quantity];
    if (tempquantity[index] > 0) {
      tempquantity[index] -= 1;
    } else {
      tempquantity[index] = 0;
    }
    setQuantity(tempquantity);
  };
  const handleChange = (val, index) => {
    let tempquantity = [...quantity];
    if (isNaN(parseInt(val))) {
      tempquantity[index] = 0;
    } else {
      tempquantity[index] = parseInt(val);
    }
    setQuantity(tempquantity);
  };
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <AppBar style={{ boxShadow: "none" }} color="primary">
            <Toolbar>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <img src={logo} alt="logo" />
                </Grid>
                <Grid item>
                  <IconButton>
                    <ShoppingCart color="secondary" />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container style={{ marginTop: "5em" }} justifyContent="center">
            {data.map((item, index) => (
              <Card style={{ width: "20em", margin: "1em" }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  style={{ width: "20em" }}
                />
                <center>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body1"
                      style={{ fontSize: "1.25em" }}
                      component="div"
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      ₹{item.price}
                    </Typography>
                  </CardContent>
                </center>

                <CardActions>
                  <Grid container justify="center">
                    <IconButton onClick={() => handleSubtract(index)}>
                      <IndeterminateCheckBoxOutlined />
                    </IconButton>
                    <TextField
                      variant="outlined"
                      style={{ width: "4em" }}
                      defaultValue={0}
                      value={quantity[index]}
                      onChange={(e) => handleChange(e.target.value, index)}
                    />
                    <IconButton onClick={() => handleAdd(index)}>
                      <AddCircleOutline />
                    </IconButton>
                  </Grid>
                </CardActions>
                <center>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: "1em", width: "13em" }}
                  >
                    Add to Cart
                  </Button>
                </center>
              </Card>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};
export default Shop;
