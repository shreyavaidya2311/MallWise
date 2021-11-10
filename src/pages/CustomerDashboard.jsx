import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Badge,
} from "@material-ui/core";
import logo from "../assets/logo-dark.png";
import { ShoppingCart } from "@material-ui/icons";
import "../App.css";
import axios from "axios";
import Shop from "./Shop";
import Cart from "../components/Cart";
import localStorage from "local-storage";
import { Link } from "react-router-dom";

const CustomerDashboard = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [click, setClick] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [shopID, setShopID] = useState();

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
    setShopID(id);
    setClick(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("http://localhost:3000/");
  };
  if (click) {
    return (
      <Shop
        products={products}
        setProducts={setProducts}
        setClick={setClick}
        openCart={openCart}
        setOpenCart={setOpenCart}
        setCloseCart={handleCloseCart}
        shopID={shopID}
      />
    );
  }
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
                      <Link
                        to="/purchased"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <Button size="large" color="secondary">
                          Purchased Products
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => setOpenCart(true)}>
                        {products.length ? (
                          <Badge badgeContent={products.length} color="error">
                            <ShoppingCart color="secondary" />
                          </Badge>
                        ) : (
                          <ShoppingCart color="secondary" />
                        )}
                      </IconButton>
                    </Grid>
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
                          style={{
                            borderRadius: "5%",
                            width: "32em",
                            height: "20em",
                          }}
                        />
                        <div className="social-links">
                          <ul>
                            <li>
                              <Typography
                                style={{ color: "white", fontSize: "1.25em" }}
                                variant="overline"
                              >
                                <i>
                                  <b>{item.name}</b>
                                </i>
                              </Typography>
                            </li>
                            <br />
                            <li>
                              <Button
                                onClick={() => setShop(item.shop_ID)}
                                color="secondary"
                                variant="contained"
                              >
                                Visit Shop {">>"}
                              </Button>
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
          <Cart
            products={products}
            openCart={openCart}
            setCloseCart={handleCloseCart}
          />
        </div>
      )}
    </>
  );
};
export default CustomerDashboard;
