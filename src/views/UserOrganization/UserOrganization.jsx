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
import OrganizationList from "../Organization/AllOrganizationList";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import axios from "axios";
import image from "assets/img/bg7.jpg";

import { GoogleLogin } from "react-google-login";
// @material-ui/icons
import Group from "@material-ui/icons/Group";
import Assessment from "@material-ui/icons/Assessment";

// core components
import InfoArea from "components/InfoArea/InfoArea.jsx";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AllPendingRequestList from "../Organization/AllPendingRequestList";
const dashboardRoutes = [];
class UserOrganization extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      isLoading: false,
      reloadAfterJoin: false,
      profile: {},
      cardAnimaton: "cardHidden",
      open: false,
      openManage: false
    };
    this.leaveOrganization = this.leaveOrganization.bind(this);
    this.reloadAfterJoin = this.reloadAfterJoin.bind(this);
    // this.getuserDetails = this.getuserDetails(this);
  }

  leaveOrganization() {
    const authHeader = localStorage.getItem("accessToken");

    fetch("http://localhost:5000/user/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader
      },
      body: JSON.stringify(this.state.profile)
    })
      .then(res => res.json())
      .then(json => {
        if (json.status != "BadRequest") {
          console.log(json);
          // this.setState({ profile: json });
          var user = {};
          user.aboutMe = json.aboutMe;
          user.city = json.city;
          user.email = json.email;
          user.firstname = json.firstname;
          user.lastname = json.lastname;
          user.membershipStatus = json.membershipStatus;
          user.organizationName = json.organizationName;
          user.potraitURL = json.potraitURL;
          user.screenName = json.screenName;
          user.state = json.state;
          user.street = json.street;
          user.title = json.title;
          user.zip = json.zip;
          this.setState({ profile: user });
        } else alert("Request failed with error: " + json.message);
        // }
      });
  }

  getUserProfile() {
    const authHeader = localStorage.getItem("accessToken");

    axios
      .get("http://localhost:5000/user/" + this.state.userId, {
        headers: { Authorization: authHeader }
      })
      .then(response => {
        var user = {};
        user.id = response.data.id;
        user.aboutMe = response.data.aboutMe;
        user.city = response.data.city;
        user.email = response.data.email;
        user.firstname = response.data.firstname;
        user.lastname = response.data.lastname;
        user.membershipStatus = response.data.membershipStatus;
        user.organizationName = response.data.organizationName;
        user.potraitURL = response.data.potraitURL;
        user.screenName = response.data.screenName;
        user.state = response.data.state;
        user.street = response.data.street;
        user.title = response.data.title;
        user.zip = response.data.zip;
        this.setState({ profile: user, isLoading: false });
      });
  }

  reloadAfterJoin() {
    this.componentDidMount();
  }

  handleModalOpen = () => {
    this.setState({ open: true });
  };

  handleModalClose = () => {
    this.setState({ open: false });
  };

  handleManageModalOpen = () => {
    this.setState({ openManage: true });
  };

  handleManageModalClose = () => {
    this.setState({ openManage: false });
  };

  componentDidMount() {
    this.setState(
      { userId: localStorage.getItem("userId"), isLoading: true },
      () => {
        this.getUserProfile();
      }
    );
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  render() {
    const styles = theme => ({
      button: {
        margin: theme.spacing.unit
      },
      input: {
        display: "none"
      }
    });
    const responseGoogle = response => {
      console.log(response);
    };
    const { classes, ...rest } = this.props;

    console.log(this.state.profile.membershipStatus);
    const comp =
      this.state.profile.membershipStatus == "Approved" ? (
        <GridItem
          xs={4}
          sm={2}
          md={3}
          style={{ display: "flex", alignItems: "center" }}
          name="leave_button"
        >
          <Button
            color="primary"
            component={Link}
            onClick={this.leaveOrganization}
          >
            Leave Organization
          </Button>
        </GridItem>
      ) : (
        <GridItem xs={4} sm={2} md={3} />
      );
    // if (this.state.isLoading) {
    //   return (
    //     <div style={{ backgroundColor: "white", textAlign: "center" }}>
    //       <CircularProgress className={classes.progress} />
    //     </div>
    //   );
    // } else {
    return (
      <div>
        <Header
          color="primary"
          routes={dashboardRoutes}
          brand="Open Hackathon"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            // height: 400,
            color: "white"
          }}
          {...rest}
        />
        <div
          style={{
            zIndex: 2,
            backgroundColor: "white",
            textAlign: "center",
            display: this.state.isLoading ? "block" : "none"
          }}
        >
          <CircularProgress className={classes.progress} />
        </div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            display: this.state.isLoading ? "none" : "block"
          }}
        >
          <div className={classes.container}>
            <GridContainer
              style={{
                backgroundColor: "white",
                marginLeft: "0px",
                marginRight: "0px"
              }}
            >
              <GridItem xs={4} sm={2} md={3}>
                <InfoArea
                  title="Organization"
                  description={
                    this.state.profile.organizationName
                      ? this.state.profile.organizationName
                      : "Not a part of any organization"
                  }
                  icon={Group}
                  iconColor="rose"
                />
              </GridItem>
              {/* <GridItem xs={4} sm={2} md={3}>
                  <InfoArea
                    title="Status"
                    description={
                      this.state.profile.membershipStatus
                        ? this.state.profile.membershipStatus
                        : "NA"
                    }
                    icon={Assessment}
                    iconColor="rose"
                  />
                </GridItem> */}

              <GridItem
                xs={4}
                sm={2}
                md={3}
                style={{ display: "flex", alignItems: "center" }}
              />
              <GridItem
                xs={4}
                sm={2}
                md={3}
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
                name="leave_button"
              >
                <Button
                  color="primary"
                  onClick={this.leaveOrganization}
                  disabled={
                    this.state.profile.membershipStatus != "Approved"
                      ? true
                      : false
                  }
                  style={{ width: "80%" }}
                >
                  Leave Organization
                </Button>
              </GridItem>
              <GridItem
                xs={4}
                sm={2}
                md={3}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  color="primary"
                  component={Link}
                  to="/create_organization"
                  style={{ width: "80%" }}
                >
                  Create Organization
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer
              style={{
                backgroundColor: "white",
                marginLeft: "0px",
                marginRight: "0px"
              }}
            >
              <GridItem xs={4} sm={2} md={3}>
                <InfoArea
                  title="Status"
                  description={
                    this.state.profile.membershipStatus
                      ? this.state.profile.membershipStatus
                      : "NA"
                  }
                  icon={Assessment}
                  iconColor="rose"
                />
              </GridItem>
              <GridItem
                xs={4}
                sm={2}
                md={3}
                style={{ display: "flex", alignItems: "center" }}
              />
              <GridItem
                xs={4}
                sm={2}
                md={3}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  color="primary"
                  style={{ width: "80%" }}
                  onClick={this.handleModalOpen}
                >
                  Browse Organizations
                </Button>
              </GridItem>
              <GridItem
                xs={4}
                sm={2}
                md={3}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  color="primary"
                  onClick={this.handleManageModalOpen}
                  style={{ width: "80%" }}
                >
                  Manage Requests
                </Button>
              </GridItem>
            </GridContainer>
            <div
              style={{
                height: "500px",
                overflowY: "scroll"
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  display: this.state.isLoading ? "block" : "none"
                }}
              >
                <CircularProgress className={classes.progress} />
              </div>
              <Dialog
                open={this.state.open}
                onClose={this.handleModalClose}
                aria-labelledby="form-dialog-title"
                // fullWidth="false"
                maxWidth="300px"
                style={{
                  padding: "40px"
                }}
                // aria-labelledby="max-width-dialog-title"
              >
                {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
                <DialogContent style={{ width: "990px" }}>
                  {/* <DialogContentText>
                      To subscribe to this website, please enter your email
                      address here. We will send updates occasionally.
                    </DialogContentText> */}
                  <OrganizationList
                    currentUserOrganization={
                      this.state.profile.organizationName
                    }
                    reloadAfterJoin={this.reloadAfterJoin}
                    handleModalClose={this.handleModalClose}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={this.handleModalClose}
                    // variant="outlined"
                    // className={classes.button}
                    color="primary"
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={this.state.openManage}
                onClose={this.handleManageModalClose}
                aria-labelledby="form-dialog-title"
                maxWidth="300px"
                style={{
                  padding: "40px"
                }}
              >
                <DialogContent style={{ width: "990px" }}>
                  <AllPendingRequestList
                    userId={this.state.profile.id}
                    reloadAfterJoin={this.reloadAfterJoin}
                    handleModalClose={this.handleModalClose}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleManageModalClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
    // }
  }
}
export default withStyles(loginPageStyle)(UserOrganization);
