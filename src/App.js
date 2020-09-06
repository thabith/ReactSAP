import React from "react";
import "./App.css";
import CompanyList from "./Components/CompanyList";
import CompanyForm from "./Components/CompanyForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <h5 className="navbar-brand">React SAP Test</h5>
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/list"} className="nav-link">
              All Companies
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              New Company
            </Link>
          </li>
        </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/list"]} component={CompanyList} />
            <Route exact path={"/add/:id"} component={CompanyForm} />
            <Route exact path={"/add"} component={CompanyForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
