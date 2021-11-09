import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import Inventory from "./pages/Inventory";
import ShopRegister from "./pages/RegisterShop";
import MyShops from "./pages/MyShops";
import PreviouslyPurchased from "./pages/PreviouslyPurchased";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <div className="background1">
            <Route exact path="/cdashboard" component={CustomerDashboard} />
            <Route exact path="/myshops" component={MyShops} />
            <Route exact path="/inventory" component={Inventory} />
            <Route exact path="/sregister" component={ShopRegister} />
            <Route exact path="/purchased" component={PreviouslyPurchased} />
          </div>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
