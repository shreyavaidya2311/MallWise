import React, { useState } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Card,
  makeStyles,
} from "@material-ui/core";
import "../App.css";
import logo from "../assets/logo.png";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:825px)"]: {
      width: "30vw",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:825px)"]: {
      width: "90vw",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alignment, setAlignment] = React.useState("customer");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Please fill all the fields!");
      return;
    } else {
      var body = {
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:5000/user/login", body)
        .then((res) => {
          localStorage.setItem("user_ID", res.data.user_ID);
          console.log(alignment);
          if (alignment === "customer") {
            localStorage.setItem("customer_ID", res.data.id);
            window.location.replace("http://localhost:3000/cdashboard");
          } else {
            localStorage.setItem("shopowner_ID", res.data.id);
            window.location.replace("http://localhost:3000/sregister");
          }
        })
        .catch((e) => alert("Incorrect username or password!"));
    }
  };
  return (
    <div className="background">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Card className={classes.card} elevation={6}>
            <img src={logo} alt="logo" style={{ margin: "1em" }} />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="customer" color="primary">
                Customer
              </ToggleButton>
              <ToggleButton value="shopowner" color="primary">
                Shop Owner
              </ToggleButton>
            </ToggleButtonGroup>
            <TextField
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              required
              style={{ margin: "0.75em", width: "90%" }}
            />
            <TextField
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              required
              style={{ margin: "0.75em", width: "90%" }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "0.75em", width: "90%" }}
              size="large"
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Link
              href="/register"
              variant="body2"
              color="secondary"
              style={{ margin: "0.75em" }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
