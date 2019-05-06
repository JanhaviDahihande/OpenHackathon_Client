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
import TextField from "@material-ui/core/TextField";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

import { GoogleLogin } from "react-google-login";

class CreateHackathon extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
    this.handleChange = this.handleChange.bind(this);
    this.postHackathon = this.postHackathon.bind(this);
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

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }

  postHackathon() {
    fetch("http://localhost:5000/hackathon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName: this.state.eventName,
        description: this.state.description,
        fees: this.state.fees,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        minTeamSize: this.state.minTeamSize,
        maxTeamSize: this.state.maxTeamSize
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
      });
  }

  render() {
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
                        id="eventName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          type: "text"
                        }}
                      />
                      <CustomInput
                        labelText="Description"
                        id="description"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          type: "text"
                        }}
                      />
                      <CustomInput
                        labelText="Fees"
                        id="fees"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          type: "text"
                        }}
                      />
                      <TextField
                        id="startDate"
                        label="Start Date"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="date"
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="endDate"
                        label="End Date"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="date"
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <br />
                      <TextField
                        id="minTeamSize"
                        label="Min Team Size"
                        type="number"
                        className={classes.textField}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="maxTeamSize"
                        label="Max Team Size"
                        type="number"
                        className={classes.textField}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={this.postHackathon}
                      >
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
