import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Code from "@material-ui/icons/Code";
import Score from "@material-ui/icons/Score";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import Button from "components/CustomButtons/Button.jsx";
import image from "assets/img/bg7.jpg";
// core components
import { Link } from "react-router-dom";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import axios from "axios";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
const dashboardRoutes = [];
class HackathonDetails extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      hackathonId: 0,
      userId: 1,
      hackathon: {}
    };
    this.updateHackathonStatus = this.updateHackathonStatus.bind(this);
    this.finaliseStatus = this.finaliseStatus.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("Params::: ", id);
    this.setState(
      { hackathonId: id, userId: localStorage.getItem("userId") },
      () => {
        this.getMyHackathons();
      }
    );
  }

  updateHackathonStatus() {
    const status = 2;
    const authHeader = localStorage.getItem("accessToken");
    fetch(
      "http://localhost:5000/hackathon/" +
        this.state.hackathonId +
        "?status=" +
        status,
      {
        method: "PATCH",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.status != "BadRequest") {
          alert("Hackathon status changed successfully");
          var hackathon = this.state.hackathon;
          hackathon.status = status;
          this.setState({ hackathon: hackathon });
          // window.location.href =
          //   "http://localhost:3000/hackathon_details/" + json.id;
        } else alert("Request failed with error: " + json.message);
      })
      .catch(error => {
        alert("Invalid Request");
      });
  }

  finaliseStatus() {
    const status = 3;
    const authHeader = localStorage.getItem("accessToken");
    fetch(
      "http://localhost:5000/hackathon/" +
        this.state.hackathonId +
        "?status=" +
        status,
      {
        method: "PATCH",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.status != "BadRequest") {
          alert("Hackathon status changed successfully");
          var hackathon = this.state.hackathon;
          hackathon.status = status;
          this.setState({ hackathon: hackathon });
          // window.location.href =
          //   "http://localhost:3000/hackathon_details/" + json.id;
        } else alert("Request failed with error: " + json.message);
      })
      .catch(error => {
        alert("Invalid Request");
      });
  }

  getMyHackathons() {
    console.log("State:::", this.state);
    const authHeader = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:5000/hackathon/" + this.state.hackathonId, {
        headers: { Authorization: authHeader },
        params: {
          userId: this.state.userId
        }
      })
      .then(response => {
        console.log(response);
        var hackathon = {};
        hackathon.hackathonId = response.data.id;
        hackathon.hackathonName = response.data.eventName;
        hackathon.startDate = response.data.startDate.substring(0, 10);
        hackathon.endDate = response.data.endDate.substring(0, 10);
        hackathon.description = response.data.description;
        hackathon.fees = response.data.fees;
        hackathon.minTeamSize = response.data.minTeamSize;
        hackathon.maxTeamSize = response.data.maxTeamSize;
        hackathon.judges = response.data.judges;
        hackathon.sponsors = response.data.sponsors;
        hackathon.discount = response.data.discount;
        hackathon.status = response.data.status;
        hackathon.userRole = response.data.role;
        this.setState({ hackathon: hackathon });
      });
  }
  render() {
    const { classes, ...rest } = this.props;
    var comp =
      this.state.hackathon.status != 1 ? (
        <h4 color="primary" style={{ color: "black", marginTop: "5px" }}>
          Registration Closed
        </h4>
      ) : this.state.hackathon.userRole == 0 ? (
        <Button
          color="primary"
          component={Link}
          to={
            "/team_registration/" +
            this.state.hackathonId +
            "/" +
            this.state.hackathon.minTeamSize +
            "/" +
            this.state.hackathon.maxTeamSize
          }
        >
          Register
        </Button>
      ) : this.state.hackathon.userRole == 1 ? (
        <h4 color="primary" style={{ marginTop: "5px", color: "black" }}>
          You have already registered for this hackathon.
          <Button
            component={Link}
            color="primary"
            to={"/my_hackathon/" + this.state.hackathonId}
            style={{
              color: "white"
            }}
          >
            Click to see Team Details.
          </Button>
        </h4>
      ) : this.state.hackathon.userRole == 2 ? (
        <h4
          color="primary"
          style={{ marginTop: "5px", color: "black", padding: "10px" }}
        >
          You are Judging this event.
        </h4>
      ) : (
        ""
      );
    if (localStorage.getItem("role") == "Admin") {
      comp =
        this.state.hackathon.status == 1 ? (
          <div>
            <Button
              color="primary"
              component={Link}
              to={"/create_hackathon/" + this.state.hackathonId}
              style={{ margin: "10px" }}
            >
              Edit
            </Button>
            <Button
              color="primary"
              onClick={this.updateHackathonStatus}
              style={{ margin: "10px" }}
            >
              Close Hackathon
            </Button>
            <Button
              color="primary"
              onClick={this.finaliseStatus}
              style={{ margin: "10px" }}
            >
              Finalise Hackathon
            </Button>
            <Button
              color="primary"
              component={Link}
              to={"/hackathon/" + this.state.hackathonId + "/earningreport"}
              style={{ margin: "10px" }}
            >
              Earning Report
            </Button>
            <Button
              color="primary"
              component={Link}
              to={"/hackathon/paymentreport/" + this.state.hackathonId}
              style={{ margin: "10px" }}
            >
              Payment Report
            </Button>
            <Button
              color="primary"
              component={Link}
              to={"/hackathon/" + this.state.hackathonId + "/expense"}
              style={{ margin: "10px" }}
            >
              Manage Expenses
            </Button>
          </div>
        ) : this.state.hackathon.status == 2 ? (
          <div>
            <Button
              color="primary"
              component={Link}
              to={"/create_hackathon/" + this.state.hackathonId}
              style={{ margin: "10px" }}
            >
              Edit
            </Button>
            <Button
              id="finalise"
              color="primary"
              onClick={this.finaliseStatus}
              style={{ margin: "10px" }}
            >
              Finalise Hackathon
            </Button>
            <Button
              color="primary"
              component={Link}
              to={"/hackathon/" + this.state.hackathonId + "/earningreport"}
              style={{ margin: "10px" }}
            >
              Earning Report
            </Button>
            <Button
              color="primary"
              component={Link}
              to={"/hackathon/paymentreport/" + this.state.hackathonId}
              style={{ margin: "10px" }}
            >
              Payment Report
            </Button>
            <Button
              color="primary"
              component={Link}
              to={"/hackathon/" + this.state.hackathonId + "/expense"}
              style={{ margin: "10px" }}
            >
              Manage Expenses
            </Button>
          </div>
        ) : (
          <div>
            <h4
              style={{
                color: "black"
              }}
            >
              Hackathon is finalised
            </h4>
            <Button
              color="primary"
              component={Link}
              to={"/hackathon/" + this.state.hackathonId + "/earningreport"}
              style={{ margin: "10px" }}
            >
              Earning Report
            </Button>
            <Button
              color="primary"
              component={Link}
              to={"/hackathon/paymentreport/" + this.state.hackathonId}
              style={{ margin: "10px" }}
            >
              Payment Report
            </Button>
            <Button
              color="primary"
              component={Link}
              to={"/hackathon/" + this.state.hackathonId + "/expense"}
              style={{ margin: "10px" }}
            >
              Manage Expenses
            </Button>
          </div>
        );
    }

    const CustomTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
      },
      body: {
        fontSize: 14
      }
    }))(TableCell);

    return (
      <div>
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
        </div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div
            className={classes.container}
            style={{ backgroundSize: 100, paddingTop: 100 }}
          >
            <GridContainer style={{ backgroundColor: "white" }}>
              <GridItem xs={12} sm={12} md={12}>
                <InfoArea
                  title={this.state.hackathon.hackathonName}
                  description={this.state.hackathon.description}
                  icon={Code}
                  iconColor="rose"
                />
              </GridItem>

              {/* <GridItem xs={12} sm={12} md={2} />

              <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem> */}

              <GridItem xs={12} sm={12} md={12}>
                <Table className={classes.table} style={{ marginBottom: 30 }}>
                  <TableBody>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Start Date</CustomTableCell>
                      <CustomTableCell>
                        {this.state.hackathon.startDate}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>End Date</CustomTableCell>
                      <CustomTableCell>
                        {this.state.hackathon.endDate}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Min Team Size</CustomTableCell>
                      <CustomTableCell>
                        {this.state.hackathon.minTeamSize}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Max Team Size</CustomTableCell>
                      <CustomTableCell>
                        {this.state.hackathon.maxTeamSize}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Fees</CustomTableCell>
                      <CustomTableCell>
                        {this.state.hackathon.fees}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Sponsor Discount</CustomTableCell>
                      <CustomTableCell>
                        {this.state.hackathon.discount}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Sponsors</CustomTableCell>
                      <CustomTableCell>
                        {this.state.hackathon.sponsors &&
                          this.state.hackathon.sponsors.map((sponsor, index) =>
                            // <dd  key={sponsor.id}> { sponsorsponsor.name} </dd>
                            index != this.state.hackathon.sponsors.length - 1
                              ? sponsor.name + ", "
                              : sponsor.name + ""
                          )}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Judges</CustomTableCell>
                      <CustomTableCell>
                        {this.state.hackathon.judges &&
                          this.state.hackathon.judges.map((judge, index) =>
                            // <dd key={judge.id}> {judge.name} </dd>
                            index != this.state.hackathon.judges.length - 1
                              ? judge.name + ", "
                              : judge.name + ""
                          )}
                      </CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </GridItem>
              {/* <GridContainer
                className="row"
                style={{
                  display:
                    localStorage.getItem("role") == "Admin" ? "block" : "none"
                }}
              >
                <GridItem className="col-md-3">
                  <Button
                    color="primary"
                    component={Link}
                    to={"/create_hackathon/" + this.state.hackathonId}
                    style={{
                      display:
                        this.state.hackathon.status != 3 ? "block" : "none",
                      width: "100px"
                    }}
                  >
                    Edit
                  </Button>
                </GridItem>
                <GridItem className="col-md-3">
                  <Button
                    color="primary"
                    onClick={this.updateHackathonStatus}
                    style={{
                      display:
                        this.state.hackathon.status == 1 ? "block" : "none"
                    }}
                  >
                    Close Hackathon
                  </Button>
                </GridItem>
                <GridItem className="col-md-3">
                  <Button
                    color="primary"
                    onClick={this.finaliseStatus}
                    style={{
                      display:
                        this.state.hackathon.status != 3 ? "block" : "none"
                    }}
                  >
                    Finalise Hackathon
                  </Button>
                </GridItem>
                <GridItem className="col-md-3">
                  <div>
                    <h4
                      style={{
                        color: "black",
                        display:
                          this.state.hackathon.status == 3 ? "block" : "none"
                      }}
                    >
                      Hackathon is finalised
                    </h4>
                  </div>
                </GridItem>
              </GridContainer> */}

              <div className="row" xs={12} sm={12} md={12}>
                <div>{comp}</div>
              </div>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(HackathonDetails);
