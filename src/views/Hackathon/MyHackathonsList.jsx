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
import { black } from "material-ui/styles/colors";
const dashboardRoutes = [];
class MyHackathonsList extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      hackathon: [],
      userId: 1
    };
  }
  componentDidMount() {
    this.setState({ userId: localStorage.getItem("userId") }, () => {
      this.getMyHackathons();
    });
  }

  getMyHackathons() {
    const authHeader = localStorage.getItem("accessToken");
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/participant/" +
          this.state.userId +
          "/hackathon",
        { headers: { Authorization: authHeader } }
      )
      .then(response => {
        console.log(response);
        var hackathon = [];
        for (let i = 0; i < response.data.length; i++) {
          hackathon.push({
            id: response.data[i].id,
            eventName: response.data[i].eventName,
            description: response.data[i].description,
            startDate: response.data[i].startDate,
            endDate: response.data[i].endDate,
            role: response.data[i].role
          });
        }
        this.setState({ hackathon: hackathon });
      });
  }
  render() {
    const { classes, ...rest } = this.props;
    var participatingList = this.state.hackathon.filter(function(hack) {
      return hack.role == 1;
    });
    var judgingList = this.state.hackathon.filter(function(hack) {
      return hack.role == 2;
    });
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
                  My Hackathons
                </h2>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Paper className={classes.root}>
                  <h3 style={{ color: "black", padding: "20px" }}>
                    Participating
                  </h3>
                </Paper>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
                <h5
                  style={{
                    color: "black",
                    display: participatingList.length <= 0 ? "block" : "none"
                  }}
                >
                  Not participated in any hackathons
                </h5>
                <Paper className={classes.root}>
                  <Table
                    className={classes.table}
                    style={{ marginBottom: 30 }}
                    style={{
                      display: participatingList.length <= 0 ? "none" : ""
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>EventName</TableCell>
                        <TableCell align="left">Start Date</TableCell>
                        <TableCell align="left">End Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {participatingList.map(row => (
                        <TableRow key={row.id}>
                          <TableCell
                            component="a"
                            href={"/my_hackathon/" + row.id}
                            style={{ color: "#9c27b0" }}
                          >
                            {row.eventName}
                          </TableCell>
                          <TableCell align="left">
                            {row.startDate.substring(0, 10)}
                          </TableCell>

                          <TableCell align="left">
                            {row.endDate.substring(0, 10)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <Paper className={classes.root}>
                  <h3 style={{ color: "black", padding: "20px" }}>Judging</h3>
                </Paper>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
                <h5
                  style={{
                    color: "black",
                    display: judgingList.length <= 0 ? "block" : "none"
                  }}
                >
                  Not Judging any hackathons
                </h5>
                <Paper className={classes.root}>
                  <Table
                    className={classes.table}
                    style={{
                      marginBottom: 30,
                      display: judgingList.length <= 0 ? "none" : ""
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>EventName</TableCell>
                        <TableCell align="left">Start Date</TableCell>
                        <TableCell align="left">End Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {judgingList.map(row => (
                        <TableRow key={row.id}>
                          <TableCell
                            component="a"
                            href={"/judge_hackathon_teams/" + row.id}
                            style={{ color: "#9c27b0" }}
                          >
                            {row.eventName}
                          </TableCell>
                          <TableCell align="left">
                            {row.startDate.substring(0, 10)}
                          </TableCell>

                          <TableCell align="left">
                            {row.endDate.substring(0, 10)}
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
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(MyHackathonsList);
