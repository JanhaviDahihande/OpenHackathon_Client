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
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AttachMoney from "@material-ui/icons/AttachMoney";
import { cardTitle } from "assets/jss/material-kit-react.jsx";
const dashboardRoutes = [];
class FinanceReport extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      hackathon: {
        eventName: null,
        startDate: "",
        endDate: "",
        description: null,
        noOfTeams: 0,
        noOfSponsors: 0,
        totalParticipants: 0,
        hackathonFees: 0,
        totalHackathonFeesPaid: 0,
        totalHackathonFeesNotPaid: 0,
        avgFeesPaid: 0,
        revenue: 0,
        expense: 0,
        profit: 0
      },
      userId: 1,
      hackathon_id: 0
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState(
      { userId: localStorage.getItem("userId"), hackathon_id: id },
      () => {
        this.getFinancialReport();
      }
    );
  }

  getFinancialReport() {
    const authHeader = localStorage.getItem("accessToken");
    var url =
      "http://openhackathon.us-east-1.elasticbeanstalk.com/hackathon/" +
      this.state.hackathon_id +
      "/earningreport";
    axios
      .get(url, { headers: { Authorization: authHeader } })
      .then(response => {
        if (response.data.status != "BadRequest") {
          console.log(response);
          var hackathon = {};
          hackathon.eventName = response.data.eventName;
          hackathon.startDate = response.data.startDate;
          hackathon.endDate = response.data.endDate;
          hackathon.description = response.data.description;
          hackathon.noOfTeams = response.data.noOfTeams;
          hackathon.noOfSponsors = response.data.noOfSponsors;
          hackathon.totalParticipants = response.data.totalParticipants;
          hackathon.hackathonFees = response.data.hackathonFees;
          hackathon.totalHackathonFeesPaid =
            response.data.totalHackathonFeesPaid;
          hackathon.totalHackathonFeesNotPaid =
            response.data.totalHackathonFeesNotPaid;
          hackathon.avgFeesPaid = response.data.avgFeesPaid;
          hackathon.revenue = response.data.revenue;
          hackathon.expense = response.data.expense;
          hackathon.profit = response.data.profit;
          hackathon.sponsorsRevenue = response.data.sponsorAmount;
          this.setState({ hackathon: hackathon });
        } else {
          alert(response.data.message);
        }
      });
  }
  render() {
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
              <GridItem xs={12} sm={12} md={6}>
                <h2 style={{ color: "black" }}>
                  Earning Report for {this.state.hackathon.eventName}
                </h2>
                <h3 style={{ color: "black" }}>
                  Duration: {this.state.hackathon.startDate.substring(0, 10)} -{" "}
                  {this.state.hackathon.endDate.substring(0, 10)}
                </h3>
              </GridItem>
              <GridItem xs={12} sm={12} md={3} />
              <GridItem xs={4} sm={2} md={3}>
                <h1>
                  <InfoArea
                    description={this.state.hackathon.hackathonFees}
                    title="Hackathon fees"
                    icon={AttachMoney}
                    iconColor="rose"
                  />
                </h1>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem", textAlign: "center" }}>
                  <CardBody>
                    <h3 className={classes.cardTitle}>
                      <b>Teams</b>
                    </h3>
                    <h1>{this.state.hackathon.noOfTeams}</h1>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem", textAlign: "center" }}>
                  <CardBody>
                    <h3 className={classes.cardTitle}>
                      <b>Participants</b>
                    </h3>
                    <h1>{this.state.hackathon.totalParticipants}</h1>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem", textAlign: "center" }}>
                  <CardBody>
                    <h3 className={classes.cardTitle}>
                      <b>Fees paid</b>
                    </h3>
                    <h1>${this.state.hackathon.totalHackathonFeesPaid}</h1>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem", textAlign: "center" }}>
                  <CardBody>
                    <h3 className={classes.cardTitle}>
                      <b>Fees not paid</b>
                    </h3>
                    <h1>${this.state.hackathon.totalHackathonFeesNotPaid}</h1>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Card style={{ width: "20rem", textAlign: "center" }}>
                  <CardBody>
                    <h3 className={classes.cardTitle}>
                      <b>Average Fees Paid</b>
                    </h3>
                    <h1>${this.state.hackathon.avgFeesPaid.toFixed(2)}</h1>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem", textAlign: "center" }}>
                  <CardBody>
                    <h3 className={classes.cardTitle}>
                      <b>Sponsors</b>
                    </h3>
                    <h1>{this.state.hackathon.noOfSponsors}</h1>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card style={{ width: "20rem", textAlign: "center" }}>
                  <CardBody>
                    <h3 className={classes.cardTitle}>
                      <b>Sponsors Revenue</b>
                    </h3>
                    <h1>${this.state.hackathon.sponsorsRevenue}</h1>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={1} />
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem", textAlign: "center" }}>
                  <CardBody>
                    <h3 className={classes.cardTitle}>
                      <b>Total Revenue</b>
                    </h3>
                    <h1>${this.state.hackathon.revenue}</h1>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem", textAlign: "center" }}>
                  <CardBody>
                    <h3 className={classes.cardTitle}>
                      <b>Total Expenses</b>
                    </h3>
                    <h1>${this.state.hackathon.expense}</h1>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card style={{ width: "15rem", textAlign: "center" }}>
                  <CardBody>
                    <h3 className={classes.cardTitle}>
                      <b>Total Profit</b>
                    </h3>
                    <h1 style={{ color: "green" }}>
                      ${this.state.hackathon.profit}
                    </h1>
                  </CardBody>
                </Card>
              </GridItem>

              {/* <Paper className={classes.root}>
                  <Table className={classes.table} style={{ marginBottom: 30 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>EventName</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Number of Teams</TableCell>
                        <TableCell>Number of Sponsors</TableCell>
                        <TableCell>Total Participants</TableCell>
                        <TableCell>Hackathon Fees</TableCell>
                        <TableCell>Total Hackathon Fees Paid</TableCell>
                        <TableCell>Total Hackathon Fees Not Paid</TableCell>
                        <TableCell>Average Fees Paid</TableCell>
                        <TableCell>Revenue</TableCell>
                        <TableCell>Expense</TableCell>
                        <TableCell>Profit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                          <TableCell
                            //component="a"
                            //href={"/my_hackathon/" + row.id}
                          >
                            {this.state.hackathon.eventName}
                          </TableCell>
                          <TableCell align="left">{this.state.hackathon.startDate}</TableCell>
                          <TableCell align="left">{this.state.hackathon.endDate}</TableCell>
                          <TableCell align="left">{this.state.hackathon.description}</TableCell>
                          <TableCell align="left">{this.state.hackathon.noOfTeams}</TableCell>
                          <TableCell align="left">{this.state.hackathon.noOfSponsors}</TableCell>
                          <TableCell align="left">{this.state.hackathon.totalParticipants}</TableCell>
                          <TableCell align="left">{this.state.hackathon.hackathonFees}</TableCell>
                          <TableCell align="left">{this.state.hackathon.totalHackathonFeesPaid}</TableCell>
                          <TableCell align="left">{this.state.hackathon.totalHackathonFeesNotPaid}</TableCell>
                          <TableCell align="left">{this.state.hackathon.avgFeesPaid}</TableCell>
                          <TableCell align="left">{this.state.hackathon.revenue}</TableCell>
                          <TableCell align="left">{this.state.hackathon.expense}</TableCell>
                          <TableCell align="left">{this.state.hackathon.profit}</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </Paper> */}
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(FinanceReport);
