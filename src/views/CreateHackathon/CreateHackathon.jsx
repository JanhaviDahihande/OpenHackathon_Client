import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import TextField from '@material-ui/core/TextField';

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

import { GoogleLogin } from 'react-google-login';

class CreateHackathon extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  
  render() {
    const responseGoogle = (response) => {
      // var profile = response.getBasicProfile();
      // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      // console.log('Full Name: ' + profile.getName());
      // console.log('Given Name: ' + profile.getGivenName());
      // console.log('Family Name: ' + profile.getFamilyName());
      // console.log("Image URL: " + profile.getImageUrl());
      // console.log("Email: " + profile.getEmail());

      // // The ID token you need to pass to your backend:
      // var id_token = response.getAuthResponse().id_token;
      // console.log("ID Token: " + id_token);
      console.log(response);
    }
    const { classes, ...rest } = this.props;
    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
          
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
              <h2>Create Hackathon</h2>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    
                    <CardBody>
                      <CustomInput
                        labelText="Hackathon Name"
                        id="hack_name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                        
                        }}
                      />
                      <CustomInput
                        labelText="Description"
                        id="hack_description"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                        
                        }}
                      />
                      <CustomInput
                        labelText="Fees"
                        id="hack_fees"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                        
                        }}
                      />
                      <TextField
                        id="start_date"
                        label="Start Date"
                        className={classes.textField}
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                       <TextField
                       style={{marginLeft: 10}}
                        id="end_date"
                        label="End Date"
                        className={classes.textField}
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <br/>
                      <TextField
                        id="outlined-number"
                        label="Min Team Size"
                        // value={this.state.age}
                        // onChange={this.handleChange('age')}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        style={{marginLeft: 10}}
                        id="outlined-number"
                        label="Max Team Size"
                        // value={this.state.age}
                        // onChange={this.handleChange('age')}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg">
                        Create
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(CreateHackathon);
