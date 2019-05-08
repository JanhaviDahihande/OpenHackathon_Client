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

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

import { GoogleLogin } from "react-google-login";
// @material-ui/icons
import Group from "@material-ui/icons/Group";
import Assessment from "@material-ui/icons/Assessment";

// core components
import InfoArea from "components/InfoArea/InfoArea.jsx";
const dashboardRoutes = [];
class UserOrganization extends React.Component {
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
            <GridContainer style={{ backgroundColor: "white" }}>
              <GridItem xs={4} sm={2} md={3}>
                <InfoArea
                  title="Current Organization"
                  description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                  icon={Group}
                  iconColor="rose"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} />
              <GridItem xs={12} sm={12} md={2}>
                <InfoArea
                  title="Status"
                  description="Pending"
                  icon={Assessment}
                  iconColor="rose"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <InfoArea
                  title="Create"
                  description=""
                  icon={Assessment}
                  iconColor="rose"
                />
              </GridItem>
              {/* <GridItem  xs={12} sm={12} md={2}>
                  <InfoArea
                    title="Status"
                    description="Pending"
                    icon={Assessment}
                    iconColor="rose"
                  />
                </GridItem> */}
              {/* <GridItem  xs={12} sm={12} md={4}>
                <InfoArea
                  title="Status"
                  description="Pending"
                  icon={Assessment}
                  iconColor="rose"
                /></GridItem> */}
              <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem>
              {/* <GridItem >
                  <input type="search" 
                style={{marginTop: 10,  width: 500, height: 50}}
                ></input>
                </GridItem> */}
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem" }}>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Organization 2</h4>
                    <Button color="primary">Join</Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem" }}>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Organization 3</h4>
                    <Button color="primary">Join</Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem" }}>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Organization 4</h4>
                    <Button color="primary">Join</Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem" }}>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Organization 5</h4>
                    <Button color="primary">Join</Button>
                  </CardBody>
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

export default withStyles(loginPageStyle)(UserOrganization);
