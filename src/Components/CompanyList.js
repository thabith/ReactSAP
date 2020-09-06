import React, { Component } from "react";
import CompanyForm from "./CompanyForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import download from "../icons/logo192.png";

class CompanyList extends Component {
  state = {
    currentIndex: -1,
    list: this.returnList(),
    open: false,
  };

  country = [
    {
      id: 0,
      name: "Srilanka",
    },
    {
      id: 1,
      name: "India",
    },
    {
      id: 2,
      name: "Pakistan",
    },
  ];

  handleClickOpen = (index) => {
    this.setState({
      open: true,
      currentIndex:index
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  returnList() {
    if (localStorage.getItem("companies") == null)
      localStorage.setItem("companies", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("companies"));
  }

  handleDelete = () => {
    var list = this.returnList();
    list.splice(this.state.currentIndex, 1);
    localStorage.setItem("companies", JSON.stringify(list));
    this.setState({ list, currentIndex: -1, open: false });
  };

  render() {
    return (
        <div>
          <h5>List of All companies</h5>
          <br />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Company Logo</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.list.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>{item.country}</TableCell>
                      <TableCell>
                        <img
                          // src={download}
                          src = {item.selectedFile==null? download : item.selectedFile}
                          className="App-logo"
                          alt="sample logo"
                        />
                      </TableCell>
                      <TableCell>
                      
                        <Link to={`/add/${index}`}>Edit</Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="secondary"
                          // onClick={() => this.handleDelete(index)}
                          onClick={() => this.handleClickOpen(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <Dialog
                        open={this.state.open}
                        onClose={() => this.handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Are you want to delete?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button
                            onClick={() => this.handleClose()}
                            color="primary"
                          >
                            No
                          </Button>
                          <Button
                            onClick={() => this.handleDelete()}
                            color="secondary"
                            autoFocus
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          
        </div>
    );
  }
}

export default CompanyList;
