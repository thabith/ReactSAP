import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Card,
  Grid,
  Select,
  MenuItem
} from "@material-ui/core";
import { Link } from "react-router-dom";

class CompanyForm extends Component {
  state = {
    name: "",
    address: "",
    city: "",
    country: "Srilanka",
    selectedFile: null,
    currentIndex: -1
  };

  returnList() {
    if (localStorage.getItem("companies") == null)
      localStorage.setItem("companies", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("companies"));
  }

  returnStateObject() {
    if (this.props.match.params.id === undefined)
      return {
        name: "",
        address: "",
        city: "",
        country: "Srilanka",
        selectedFile: null,
        currentIndex: -1
      };
    else return this.returnList()[this.state.currentIndex];
  }

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

  componentDidMount() {
    if (this.state.currentIndex !== -1)
      this.setState({
        ...this.returnStateObject()
      })
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDropDown = (e) => {
    this.state.country = e.target.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.onAddOrEdit(this.state);
  };

  returnList() {
    if (localStorage.getItem("companies") == null)
      localStorage.setItem("companies", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("companies"));
  }

  onAddNew = (data) => {
    var list = this.returnList();
    if (this.state.currentIndex == -1) list.push(data);
    localStorage.setItem("companies", JSON.stringify(list));
    this.setState({ currentIndex: -1 });
  }

  onAddOrEdit = (data) => {
    var list = this.returnList();
    if (this.state.currentIndex === -1 || this.state.currentIndex === null){
      list.push(data);
      this.setState({ selectedFile: null})
    }
    else list[this.state.currentIndex] = data;
    localStorage.setItem("companies", JSON.stringify(list));
    this.setState({
      name: '',
      address: '',
      city: '',
      country: 'Srilanka',
      currentIndex: -1
    });
    this.props.history.push('/list')
  };

  onFileChangeHandlder = e =>{
    const file = e.target.files[0]
    this.setState({selectedFile : file})

    console.log(file)

    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState({
        selectedFile : reader.result
      })
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
    
  }

  onFileUploadHandler = () => {
    
     const formData = new FormData(); 
     
     formData.append( 
       "myFile", 
       this.state.selectedFile, 
       this.state.selectedFile.name 
     ); 
     
     console.log(this.state.selectedFile); 
  }

  render() {
    const { id } = this.props.match.params;
    if (id !== undefined)
      this.state.currentIndex = id;

    return (
      <Card variant="outlined">
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justify="center"
        >

          <form onSubmit={this.handleSubmit} autoComplete="off">
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                name="name"
                onChange={this.handleInputChange}
                value={this.state.name}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="address">Address</InputLabel>
              <Input
                name="address"
                onChange={this.handleInputChange}
                value={this.state.address}
              />
            </FormControl>
            <br />
            <FormControl>
              <InputLabel htmlFor="city">City</InputLabel>
              <Input
                name="city"
                onChange={this.handleInputChange}
                value={this.state.city}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="country">Country</InputLabel>
              <Select
                name="country"
                onChange={this.handleInputChange}
                id="country"
                value={this.state.country}
                defaultValue={this.state.country}
              >
                {this.country.map((item, index) => {
                  return (
                    <MenuItem name="country" value={item.name}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <br/>
            <FormControl>
            <input
        accept="image/*"
        className="d-none"
        id="contained-button-file"
        type="file"
        onChange = {this.onFileChangeHandlder}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" >
          Upload
        </Button>
      </label>
            </FormControl>
            <br />
            <Grid container justify="center">
              <Button color="secondary" variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
        {/* <Formik
          initialValues={{ name: "", address: "",city:"",country:"" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name is Required";
            } else if (!values.address)
             {
                errors.address = "Address is Required";
            }else if(!values.city){
                errors.city = "City is Required";
            }else if(!values.country){
                errors.country = "Country is Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                name="name"
                onChange={this.handleInputChange}
                value={this.state.bAccountNo}
              />
              <ErrorMessage name="email" component="div" />
            </FormControl>
              <Field type="email" name="email"  />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik> */}
      </Card>
    );
  }
}

export default CompanyForm;
