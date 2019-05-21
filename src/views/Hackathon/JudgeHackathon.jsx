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
class JudgeHackathon extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      hackathonId: 0,
      userId: 1,
      team: {
        teamId: null,
        teamName: null,
        participants: [],
        paymentDone: null,
        score: 0,
        submissionURL: null,
        teamLeadId: null,
        status: 0
      },
      code_url: "",
      score_toggle: true
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("Params::: ", id);
    this.setState(
      { teamId: id, userId: localStorage.getItem("userId") },
      () => {
        this.getMyHackathons();
      }
    );
    this.updateScore = this.updateScore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  getMyHackathons() {
    console.log("State:::", this.state);
    const authHeader = localStorage.getItem("accessToken");
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/participant/" +
          this.state.userId +
          "/team/" +
          this.state.teamId,
        { headers: { Authorization: authHeader } }
      )
      .then(response => {
        console.log(response);
        var team = {};
        team.hackathonId = response.data.hackathonId;
        team.hackathonName = response.data.hackathonName;
        team.teamId = response.data.teamId;
        team.teamName = response.data.teamName;
        team.participants = response.data.participants;
        team.paymentDone = response.data.paymentDone;
        team.score = response.data.score;
        team.submissionURL = response.data.submissionURL;
        team.teamLeadId = response.data.teamLeadId;
        team.status = response.data.status;
        this.setState({ team: team });
      });
  }

  handleChange(evt) {
    var team = this.state.team;
    team[evt.target.id] = evt.target.value;
    this.setState({ team: team });
  }

  updateScore(evt) {
    var judge_score = this.state.team.score;
    const authHeader = localStorage.getItem("accessToken");
    var url =
      "http://openhackathon.us-east-1.elasticbeanstalk.com/participant/" +
      localStorage.getItem("userId") +
      "/hackathon/" +
      this.state.hackathonId +
      "?judgeScore=" +
      judge_score;
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader
      }
    })
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
      this.state.team.status != 2 ? (
        ""
      ) : (
        <Edit style={{ color: "black" }} onClick={this.handleEdit} />
      );

    var participant_list = this.state.team.participants ? (
      <GridItem xs={12} sm={12} md={12}>
        <Paper className={classes.root}>
          <Table className={classes.table} style={{ marginBottom: 30 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Payment Status</TableCell>
                <TableCell align="left">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.team.participants.map(row => (
                <TableRow key={row.userId}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">
                    {row.paymentDone ? "Done" : "Pending"}
                  </TableCell>
                  <TableCell align="left">{0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </GridItem>
    ) : (
      <GridItem xs={12} sm={12} md={12}>
        <h5 style={{ color: "black" }}>No participants</h5>
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
              <GridItem xs={4} sm={2} md={3}>
                <InfoArea
                  title={this.state.team.hackathonName}
                  // description="Not getting from backend"
                  icon={Code}
                  iconColor="rose"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} />
              <GridItem xs={12} sm={12} md={2}>
                <TextField
                  id="score"
                  label="Score"
                  value={this.state.team.score}
                  // value={this.state.changedHackathon.description}
                  className={classes.textField}
                  inputProps={{
                    onChange: this.handleChange,
                    disabled: this.state.score_toggle,
                    type: "text"
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={3} style={{ top: 30 }}>
                {comp}
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <h2 style={{ color: "black" }}>Team</h2>
              </GridItem>
              {participant_list}

              <GridItem xs={12} sm={12} md={8}>
                <h2 style={{ color: "black" }}>Code URL</h2>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  id="code_url"
                  label="Code URL"
                  fullWidth={true}
                  value={this.state.team.submissionURL}
                  type="text"
                  className={classes.textField}
                  inputProps={{
                    onChange: this.handleChange,
                    disabled: true
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" onClick={this.updateScore}>
                  Submit Score
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(JudgeHackathon);
