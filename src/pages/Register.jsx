import React, { useState } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Card,
  makeStyles,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "../App.css";
import "../App.css";
import logo from "../assets/logo.png";
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

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [contactno, setContact] = useState("");

  const classes = useStyles();
  const [role, setrole] = React.useState("customer");

  const handleChange = (event, newrole) => {
    setrole(newrole);
  };

  const handleRegister = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      cpassword === "" ||
      contactno === "" ||
      role === ""
    ) {
      alert("Please fill all the fields!");
      return;
    } else {
      var body = {
        name: name,
        email: email,
        password: password,
        contactno: contactno,
        role: role,
      };
      axios
        .post("http://localhost:5000/user/register", body)
        .then((res) => {
          window.location.replace("http://localhost:3000/");
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div className="background">
      <Grid container justifyContent="center" alignItems="center">
        <Card className={classes.card} elevation={5}>
          <img src={logo} alt="logo" style={{ margin: "1em" }} />
          <ToggleButtonGroup
            color="primary"
            value={role}
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
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ margin: "0.75em", width: "90%" }}
          />
          <TextField
            variant="outlined"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ margin: "0.75em", width: "90%" }}
          />
          <TextField
            variant="outlined"
            label="Contact Number"
            value={contactno}
            onChange={(e) => setContact(e.target.value)}
            required
            type="number"
            style={{ margin: "0.75em", width: "90%" }}
          />
          <TextField
            variant="outlined"
            label="Password"
            value={password}
            type="password"
            required
            style={{ margin: "0.75em", width: "90%" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            value={cpassword}
            type="password"
            required
            onChange={(e) => setCPassword(e.target.value)}
            style={{ margin: "0.75em", width: "90%" }}
          />
          {password === cpassword && password !== "" ? (
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "0.75em", width: "90%" }}
              size="large"
              onClick={handleRegister}
            >
              Sign Up
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "0.75em", width: "90%" }}
                size="large"
                disabled
              >
                Sign Up
              </Button>
            </>
          )}
          <Link
            href="/"
            variant="body2"
            color="secondary"
            style={{ margin: "0.75em" }}
          >
            {"Already have an account? Sign In"}
          </Link>
        </Card>
      </Grid>
    </div>
  );
};
export default Register;
