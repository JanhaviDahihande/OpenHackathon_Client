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

  getMyHackathons() {
    console.log("State:::", this.state);
    axios
      .get("http://localhost:5000/hackathon/" + this.state.hackathonId, {
        params: {
          userId: this.state.userId
        }
      })
      .then(response => {
        console.log(response);
        var hackathon = {};
        hackathon.hackathonId = response.data.hackathonId;
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
        <CardHeader color="primary" style={{ marginTop: "5px" }}>
          <span>
            <b>Registration Closed</b>
          </span>
        </CardHeader>
      ) : this.state.hackathon.userRole == 0 ? (
        <Button
          color="primary"
          component={Link}
          to={"/team_register/" + this.state.hackathonId}
        >
          Register
        </Button>
      ) : this.state.hackathon.userRole == 1 ? (
        <CardHeader color="primary" style={{ marginTop: "5px" }}>
          <span>
            <b>
              Registered Already. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a
                href={"/my_hackathon/" + this.state.hackathonId}
                style={{
                  color: "black",
                  fontSize: "15px"
                }}
              >
                Click to see Team Details.
              </a>
            </b>
          </span>
        </CardHeader>
      ) : this.state.hackathon.userRole == 2 ? (
        <CardHeader color="primary" style={{ marginTop: "5px" }}>
          <span>
            <b>You are Judging this event.</b>
          </span>
        </CardHeader>
      ) : (
        ""
      );
    if (localStorage.getItem("role") == "Admin") comp = "";

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

              <GridItem xs={12} sm={12} md={2} />

              <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem>

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
                        {this.state.hackathon.sponsors}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Judges</CustomTableCell>
                      <CustomTableCell>
                        {this.state.hackathon.judges}
                      </CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </GridItem>
              {/* <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem> */}

              <GridItem xs={12} sm={12} md={4}>
                <CardBody style={{ width: "30rem" }}>{comp}</CardBody>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(HackathonDetails);
