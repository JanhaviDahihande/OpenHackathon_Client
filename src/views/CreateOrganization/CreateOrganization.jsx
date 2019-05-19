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
import axios from "axios";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

import { GoogleLogin } from "react-google-login";
const dashboardRoutes = [];
class CreateOrganization extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      userId: 0,
      organization_id: "",
      organization: {},
      street: "",
      city: "",
      state: "",
      zip: "",
      changedOrganization: {
        name: "",
        description: "",
        owner: {
          id: ""
        },
        address: {
          street: "",
          city: "",
          state: "",
          zip: ""
        }
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.postOrganization = this.postOrganization.bind(this);
    this.getOrganization = this.getOrganization.bind(this);
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    const id = this.props.match.params.id;
    console.log("Params::: ", id);
    if (id) {
      this.setState({ organization_id: id }, () => {
        this.getOrganization();
      });
    }
    setTimeout(
      function() {
        this.setState({
          cardAnimaton: "",
          userId: localStorage.getItem("userId")
        });
      }.bind(this),
      700
    );
  }

  getOrganization() {
    axios
      .get("http://localhost:5000/organization/" + this.state.organization_id, {
        params: {
          userId: localStorage.getItem("userId")
        }
      })
      .then(response => {
        console.log(response);
        console.log(response);
        var organization = {};
        var changedOrganization = {};
        organization.id = response.data.id;
        organization.name = response.data.name;
        organization.owner = response.data.owner;
        organization.description = response.data.description;
        organization.address = response.data.address;
        // organization.address.street = response.data.address.street;
        // organization.address.city = response.data.address.city;
        // organization.address.state = response.data.address.state;
        // organization.address.zip = response.data.address.zip;
        this.setState({ organization: organization });

        for (let i = 0; i < response.data.members.length; i++) {
          changedOrganization.members.push(response.data.members[i].id);
        }
        for (let i = 0; i < response.data.sponsoredHackathons.length; i++) {
          changedOrganization.sponsoredHackathons.push(
            response.data.sponsoredHackathons[i].id
          );
        }
        this.setState({
          organization: organization,
          changedOrganization: changedOrganization
        });
      });
  }

  handleChange(evt) {
    var changedOrganization = this.state.changedOrganization;
    if (
      evt.target.id == "street" ||
      evt.target.id == "city" ||
      evt.target.id == "state" ||
      evt.target.id == "zip"
    ) {
      changedOrganization["address"][evt.target.id] = evt.target.value;
      // alert(evt.target.id + "    " + changedOrganization.address.street);
    } else changedOrganization[evt.target.id] = evt.target.value;
    this.setState({ changedOrganization: changedOrganization });
  }

  postOrganization() {
    // console.log(this.state.street);
    // console.log(this.state.city);

    // this.state.changedOrganization.owner.id = this.state.userId;
    // this.state.changedOrganization.address.street = this.state.street;
    // this.state.changedOrganization.address.city = this.state.city;
    // this.state.changedOrganization.address.state = this.state.state;
    // this.state.changedOrganization.address.zip = this.state.zip;
    this.state.changedOrganization.owner.id = localStorage.getItem("userId");
    fetch("http://localhost:5000/organization/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        this.state.changedOrganization
        // eventName: this.state.eventName,
        // description: this.state.description,
        // fees: this.state.fees,
        // startDate: this.state.startDate,
        // endDate: this.state.endDate,
        // minTeamSize: this.state.minTeamSize,
        // maxTeamSize: this.state.maxTeamSize,
        // sponsors: this.state.sponsors,
        // judges: this.state.judges
      )
    })
      .then(res => res.json())
      .then(json => {
        if (json.status != "BadRequest") {
          console.log(json);
          window.location.href =
            "http://localhost:3000/organization_details/" + json.id;
        } else alert("Request failed with error: " + json.message);
        // }
      })
      .catch(error => {
        alert("Invalid Request");
      });
  }

  render() {
    const responseGoogle = response => {
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
    };
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="primary"
          routes={dashboardRoutes}
          brand="Open Hackathon"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
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
              <GridItem xs={12} sm={12} md={8}>
                <h2>Create Organization</h2>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardBody>
                      <CustomInput
                        labelText="Organization Name"
                        id="name"
                        name="name"
                        value={this.state.changedOrganization.name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        // onChange={this.handleChangeMultiple}
                      />
                      <CustomInput
                        labelText="Description"
                        id="description"
                        name="description"
                        value={this.state.changedOrganization.description}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                      />

                      <CustomInput
                        labelText="Street"
                        id="street"
                        name="street"
                        value={this.state.changedOrganization.address.street}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                      />
                      <CustomInput
                        labelText="City"
                        id="city"
                        name="city"
                        value={this.state.changedOrganization.address.city}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                      />
                      <CustomInput
                        labelText="State"
                        id="state"
                        name="state"
                        value={this.state.changedOrganization.address.state}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                      />
                      <CustomInput
                        labelText="Zip"
                        id="zip"
                        name="zip"
                        value={this.state.changedOrganization.address.zip}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={this.postOrganization}
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
        <Footer />
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(CreateOrganization);
