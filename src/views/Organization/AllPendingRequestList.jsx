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
class AllPendingRequestList extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      isLoading: true,
      cardAnimaton: "cardHidden",
      userList: [],
      organization: {
        id: "ZZZ",
        name: "ZZZ",
        owner: {
          userId: "ZZZ",
          name: "ZZZ"
        },
        description: "ZZZ",
        address: {
          street: "ZZZ",
          city: "ZZZ",
          state: "ZZZ",
          zip: "ZZZ"
        },
        members: [],
        sponsoredHackathons: []
      }
    };

    this.approveRequest = this.approveRequest.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
  }
  componentDidMount() {
    this.setState(
      { userId: localStorage.getItem("userId"), isLoading: true },
      () => {
        this.getPendingRequests();
      }
    );
  }

  getPendingRequests() {
    const authHeader = localStorage.getItem("accessToken");
    const { classes, ...rest } = this.props;
    fetch(
      "http://localhost:5000/user/" + this.props.userId + "/pendingrequests",
      {
        method: "GET",
        "Content-Type": "application/json",
        headers: { Authorization: authHeader }
        // body: JSON.stringify(this.props.userProfile)
      }
    )
      .then(res => res.json())
      .then(response => {
        console.log(response);

        var users = [];
        for (let i = 0; i < response.length; i++) {
          users.push({
            id: response[i].id,
            firstname: response[i].firstname,
            lastname: response[i].lastname,
            organizationName: response[i].organizationName
          });
        }
        this.setState({ userList: users, isLoading: false });
        // this.props.reloadAfterJoin();
        // this.props.handleModalClose();
      });
  }

  approveRequest(user) {
    var userObject = {
      id: user.id
    };
    this.state.isLoading = true;
    const authHeader = localStorage.getItem("accessToken");
    const { classes, ...rest } = this.props;
    console.log(user);
    fetch("http://localhost:5000/user/approve", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader
      },
      body: JSON.stringify(userObject)
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        this.setState({ isLoading: false });
        this.getPendingRequests();
      });
  }

  rejectRequest(userid, organizationName) {}

  render() {
    const { classes, ...rest } = this.props;

    const tableCell = { textAlign: "center" };

    if (this.state.isLoading) {
      return (
        <div style={{ backgroundColor: "white", textAlign: "center" }}>
          <CircularProgress className={classes.progress} />
        </div>
      );
    } else {
      if (this.state.userList.length <= 0) {
        return (
          <div style={{ backgroundColor: "white", textAlign: "center" }}>
            <h4>No pending requests</h4>
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
                // height: 400,
                color: "white"
              }}
              {...rest}
            />
            <div className={classes.pageHeader} style={{ minHeight: "0vh" }}>
              <div className={classes.container} style={{ paddingTop: 0 }}>
                <GridContainer
                  style={{
                    backgroundColor: "white",
                    height: "100%"
                  }}
                >
                  <GridItem>
                    <h3 style={{ color: "black" }}>List of Requests</h3>
                  </GridItem>

                  <GridItem>
                    <Paper className={classes.root}>
                      <Table
                        className={classes.table}
                        style={{ marginBottom: 30 }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">User Name</TableCell>
                            <TableCell align="center">
                              Organization Name
                            </TableCell>
                            <TableCell align="center">Approve/Reject</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.userList.map(row => (
                            <TableRow key={row.id}>
                              <TableCell
                                align="center"
                                component="a"
                                href={"" + row.id}
                              >
                                {row.firstname + " " + row.lastname}
                              </TableCell>

                              <TableCell align="center">
                                {row.organizationName}
                              </TableCell>

                              <TableCell align="center">
                                {" "}
                                <Button
                                  color="success"
                                  onClick={() => this.approveRequest(row)}
                                >
                                  Approve
                                </Button>{" "}
                                <Button
                                  color="danger"
                                  onClick={() => this.rejectRequest(row)}
                                >
                                  Reject
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </GridItem>
                </GridContainer>
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        );
      }
    }
  }
}

export default withStyles(loginPageStyle)(AllPendingRequestList);
