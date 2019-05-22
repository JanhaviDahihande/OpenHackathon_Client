import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Code from "@material-ui/icons/Code";
import Score from "@material-ui/icons/Score";
import Edit from "@material-ui/icons/Edit";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.jsx";
const dashboardRoutes = [];
class JudgeHackathon_Teams extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      hackathonId: 0,
      userId: 1,
      authHeader: null,
      hackathon: {
        hackathonId: null,
        hackathonName: null,
        teamId: null,
        teamName: null,
        participants: [],
        paymentDone: null,
        score: 0,
        submissionURL: null,
        teamLeadId: null,
        status: 0
      },
      teams: [],
      code_url: "",
      score_toggle: true,
      isLoading: true
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("Params::: ", id);
    this.setState(
      {
        hackathonId: id,
        userId: localStorage.getItem("userId"),
        authHeader: localStorage.getItem("accessToken")
      },
      () => {
        this.getMyHackathons();
      }
    );
    this.submitCode = this.submitCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  getMyHackathons() {
    console.log("State:::", this.state);
    this.setState({ isLoading: true });
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/hackathon/" +
          this.state.hackathonId +
          "/leaderboard",
        { headers: { Authorization: this.state.authHeader } }
      )
      .then(response => {
        if (response.status != "BadRequest") {
          console.log(response);
          var teams = [];
          for (let i = 0; i < response.data.length; i++) {
            teams.push({
              id: response.data[i].teamId,
              name: response.data[i].teamName,
              score: response.data[i].teamScore,
              members: response.data[i].teamMembers
            });
          }
          this.setState({ teams: teams, isLoading: false });
        } else {
          alert(response.data.message);
          this.setState({ isLoading: false });
        }
      });
  }

  handleChange(evt) {
    var hackathon = this.state.hackathon;
    hackathon[evt.target.id] = evt.target.value;
    this.setState({ hackathon: hackathon });
  }

  submitCode(evt) {
    var judge_score = this.state.hackathon.score;
    //var url = "http://openhackathon.us-east-1.elasticbeanstalk.com/participant/" + localStorage.getItem("userId") +"/hackathon/" + this.state.hackathonId + "?judgeScore=" + judge_score;
    fetch(
      "http://openhackathon.us-east-1.elasticbeanstalk.com/participant/" +
        localStorage.getItem("userId") +
        "/hackathon/" +
        this.state.hackathonId +
        "?judgeScore=" +
        judge_score,
      { headers: { Authorization: this.state.authHeader } },
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.status != "BadRequest") {
          window.location.href = "/my_hackathonlist";
        } else alert("Request failed with error: " + json.message);
      })
      .catch(error => {
        alert("Invalid Request");
      });
  }

  handleEdit(evt) {
    this.setState({ score_toggle: false });
  }

  render() {
    const { classes, ...rest } = this.props;
    var comp =
      this.state.hackathon.status == 3 ? (
        ""
      ) : (
        <Edit style={{ color: "black" }} onClick={this.handleEdit} />
      );

    var participant_team_list = this.state.teams ? (
      <GridItem
        xs={12}
        sm={12}
        md={12}
        // style={{ display: this.state.isLoading == false ? "block" : "none" }}
      >
        <Paper className={classes.root}>
          <Table className={classes.table} style={{ marginBottom: 30 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Score</TableCell>
                <TableCell align="left">Members</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.teams.map(row => (
                <TableRow>
                  <TableCell component="a" href={"/judge_hackathon/" + row.id}>
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.score}</TableCell>
                  <TableCell align="left">{row.members}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </GridItem>
    ) : (
      <GridItem xs={12} sm={12} md={12}>
        <h4 style={{ color: "black" }}>
          Currently no teams have registered for this hackathon!
        </h4>
      </GridItem>
    );
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
          <div className={classes.container}>
            <GridContainer style={{ backgroundColor: "white" }}>
              {/* <GridItem
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
              </GridItem> */}

              <GridItem xs={4} sm={2} md={3}>
                <InfoArea
                  title={this.state.hackathon.hackathonName}
                  description="Hackathon Name"
                  icon={Code}
                  iconColor="rose"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} />

              <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <h2 style={{ color: "black" }}>Participating Teams</h2>
              </GridItem>
              {
                // this.state.teams.length > 0 ? (
                participant_team_list
                // ) : (
                //   <GridItem xs={12} sm={12} md={12}>
                //     <h4 style={{ color: "black" }}>
                //       There are no participants for this hackathon
                //     </h4>
                // </GridItem>
                // )
              }
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(JudgeHackathon_Teams);
