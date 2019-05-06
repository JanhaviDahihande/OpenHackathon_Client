import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Group from "@material-ui/icons/Group";
import AttachMoney from "@material-ui/icons/AttachMoney";
import CalendarToday from "@material-ui/icons/CalendarToday";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Link } from "react-router-dom";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ActionsSection extends React.Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Actions</h2>
            {/* <h5 className={classes.description}>
              This is the paragraph where you can write more details about your
              product. Keep you user engaged by providing meaningful
              information. Remember that by this time, the user is curious,
              otherwise he wouldn't scroll to get here. Add a button if you want
              the user to see more.
            </h5> */}
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">
                  <h4>
                    <b>Team Registration</b>
                  </h4>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    {" "}
                    Go ahead to Register tour team here!
                  </h4>
                  <Button color="primary" component={Link} to="/index">
                    Go
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">
                  <h4>
                    <b>My Hackathon</b>
                  </h4>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    Get the current hackathon information.
                  </h4>
                  <Button
                    color="primary"
                    component={Link}
                    to="/my_hackathonlist"
                  >
                    Go
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">
                  <h4>
                    <b>Create Organization</b>
                  </h4>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    Go ahead to create your organization.
                  </h4>
                  <Button
                    color="primary"
                    component={Link}
                    to="/create_organization"
                  >
                    Go
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">
                  <h4>
                    <b>My Organization</b>
                  </h4>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    Get the current Hackathon information.
                  </h4>
                  <Button
                    color="primary"
                    component={Link}
                    to="/user_organization"
                  >
                    Go
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">
                  <h4>
                    <b>My Profile</b>
                  </h4>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    Get all your user details from here!
                  </h4>
                  <Button color="primary" component={Link} to="/profile">
                    Go
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">
                  <h4>
                    <b> Create Hackathon</b>
                  </h4>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    Create a new hackathon from here!
                  </h4>
                  <Button
                    color="primary"
                    component={Link}
                    to="/create_hackathon"
                  >
                    Go
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ActionsSection);
