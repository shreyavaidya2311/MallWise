import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import logo from "../assets/logo-dark.png";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

const MyShops = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let id = localStorage.getItem("shopowner_ID");
    var body = { id: id };
    axios
      .post("http://localhost:5000/shop/get-my-shops", body)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);
  const handleClick = (id) => {
    localStorage.setItem("shop_ID", id);
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
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container justifyContent="center">
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
                                to="/inventory"
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleClick(item.shop_ID)}
                                >
                                  Visit Inventory {">>"}
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
export default MyShops;
