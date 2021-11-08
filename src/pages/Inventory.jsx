import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import {
  IconButton,
  Button,
  Grid,
  AppBar,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import { Edit, Add } from "@material-ui/icons";
import EditProduct from "../components/EditProduct";
import AddProduct from "../components/AddProduct";
import logo from "../assets/logo-dark.png";
import axios from "axios";
import { Link } from "react-router-dom";

const Inventory = () => {
  const [isEditClicked, setEditClicked] = useState(false);
  const [isAddClicked, setAddClicked] = useState(false);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let shop_id = localStorage.getItem("shop_ID");
    var body = { shop_id: shop_id };
    axios
      .post("http://localhost:5000/product/get-products", body)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleEditClick = () => {
    setEditClicked(!isEditClicked);
  };
  const handleEdit = (dataIndex) => {
    setProduct(data[dataIndex]);
    setEditClicked(!isEditClicked);
  };

  const handleAddClick = () => {
    setAddClicked(!isAddClicked);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("http://localhost:3000/");
  };

  const columns = [
    {
      name: "name",
      label: "Product Name",
    },
    {
      name: "section",
      label: "Product Category",
    },
    {
      name: "price",
      label: "Product Price(₹)",
    },
    {
      name: "quantity",
      label: "Product Quantity",
    },
    {
      name: "editProduct",
      label: "Edit Product",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <IconButton onClick={() => handleEdit(dataIndex)}>
              <Edit color="secondary" />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
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
                      <Link
                        to="/myshops"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <Button color="secondary" size="large">
                          <b>My Shops</b>
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        to="/sregister"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <Button color="secondary" size="large">
                          <b>Register Shop</b>
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Button
                        color="secondary"
                        size="large"
                        onClick={handleLogout}
                        variant="outlined"
                      >
                        <b>LOGOUT</b>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div
            style={{
              marginTop: "3em",
            }}
          >
            <AddProduct
              isAddClicked={isAddClicked}
              handleAddClick={handleAddClick}
            />
            <EditProduct
              isEditClicked={isEditClicked}
              handleEditClick={handleEditClick}
              product={product}
            />
            <Grid container justify="center">
              <Grid item xs={10}>
                <MUIDataTable
                  title={"Inventory"}
                  columns={columns}
                  options={options}
                  data={data}
                />
              </Grid>
            </Grid>
            <br />
            <Grid justify="center" container>
              <Button
                variant="outlined"
                size="large"
                color="secondary"
                startIcon={<Add />}
                onClick={handleAddClick}
              >
                Add Product
              </Button>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};

export default Inventory;
