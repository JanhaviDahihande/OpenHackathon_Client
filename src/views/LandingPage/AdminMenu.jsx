import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Link } from "react-router-dom";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class AdminMenu extends React.Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h2 className={classes.title}>Actions</h2>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            {/* <GridItem xs={12} sm={12} md={4}>
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">
                  <h4>
                    <b>Dashboard</b>
                  </h4>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Dashboard</h4>
                  <Button color="primary" component={Link} to="/dashboard">
                    Go
                  </Button>
                </CardBody>
              </Card>
            </GridItem> */}
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">
                  <h4>
                    <b>All Hackathons</b>
                  </h4>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Get all hackathons.</h4>
                  <Button color="primary" component={Link} to="/all_hackathons">
                    Go
                  </Button>
                </CardBody>
              </Card>
            </GridItem>

            {/* <GridItem xs={12} sm={12} md={4}>
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
            </GridItem> */}
            <GridItem xs={12} sm={12} md={4}>
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">
                  <h5>
                    <b>My Organization</b>
                  </h5>
                </CardHeader>
                <CardBody>
                  <h5 className={classes.cardTitle}>
                    Organization information.
                  </h5>
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
                  <h5>
                    <b>My Profile</b>
                  </h5>
                </CardHeader>
                <CardBody>
                  <h5 className={classes.cardTitle}>
                    Get all your user details from here!
                  </h5>
                  <Button color="primary" component={Link} to="/profile">
                    Go
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            {/* <GridItem xs={12} sm={12} md={4}>
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">
                  <h5>
                    <b> Create Hackathon</b>
                  </h5>
                </CardHeader>
                <CardBody>
                  <h5 className={classes.cardTitle}>
                    Create a new hackathon from here!
                  </h5>
                  <Button
                    color="primary"
                    component={Link}
                    to="/create_hackathon"
                  >
                    Go
                  </Button>
                </CardBody>
              </Card>
            </GridItem> */}
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(AdminMenu);
