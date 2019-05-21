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
class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      isLoading: true,
      cardAnimaton: "cardHidden",
      teamList: []
    };
  }
  componentDidMount() {
    this.setState(
      { userId: localStorage.getItem("userId"), isLoading: true },
      () => {
        this.getLeaderboard();
      }
    );
    // this.getOrganizations();
  }

  getLeaderboard(name) {
    console.log(name);
    const authHeader = localStorage.getItem("accessToken");
    const id = this.props.match.params.id;
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/hackathon/" +
          id +
          "/leaderboard",
        {
          headers: { Authorization: authHeader }
        }
      )
      .then(response => {
        console.log("LEADERBOARD RESPONSE");
        console.log(response);
        var teamListResponse = [];
        for (let i = 0; i < response.data.length; i++) {
          teamListResponse.push({
            teamId: response.data[i].teamId,
            teamName: response.data[i].teamName,
            teamScore: response.data[i].teamScore,
            teamMembers: response.data[i].teamMembers
          });
        }
        this.setState({ teamList: teamListResponse, isLoading: false });
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
        <div>
          <Header
            color="primary"
            routes={dashboardRoutes}
            brand="Leaderboards"
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
              <GridContainer
                style={{
                  backgroundColor: "white"
                }}
              >
                <GridItem xs={12} sm={12} md={12}>
                  <h3 style={{ color: "black" }}>Leaderboards</h3>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Paper className={classes.root}>
                    <Table
                      className={classes.table}
                      style={{ marginBottom: 30 }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Rank</TableCell>
                          <TableCell>Team name</TableCell>
                          <TableCell align="left">Score</TableCell>
                          <TableCell align="left">Team members</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.teamList.map((row, index) => (
                          <TableRow
                            key={row.teamId}
                            style={{
                              backgroundColor: index < 3 ? "#60a917" : "white"
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.teamName}</TableCell>
                            <TableCell align="left">{row.teamScore}</TableCell>

                            <TableCell align="left">
                              {row.teamMembers.map((member, index) =>
                                index != row.teamMembers.length - 1
                                  ? member + ", "
                                  : member + ""
                              )}
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
          {/*  */}
        </div>
      );
    }
  }
}

export default withStyles(loginPageStyle)(Leaderboard);
