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
import Button from "components/CustomButtons/Button.jsx";
const dashboardRoutes = [];
class AllHackathonsList extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      hackathon: [],
      isLoading: false
    };
  }
  componentDidMount() {
    this.getMyHackathons();
  }

  getMyHackathons() {
    const authHeader = localStorage.getItem("accessToken");
    this.setState({ isLoading: true });
    axios
      .get("http://localhost:5000/hackathon", {
        headers: { Authorization: authHeader }
      })
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
            minTeamSize: response.data[i].minTeamSize,
            maxTeamSize: response.data[i].maxTeamSize,
            fees: response.data[i].fees,
            status: response.data[i].status
          });
        }
        this.setState({ hackathon: hackathon, isLoading: false });
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
              <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{
                  backgroundColor: "white"
                }}
              >
                <h2 style={{ color: "black" }}>Hackathons</h2>
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
                        <TableCell align="left">Start Date</TableCell>
                        <TableCell align="left">End Date</TableCell>
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
                          >
                            {row.eventName}
                          </TableCell>
                          <TableCell align="left">
                            {row.startDate.substring(0, 10)}
                          </TableCell>

                          <TableCell align="left">
                            {row.endDate.substring(0, 10)}
                          </TableCell>

                          <TableCell align="left">
                            {row.minTeamSize} - {row.maxTeamSize}
                          </TableCell>

                          <TableCell align="left">{row.fees}</TableCell>

                          <TableCell component="a" align="left">
                            <Button
                              color="primary"
                              component={Link}
                              to={"/hackathon/leaderboard/" + row.id}
                              disabled={row.status == 3 ? false : true}
                            >
                              Show
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

        <Footer />
      </div>
    );
    // }
  }
}

export default withStyles(loginPageStyle)(AllHackathonsList);
