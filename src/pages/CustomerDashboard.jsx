import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import logo from "../assets/logo-dark.png";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

const CustomerDashboard = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/shop/get-shops")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const setShop = (id) => {
    localStorage.setItem("cshop_ID", id);
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
          <Grid container style={{ marginTop: "2em" }} justifyContent="center">
            {data.map((item) => (
              <Grid item>
                <div
                  className="speaker-block wow fadeInUp"
                  style={{ width: "32em" }}
                >
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image">
                        <img
                          src={item.image}
                          alt="img"
                          style={{ borderRadius: "5%" }}
                        />
                        <div className="social-links">
                          <ul>
                            <li>
                              <Typography
                                style={{ color: "white", fontSize: "1.5em" }}
                                variant="overline"
                              >
                                <i>
                                  <b>{item.name}</b>
                                </i>
                              </Typography>
                            </li>
                            <br />
                            <li>
                              <Link
                                to="/shop"
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                              >
                                <Button
                                  onClick={() => setShop(item.shop_ID)}
                                  color="secondary"
                                  variant="contained"
                                >
                                  Visit Shop {">>"}
                                </Button>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </figure>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};
export default CustomerDashboard;
