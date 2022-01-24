import "./App.css";
import AppNavBar from "./components/AppNavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Items from "./components/pages/Items";
import { getAuthUser } from "./redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "reactstrap";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const getUser = () => dispatch(getAuthUser());
  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spinner
          style={{ width: "3rem", height: "3rem", color: "secondary" }}
          type="grow"
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppNavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/items" component={Items} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
