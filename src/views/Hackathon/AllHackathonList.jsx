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
import CircularProgress from "@material-ui/core/CircularProgress";
// import Button from "components/CustomButtons/Button.jsx";
import Button from "@material-ui/core/Button";
const dashboardRoutes = [];
class AllHackathonsList extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      hackathon: [],
      isLoading: false,
      upcomingHackathon: [],
      ongoingHackathon: [],
      pastHackathon: []
    };
  }
  componentDidMount() {
    this.getMyHackathons();
  }

  getMyHackathons() {
    const authHeader = localStorage.getItem("accessToken");
    this.setState({ isLoading: true });
    var hackathon = [];
    axios
      .get("http://openhackathon.us-east-1.elasticbeanstalk.com/hackathon", {
        headers: { Authorization: authHeader }
      })
      .then(response => {
        if (response.data.status != "BadRequest") {
          console.log(response);

          for (let i = 0; i < response.data.length; i++) {
            hackathon.push({
              id: response.data[i].id,
              eventName: response.data[i].eventName,
              description: response.data[i].description,
              startDate: response.data[i].startDate,
              endDate: response.data[i].endDate,
              minTeamSize: response.data[i].minTeamSize,
              maxTeamSize: response.data[i].maxTeamSize,
              fees: response.data[i].fees,
              status: response.data[i].status
            });
          }
          this.setState({ hackathon: hackathon, isLoading: false });
        } else {
          alert(response.data.message);
        }
      })
      .then(response => {
        var upcomingHackathon = [];
        var ongoingHackathon = [];
        var pastHackathon = [];
        var currentDate = new Date();
        for (let i = 0; i < hackathon.length; i++) {
          if (new Date(hackathon[i].startDate) > currentDate) {
            upcomingHackathon.push(hackathon[i]);
          } else if (
            (new Date(hackathon[i].startDate) <= currentDate) &
            (new Date(hackathon[i].endDate) >= currentDate)
          ) {
            ongoingHackathon.push(hackathon[i]);
          } else if (new Date(hackathon[i].endDate) < currentDate) {
            pastHackathon.push(hackathon[i]);
          }
        }

        this.setState({
          pastHackathon: pastHackathon,
          ongoingHackathon: ongoingHackathon,
          upcomingHackathon: upcomingHackathon
        });
      });
  }
  render() {
    const { classes, ...rest } = this.props;

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
          <div className={classes.container} style={{}}>
            <GridContainer>
              <GridContainer style={{ backgroundColor: "white" }}>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    backgroundColor: "white",
                    textAlign: "center",
                    padding: "20px"
                  }}
                >
                  <h2 style={{ color: "black", textTransform: "uppercase" }}>
                    List of Hackathons
                  </h2>
                </GridItem>

                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    backgroundColor: "white",
                    // width: "50px",
                    textAlign: "center",
                    display: this.state.isLoading == true ? "block" : "none"
                  }}
                >
                  <div>
                    <CircularProgress className={classes.progress} />
                  </div>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Paper className={classes.root}>
                    <h3 style={{ color: "black", padding: "20px" }}>
                      Upcoming hackathons
                    </h3>
                  </Paper>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ textAlign: "center" }}
                >
                  <h5
                    style={{
                      color: "black",
                      display:
                        this.state.upcomingHackathon.length <= 0
                          ? "block"
                          : "none"
                    }}
                  >
                    Not upcoming hackathons
                  </h5>
                  <Paper className={classes.root}>
                    <Table
                      className={classes.table}
                      style={{
                        marginBottom: 30,
                        display:
                          this.state.upcomingHackathon.length <= 0 ? "none" : ""
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>EventName</TableCell>
                          <TableCell align="left">
                            Start Date - End Date
                          </TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">Team Size</TableCell>
                          <TableCell align="left">Fees</TableCell>
                          <TableCell align="left">Leaderboards</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.upcomingHackathon.map(row => (
                          <TableRow
                            key={row.id}
                            // style={{
                            //   display:
                            //     new Date(row.startDate) > new Date()
                            //       ? ""
                            //       : "none"
                            // }}
                          >
                            <TableCell
                              component="a"
                              href={"/hackathon_details/" + row.id}
                              style={{ color: "#9c27b0" }}
                            >
                              {row.eventName}
                            </TableCell>
                            <TableCell
                              align="left"
                              // style={{
                              //   color:
                              //     new Date(row.startDate) > new Date()
                              //       ? "blue"
                              //       : "red"
                              // }}
                            >
                              {row.startDate.substring(0, 10) +
                                " - " +
                                row.endDate.substring(0, 10)}
                            </TableCell>

                            <TableCell align="left">
                              {row.status == 0
                                ? "Open for registrations"
                                : row.status == 1
                                ? "Started"
                                : row.status == 2
                                ? "Closed"
                                : row.status == 3
                                ? "Finalized"
                                : "Default"}
                            </TableCell>

                            <TableCell align="left">
                              {row.minTeamSize} - {row.maxTeamSize}
                            </TableCell>

                            <TableCell align="left">{row.fees}</TableCell>

                            <TableCell align="left">
                              <Button
                                // color="inherit"
                                component={Link}
                                to={"/hackathon/leaderboard/" + row.id}
                                // href={"/hackathon/leaderboard/" + row.id}
                                // variant="outlined"
                                disabled={row.status == 3 ? false : true}
                                style={{
                                  color: row.status == 3 ? "#9c27b0" : ""
                                  // display: row.status == 3 ? "none" : "block"
                                }}
                              >
                                Show
                              </Button>
                              {/* <h6
                              style={{
                                display: row.status != 3 ? "none" : "block"
                              }}
                            >
                              Not yet finalized
                            </h6> */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Paper className={classes.root}>
                    <h3 style={{ color: "black", padding: "20px" }}>
                      Ongoing hackathons
                    </h3>
                  </Paper>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ textAlign: "center" }}
                >
                  <h5
                    style={{
                      color: "black",
                      display:
                        this.state.ongoingHackathon.length <= 0
                          ? "block"
                          : "none"
                    }}
                  >
                    Not ongoing hackathons
                  </h5>
                  <Paper className={classes.root}>
                    <Table
                      className={classes.table}
                      style={{
                        marginBottom: 30,
                        display:
                          this.state.ongoingHackathon.length <= 0 ? "none" : ""
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>EventName</TableCell>
                          <TableCell align="left">
                            Start Date - End Date
                          </TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">Team Size</TableCell>
                          <TableCell align="left">Fees</TableCell>
                          <TableCell align="left">Leaderboards</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.ongoingHackathon.map(row => (
                          <TableRow
                            key={row.id}
                            // style={{
                            //   display:
                            //     new Date(row.startDate) > new Date()
                            //       ? "none"
                            //       : ""
                            // }}
                          >
                            <TableCell
                              component="a"
                              href={"/hackathon_details/" + row.id}
                              style={{ color: "#9c27b0" }}
                            >
                              {row.eventName}
                            </TableCell>
                            <TableCell
                              align="left"
                              // style={{
                              //   color:
                              //     new Date(row.startDate) > new Date()
                              //       ? "blue"
                              //       : "red"
                              // }}
                            >
                              {row.startDate.substring(0, 10) +
                                " - " +
                                row.endDate.substring(0, 10)}
                            </TableCell>

                            <TableCell align="left">
                              {row.status == 0
                                ? "Open for registrations"
                                : row.status == 1
                                ? "Started"
                                : row.status == 2
                                ? "Closed"
                                : row.status == 3
                                ? "Finalized"
                                : "Default"}
                            </TableCell>

                            <TableCell align="left">
                              {row.minTeamSize} - {row.maxTeamSize}
                            </TableCell>

                            <TableCell align="left">{row.fees}</TableCell>

                            <TableCell align="left">
                              <Button
                                // color="inherit"
                                component={Link}
                                to={"/hackathon/leaderboard/" + row.id}
                                // href={"/hackathon/leaderboard/" + row.id}
                                // variant="outlined"
                                disabled={row.status == 3 ? false : true}
                                style={{
                                  color: row.status == 3 ? "#9c27b0" : ""
                                  // display: row.status == 3 ? "none" : "block"
                                }}
                              >
                                Show
                              </Button>
                              {/* <h6
                              style={{
                                display: row.status != 3 ? "none" : "block"
                              }}
                            >
                              Not yet finalized
                            </h6> */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Paper className={classes.root}>
                    <h3 style={{ color: "black", padding: "20px" }}>
                      Past hackathons
                    </h3>
                  </Paper>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ textAlign: "center" }}
                >
                  <h5
                    style={{
                      color: "black",
                      display:
                        this.state.pastHackathon.length <= 0 ? "block" : "none"
                    }}
                  >
                    Not past hackathons
                  </h5>
                  <Paper className={classes.root}>
                    <Table
                      className={classes.table}
                      style={{
                        marginBottom: 30,
                        display:
                          this.state.pastHackathon.length <= 0 ? "none" : ""
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>EventName</TableCell>
                          <TableCell align="left">
                            Start Date - End Date
                          </TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">Team Size</TableCell>
                          <TableCell align="left">Fees</TableCell>
                          <TableCell align="left">Leaderboards</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.pastHackathon.map(row => (
                          <TableRow
                            key={row.id}
                            // style={{
                            //   display:
                            //     new Date(row.startDate) > new Date()
                            //       ? "none"
                            //       : ""
                            // }}
                          >
                            <TableCell
                              component="a"
                              href={"/hackathon_details/" + row.id}
                              style={{ color: "#9c27b0" }}
                            >
                              {row.eventName}
                            </TableCell>
                            <TableCell
                              align="left"
                              // style={{
                              //   color:
                              //     new Date(row.startDate) > new Date()
                              //       ? "blue"
                              //       : "red"
                              // }}
                            >
                              {row.startDate.substring(0, 10) +
                                " - " +
                                row.endDate.substring(0, 10)}
                            </TableCell>

                            <TableCell align="left">
                              {row.status == 0
                                ? "Open for registrations"
                                : row.status == 1
                                ? "Started"
                                : row.status == 2
                                ? "Closed"
                                : row.status == 3
                                ? "Finalized"
                                : "Default"}
                            </TableCell>

                            <TableCell align="left">
                              {row.minTeamSize} - {row.maxTeamSize}
                            </TableCell>

                            <TableCell align="left">{row.fees}</TableCell>

                            <TableCell align="left">
                              <Button
                                // color="inherit"
                                component={Link}
                                to={"/hackathon/leaderboard/" + row.id}
                                // href={"/hackathon/leaderboard/" + row.id}
                                // variant="outlined"
                                disabled={row.status == 3 ? false : true}
                                style={{
                                  color: row.status == 3 ? "#9c27b0" : ""
                                  // display: row.status == 3 ? "none" : "block"
                                }}
                              >
                                Show
                              </Button>
                              {/* <h6
                              style={{
                                display: row.status != 3 ? "none" : "block"
                              }}
                            >
                              Not yet finalized
                            </h6> */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </GridItem>
                {/* </GridContainer> */}

                {/* <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  padding: "20px"
                }}
              >
                <h2 style={{ color: "black", textTransform: "uppercase" }}>
                  List of Hackathons
                </h2>
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{
                  backgroundColor: "white",
                  // width: "50px",
                  textAlign: "center",
                  display: this.state.isLoading == true ? "block" : "none"
                }}
              >
                <div>
                  <CircularProgress className={classes.progress} />
                </div>
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{
                  backgroundColor: "white",
                  display: this.state.isLoading == true ? "none" : "block"
                }}
              >
                <Paper className={classes.root}>
                  <Table className={classes.table} style={{ marginBottom: 30 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>EventName</TableCell>
                        <TableCell align="left">
                          Start Date - End Date
                        </TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Team Size</TableCell>
                        <TableCell align="left">Fees</TableCell>
                        <TableCell align="left">Leaderboards</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.hackathon.map(row => (
                        <TableRow key={row.id}>
                          <TableCell
                            component="a"
                            href={"/hackathon_details/" + row.id}
                            style={{ color: "#9c27b0" }}
                          >
                            {row.eventName}
                          </TableCell>
                          <TableCell
                            align="left"
                            // style={{
                            //   color:
                            //     new Date(row.startDate) > new Date()
                            //       ? "blue"
                            //       : "red"
                            // }}
                          >
                            {row.startDate.substring(0, 10) +
                              " - " +
                              row.endDate.substring(0, 10)}
                          </TableCell>

                          <TableCell align="left">
                            {row.status == 1
                              ? "Open"
                              : row.status == 2
                              ? "Closed"
                              : row.status == 3
                              ? "Finalized"
                              : "Default"}
                          </TableCell>

                          <TableCell align="left">
                            {row.minTeamSize} - {row.maxTeamSize}
                          </TableCell>

                          <TableCell align="left">{row.fees}</TableCell>

                          <TableCell align="left">
                            <Button
                              // color="inherit"
                              component={Link}
                              to={"/hackathon/leaderboard/" + row.id}
                              // href={"/hackathon/leaderboard/" + row.id}
                              // variant="outlined"
                              disabled={row.status == 3 ? false : true}
                              style={{
                                color: row.status == 3 ? "#9c27b0" : ""
                                // display: row.status == 3 ? "none" : "block"
                              }}
                            >
                              Show
                            </Button>
                            
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </GridItem> */}
              </GridContainer>
            </GridContainer>
          </div>
        </div>
      </div>
    );
    // }
  }
}

export default withStyles(loginPageStyle)(AllHackathonsList);
