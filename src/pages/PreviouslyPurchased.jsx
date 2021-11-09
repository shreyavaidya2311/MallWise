import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import logo from "../assets/logo-dark.png";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

const PreviouslyPurchased = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    var id = localStorage.getItem("customer_ID");
    var body = { id: id };
    axios
      .post("http://localhost:5000/cart/get-purchased", body)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("http://localhost:3000/");
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
                  <Grid container justifyContent="space-between" spacing={4}>
                    <Grid item>
                      <Button
                        color="secondary"
                        size="large"
                        variant="outlined"
                        onClick={handleLogout}
                      >
                        <b>LOGOUT</b>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <center>
            <Typography variant="h5">PURCHASED PRODUCTS</Typography>
          </center>
          <br />
          <center>
            <Link
              to="/cdashboard"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button variant="contained" color="secondary">
                GO BACK
              </Button>
            </Link>
          </center>
          <Grid
            container
            style={{ marginTop: "2em" }}
            justifyContent="center"
            spacing={4}
          >
            {data.map((item) => (
              <>
                <Grid item>
                  <img
                    style={{ height: "20em", width: "15em" }}
                    src={item.image}
                    alt="img"
                  />
                  <center>
                    <Typography>
                      <b>Name:</b> {item.name}
                    </Typography>
                    <Typography>
                      <b>Price:</b> {"₹"}
                      {item.price}
                    </Typography>
                  </center>
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};
export default PreviouslyPurchased;
