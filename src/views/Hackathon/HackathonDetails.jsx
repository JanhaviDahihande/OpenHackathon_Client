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
        hackathon.startDate = response.data.startDate;
        hackathon.endDate = response.data.endDate;
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
    return (
      <div>
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
              <GridItem xs={4} sm={2} md={3}>
                <InfoArea
                  title={this.state.hackathon.hackathonName}
                  description={this.state.hackathon.description}
                  icon={Code}
                  iconColor="rose"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2} />
              <GridItem xs={12} sm={12} md={2}>
                <InfoArea
                  title="Start Date"
                  description={this.state.hackathon.startDate}
                  icon={Score}
                  iconColor="white"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <InfoArea
                  title="End Date"
                  description={this.state.hackathon.endDate}
                  icon={Score}
                  iconColor="white"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <InfoArea
                  title="Min Team Size"
                  description={this.state.hackathon.minTeamSize}
                  icon={Score}
                  iconColor="white"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <InfoArea
                  title="Max Team Size"
                  description={this.state.hackathon.maxTeamSize}
                  icon={Score}
                  iconColor="white"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <InfoArea
                  title="Fees"
                  description={this.state.hackathon.fees}
                  icon={Score}
                  iconColor="white"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CardBody style={{ width: "20rem" }}>{comp}</CardBody>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(HackathonDetails);
