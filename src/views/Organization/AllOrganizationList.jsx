import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { Link } from "react-router-dom";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";
// core components
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";

const dashboardRoutes = [];
class AllOrganizationsList extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      isLoading: true,
      cardAnimaton: "cardHidden",
      organization: []
    };

    this.joinOrganization = this.joinOrganization.bind(this);
  }
  componentDidMount() {
    this.setState(
      { userId: localStorage.getItem("userId"), isLoading: true },
      () => {
        this.getOrganizations();
      }
    );
    // this.getOrganizations();
  }

  joinOrganization(name) {
    console.log(name);
    const authHeader = localStorage.getItem("accessToken");
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/user/" + this.state.userId + "/join/" + name,
        {
          headers: { Authorization: authHeader }
        }
      )
      .then(response => {
        console.log(response);
        var organization = [];
        for (let i = 0; i < response.data.length; i++) {
          organization.push({
            id: response.data[i].id,
            name: response.data[i].name,
            description: response.data[i].description,
            owner: response.data[i].owner,
            address: response.data[i].address
          });
        }
        this.setState({ organization: organization });
        this.props.reloadAfterJoin();
        this.props.handleModalClose();
      });
  }

  getOrganizations() {
    const authHeader = localStorage.getItem("accessToken");
    var organization = [];
    axios
      .get("http://openhackathon.us-east-1.elasticbeanstalk.com/organization", {
        headers: { Authorization: authHeader }
      })
      .then(response => {
        console.log(response);

        for (let i = 0; i < response.data.length; i++) {
          organization.push({
            id: response.data[i].id,
            name: response.data[i].name,
            description: response.data[i].description,
            owner: response.data[i].owner,
            address: response.data[i].address
          });
        }
        this.setState({ organization: organization, isLoading: false });
      });
  }
  render() {
    const { classes, ...rest } = this.props;

    if (this.state.isLoading) {
      return (
        <div style={{ backgroundColor: "white", textAlign: "center" }}>
          <CircularProgress className={classes.progress} />
        </div>
      );
    } else {
      return (
        <div style={{ paddingTop: 0 }}>
          <Header
            color="primary"
            routes={dashboardRoutes}
            brand="List of Organizations"
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
            <div className={classes.container} style={{ paddingTop: 0 }}>
              <GridContainer
                style={{
                  backgroundColor: "white"
                }}
              >
                <GridItem xs={12} sm={12} md={12}>
                  <h3 style={{ color: "black" }}>List of Organizations</h3>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Paper className={classes.root}>
                    <Table
                      className={classes.table}
                      style={{ marginBottom: 30 }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Organization Name</TableCell>
                          <TableCell align="left">Description</TableCell>
                          <TableCell align="left">Owner</TableCell>
                          <TableCell align="left">Join</TableCell>
                          {/* <TableCell align="left">Street</TableCell>
                        <TableCell align="left">City</TableCell>
                        <TableCell align="left">State</TableCell>
                        <TableCell align="left">Zip</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.organization.map(row => (
                          <TableRow key={row.id}>
                            <TableCell
                              component="a"
                              href={"/organization_details/" + row.id}
                            >
                              {row.name}
                            </TableCell>
                            <TableCell align="left">
                              {row.description}
                            </TableCell>

                            <TableCell align="left">{row.owner.name}</TableCell>
                            <TableCell align="left">
                              {" "}
                              <Button
                                color="primary"
                                onClick={() => this.joinOrganization(row.name)}
                                disabled={
                                  this.props.currentUserOrganization == row.name
                                    ? true
                                    : false
                                }
                              >
                                Join
                              </Button>
                            </TableCell>

                            {/* <TableCell align="left">
                            {row.address.street}
                          </TableCell>

                          <TableCell align="left">{row.address.city}</TableCell>

                          <TableCell align="left">
                            {row.address.state}
                          </TableCell>

                          <TableCell align="left">{row.address.zip}</TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </GridItem>
              </GridContainer>
            </div>
          </div>
          {/*  */}
        </div>
      );
    }
  }
}

export default withStyles(loginPageStyle)(AllOrganizationsList);
