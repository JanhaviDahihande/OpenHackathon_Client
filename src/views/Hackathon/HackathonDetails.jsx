import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Code from "@material-ui/icons/Code";
import Computer from "@material-ui/icons/Computer";
import Score from "@material-ui/icons/Score";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import Button from "@material-ui/core/Button";
import image from "assets/img/bg7.jpg";
import Paper from "@material-ui/core/Paper";

// core components
import CircularProgress from "@material-ui/core/CircularProgress";
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
      hackathon: {},
      isLoading: true
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

  updateHackathonStatus(value) {
    const status = value;
    this.setState({ isLoading: true });
    var hackathon = this.state.hackathon;
    const authHeader = localStorage.getItem("accessToken");
    fetch(
      "http://openhackathon.us-east-1.elasticbeanstalk.com/hackathon/" +
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
          console.log(json);
          // var hackathon = this.state.hackathon;
          this.getMyHackathons();
          // hackathon.status = status;
          // this.setState({ hackathon: hackathon, isLoading: false });
          // var hackathon = {};
          // hackathon.hackathonId = json.id;
          // hackathon.hackathonName = json.eventName;
          // hackathon.startDate = json.startDate.substring(0, 10);
          // hackathon.endDate = json.endDate.substring(0, 10);
          // hackathon.description = json.description;
          // hackathon.fees = json.fees;
          // hackathon.minTeamSize = json.minTeamSize;
          // hackathon.maxTeamSize = json.maxTeamSize;
          // hackathon.judges = json.judges;
          // hackathon.sponsors = json.sponsors;
          // hackathon.discount = json.discount;
          // hackathon.status = status;
          // hackathon.userRole = json.role;
          // this.setState({ hackathon: hackathon, isLoading: false });
          alert("Hackathon status changed successfully");
          // window.location.href = "/hackathon_details/" + json.id;
        } else {
          alert("Request failed with error: " + json.message);
          this.setState({ isLoading: false });
        }
      });
  }

  finaliseStatus() {
    const status = 3;
    const authHeader = localStorage.getItem("accessToken");
    this.setState({ isLoading: true });
    fetch(
      "http://openhackathon.us-east-1.elasticbeanstalk.com/hackathon/" +
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
          // var hackathon = this.state.hackathon;
          // hackathon.status = status;
          var hackathon = {};
          hackathon.hackathonId = json.id;
          hackathon.hackathonName = json.eventName;
          hackathon.startDate = json.startDate.substring(0, 10);
          hackathon.endDate = json.endDate.substring(0, 10);
          hackathon.description = json.description;
          hackathon.fees = json.fees;
          hackathon.minTeamSize = json.minTeamSize;
          hackathon.maxTeamSize = json.maxTeamSize;
          hackathon.judges = json.judges;
          hackathon.sponsors = json.sponsors;
          hackathon.discount = json.discount;
          hackathon.status = status;
          hackathon.userRole = json.role;
          this.setState({ hackathon: hackathon, isLoading: false });
          // window.location.href =
          //   "http://openhackathon.online:3000/hackathon_details/" + json.id;
        } else alert("Request failed with error: " + json.message);
      })
      .catch(error => {
        this.setState({ isLoading: false });
        alert("Invalid Request");
      });
  }

  getMyHackathons() {
    console.log("State:::", this.state);
    const authHeader = localStorage.getItem("accessToken");
    this.setState({ isLoading: true });
    axios
      .get("http://openhackathon.us-east-1.elasticbeanstalk.com/hackathon/" + this.state.hackathonId, {
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
        this.setState({ hackathon: hackathon, isLoading: false });
      })
      .catch(() => {
        alert("Error occured while fetching hackathon details");
        this.setState({ isLoading: false });
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
          variant="contained"
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
            variant="contained"
            variant="contained"
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
              variant="contained"
              color="primary"
              component={Link}
              to={"/create_hackathon/" + this.state.hackathonId}
              style={{ margin: "10px" }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.updateHackathonStatus(2)}
              style={{ margin: "10px" }}
            >
              Close Hackathon
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.finaliseStatus}
              style={{ margin: "10px" }}
            >
              Finalise Hackathon
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/hackathon/" + this.state.hackathonId + "/earningreport"}
              style={{ margin: "10px" }}
            >
              Earning Report
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/hackathon/paymentreport/" + this.state.hackathonId}
              style={{ margin: "10px" }}
            >
              Payment Report
            </Button>
            <Button
              variant="contained"
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
              variant="contained"
              color="primary"
              component={Link}
              to={"/create_hackathon/" + this.state.hackathonId}
              style={{ margin: "10px" }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              id="finalise"
              color="primary"
              onClick={this.finaliseStatus}
              style={{ margin: "10px" }}
            >
              Finalise Hackathon
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/hackathon/" + this.state.hackathonId + "/earningreport"}
              style={{ margin: "10px" }}
            >
              Earning Report
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/hackathon/paymentreport/" + this.state.hackathonId}
              style={{ margin: "10px" }}
            >
              Payment Report
            </Button>
            <Button
              variant="contained"
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
              variant="contained"
              color="primary"
              component={Link}
              to={"/hackathon/" + this.state.hackathonId + "/earningreport"}
              style={{ margin: "10px" }}
            >
              Earning Report
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/hackathon/paymentreport/" + this.state.hackathonId}
              style={{ margin: "10px" }}
            >
              Payment Report
            </Button>
            <Button
              variant="contained"
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
                  textAlign: "center",
                  padding: "20px",
                  display: this.state.isLoading == false ? "block" : "none"
                }}
              >
                <h2 style={{ color: "black", textTransform: "uppercase" }}>
                  {this.state.hackathon.hackathonName}
                </h2>
              </GridItem>
            </GridContainer>

            <GridContainer
              style={{
                backgroundColor: "white",
                textAlign: "center",
                fontSize: "20px",
                color: "black"
              }}
            >
              <GridItem
                xs={4}
                sm={4}
                md={4}
                style={{ display: "flex", alignItems: "center" }}
              />

              <GridItem
                xs={5}
                sm={5}
                md={5}
                style={{
                  display: "flex",
                  alignItems: "center",
                  display: this.state.hackathon.userRole == 2 ? "" : "none"
                }}
              >
                <b>You are Judging this event</b>
              </GridItem>

              <GridItem
                xs={4}
                sm={4}
                md={4}
                style={{ display: "flex", alignItems: "center" }}
              />
            </GridContainer>

            <GridContainer
              style={{
                backgroundColor: "white",
                display: localStorage.getItem("role") == "Admin" ? "" : "none"
              }}
            >
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{
                  alignItems: "center"
                }}
              />
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  variant="contained"
                  component={Link}
                  to={"/create_hackathon/" + this.state.hackathonId}
                  disabled={this.state.hackathon.status == 3 ? true : false}
                  style={{
                    display: "flex",
                    width: "150px",
                    color: "white"
                  }}
                >
                  Edit
                </Button>
              </GridItem>
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  variant="contained"
                  onClick={() => this.updateHackathonStatus(1)}
                  disabled={this.state.hackathon.status != 0 ? true : false}
                  style={{
                    display: "flex",
                    width: "150px",
                    color: "white"
                  }}
                >
                  Open
                </Button>
              </GridItem>
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  variant="contained"
                  onClick={() => this.updateHackathonStatus(2)}
                  disabled={this.state.hackathon.status != 1 ? true : false}
                  style={{
                    width: "150px",
                    color: "white"
                  }}
                >
                  Close
                </Button>
              </GridItem>
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  variant="contained"
                  disabled={
                    this.state.hackathon.status == 1 ||
                    this.state.hackathon.status == 2
                      ? false
                      : true
                  }
                  onClick={this.finaliseStatus}
                  style={{
                    width: "150px",
                    color: "white"
                  }}
                >
                  Finalize
                </Button>
              </GridItem>
              {/* <GridItem xs={12} sm={12} md={2} />

              <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem> */}
            </GridContainer>

            <GridContainer
              style={{
                backgroundColor: "white"
              }}
            >
              <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  padding: "20px",
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
                  padding: 30,
                  display: this.state.isLoading == false ? "block" : "none"
                }}
              >
                <Table className={classes.table} style={{}}>
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
            </GridContainer>
            <GridContainer
              style={{
                backgroundColor: "white",
                display: this.state.hackathon.userRole == 1 ? "" : "none",
                padding: "20px"
              }}
            >
              <GridItem
                xs={6}
                sm={6}
                md={6}
                style={{ display: "flex", alignItems: "center" }}
              />
              <GridItem
                xs={4}
                sm={4}
                md={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h4
                  style={{
                    color: "black"
                  }}
                >
                  Already registered for this hackathon
                </h4>
              </GridItem>
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  variant="contained"
                  component={Link}
                  to={"/create_hackathon/" + this.state.hackathonId}
                  style={{
                    display: this.state.hackathon.status != 3 ? "flex" : "none",
                    width: "150px",
                    color: "white"
                  }}
                >
                  Team Info
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer
              style={{
                backgroundColor: "white",
                padding: "20px",
                display:
                  (this.state.hackathon.userRole == 0) &
                  (localStorage.getItem("role") != "Admin") &
                  (this.state.hackathon.status == 0)
                    ? ""
                    : "none"
              }}
            >
              <GridItem
                xs={10}
                sm={10}
                md={10}
                style={{ display: "flex", alignItems: "center" }}
              />
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  variant="contained"
                  component={Link}
                  to={"/create_hackathon/" + this.state.hackathonId}
                  style={{
                    width: "150px",
                    color: "white"
                  }}
                >
                  Register
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer
              style={{
                backgroundColor: "white",
                padding: "20px",
                display:
                  (this.state.hackathon.userRole == 0) &
                  (localStorage.getItem("role") != "Admin") &
                  (this.state.hackathon.status != 0)
                    ? ""
                    : "none"
              }}
            >
              <GridItem
                xs={9}
                sm={9}
                md={9}
                style={{ display: "flex", alignItems: "center" }}
              />
              <GridItem
                xs={3}
                sm={3}
                md={3}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h4
                  style={{
                    color: "black"
                  }}
                >
                  Registration closed!
                </h4>
              </GridItem>
            </GridContainer>

            <GridContainer
              style={{
                backgroundColor: "white",
                display: localStorage.getItem("role") == "Admin" ? "" : "none",
                padding: "10px"
              }}
            >
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{ display: "flex", alignItems: "center" }}
              />

              <GridItem
                xs={3}
                sm={3}
                md={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white"
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  variant="contained"
                  to={"/hackathon/" + this.state.hackathonId + "/expense"}
                  style={{
                    // display: this.state.hackathon.status != 3 ? "flex" : "none",
                    width: "200px",
                    color: "white"
                  }}
                >
                  Manage Expences
                </Button>
              </GridItem>
              <GridItem
                xs={3}
                sm={3}
                md={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white"
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  variant="contained"
                  to={"/hackathon/paymentreport/" + this.state.hackathonId}
                  style={{
                    // display: this.state.hackathon.status != 3 ? "flex" : "none",
                    width: "200px",
                    color: "white"
                  }}
                >
                  Payment Report
                </Button>
              </GridItem>
              <GridItem
                xs={3}
                sm={3}
                md={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white"
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  variant="contained"
                  to={"/hackathon/" + this.state.hackathonId + "/earningreport"}
                  style={{
                    // display: this.state.hackathon.status != 3 ? "flex" : "none",
                    width: "200px",
                    color: "white"
                  }}
                >
                  Earning Report
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer
              style={{
                backgroundColor: "white",
                // padding: "20px",
                display: this.state.hackathon.status == 3 ? "" : "none"
              }}
            >
              <GridItem
                xs={9}
                sm={9}
                md={9}
                style={{ display: "flex", alignItems: "center" }}
              />
              <GridItem
                xs={3}
                sm={3}
                md={3}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h3
                  style={{
                    color: "black"
                  }}
                >
                  Hackathon is Finalized!
                </h3>
              </GridItem>
            </GridContainer>
            <div className="row" xs={12} sm={12} md={12}>
              {/* <div>{comp}</div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(HackathonDetails);
