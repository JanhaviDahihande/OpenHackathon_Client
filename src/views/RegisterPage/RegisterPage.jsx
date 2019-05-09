import React, { PureComponent } from "react";
import PropTypes from "prop-types";
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

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";
import { Link } from "react-router-dom";
type Props = {
  history: any
};
class RegisterPage extends PureComponent<Props, State> {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      first_name: "",
      last_name: "",
      email_id: "",
      password: "",
      confirm_password: ""
    };
    this.handlesOnFirstNameChange = this.handlesOnFirstNameChange.bind(this);
    this.handlesOnLastNameChange = this.handlesOnLastNameChange.bind(this);
    this.handlesOnEmailChange = this.handlesOnEmailChange.bind(this);
    this.handlesOnPasswordChange = this.handlesOnPasswordChange.bind(this);
    this.handlesOnConfirmPasswordChange = this.handlesOnConfirmPasswordChange.bind(
      this
    );
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({
          cardAnimaton: "",
          first_name: "",
          last_name: "",
          email_id: "",
          password: ""
        });
      }.bind(this),
      700
    );
  }

  sendEmail = (event: SyntheticEvent<>) => {
    const { history } = this.props;
    const { first_name, last_name, email_id, password } = this.state;
    console.log(
      first_name + "__" + last_name + "__" + email_id + "__" + password
    );
    if (
      document.getElementById("password").value !=
      document.getElementById("confirm_password").value
    ) {
      alert("Passwords don't match");
      document.getElementById("password").value = "";
      document.getElementById("confirm_password").value = "";
    } else if (document.getElementById("first_name").value == "") {
      alert("First name cannot be blank");
    } else if (document.getElementById("last_name").value == "") {
      alert("Last name cannot be blank");
    } else if (document.getElementById("email_id").value == "") {
      alert("Email cannot be blank");
    } else if (document.getElementById("password").value == "") {
      alert("Password cannot be blank");
    } else if (document.getElementById("confirm_password").value == "") {
      alert("Password needs to be confirmed");
    } else {
      fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname: first_name,
          lastname: last_name,
          email: email_id,
          password: password
        })
      })
        .then(res => res.json())
        .then(json => {
          console.log("json", json);
          history.push({ pathname: "/invitation-sent" });
        });
    }
  };

  render() {
    const responseGoogle = response => {
      console.log(response);
    };
    const { classes, ...rest } = this.props;
    const {
      first_name,
      last_name,
      email_id,
      password,
      confirm_password
    } = this.state;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Open Hackathon"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
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
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Register</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="First Name"
                        id="first_name"
                        value={first_name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handlesOnFirstNameChange,
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Screen Name"
                        id="last_name"
                        value={last_name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handlesOnLastNameChange,
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Email id"
                        id="email_id"
                        value={email_id}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handlesOnEmailChange,
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                        onChange={this.handlesOnEmailChange}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        value={password}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handlesOnPasswordChange,
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Confirm Password"
                        id="confirm_password"
                        value={confirm_password}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handlesOnConfirmPasswordChange,
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={this.sendEmail}
                        // component={Link} to="/invitation-sent"
                      >
                        Register
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
  handlesOnFirstNameChange = (event: SyntheticEvent<>) => {
    //alert("Inside name");
    if (event) {
      //event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ first_name: event.target.value.trim() });
    }
  };

  handlesOnLastNameChange = (event: SyntheticEvent<>) => {
    if (event) {
      //event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ last_name: event.target.value.trim() });
    }
  };

  handlesOnEmailChange = (event: SyntheticEvent<>) => {
    if (event) {
      //event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ email_id: event.target.value.trim() });
    }
  };

  handlesOnPasswordChange = (event: SyntheticEvent<>) => {
    if (event) {
      //event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ password: event.target.value.trim() });
    }
  };

  handlesOnConfirmPasswordChange = (event: SyntheticEvent<>) => {
    if (event) {
      //event.preventDefault();
      // should add some validator before setState in real use cases

      this.setState({ confirm_password: event.target.value.trim() });
    }
  };
}

export default withStyles(loginPageStyle)(RegisterPage);
