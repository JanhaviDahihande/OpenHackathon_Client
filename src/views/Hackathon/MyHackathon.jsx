import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Code from "@material-ui/icons/Code";
import Score from "@material-ui/icons/Score";
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
import { Link } from "react-router-dom";

import axios from "axios";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.jsx";
const dashboardRoutes = [];
class MyHackathon extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      hackathonId: 0,
      userId: 1,
      hackathon: {
        hackathonId: null,
        hackathonName: null,
        teamId: null,
        teamName: null,
        participants: [],
        paymentDone: null,
        fees: 0,
        score: 0,
        submissionURL: null,
        teamLeadId: null
      },
      code_url: ""
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
    this.submitCode = this.submitCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getMyHackathons() {
    console.log("State:::", this.state);
    const authHeader = localStorage.getItem("accessToken");
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/participant/" +
          this.state.userId +
          "/hackathon/" +
          this.state.hackathonId,
        { headers: { Authorization: authHeader } }
      )
      .then(response => {
        console.log(response);
        var hackathon = {};
        hackathon.hackathonId = response.data.hackathonId;
        hackathon.hackathonName = response.data.hackathonName;
        hackathon.teamId = response.data.teamId;
        hackathon.teamName = response.data.teamName;
        hackathon.participants = response.data.participants;
        hackathon.paymentDone = response.data.paymentDone;
        hackathon.fees = response.data.fees;
        hackathon.score = response.data.score;
        hackathon.submissionURL = response.data.submissionURL;
        hackathon.teamLeadId = response.data.teamLeadId;
        hackathon.hackathonStatus = response.data.status;
        this.setState({
          hackathon: hackathon,
          code_url: hackathon.submissionURL
        });
      });
  }

  handleChange(evt) {
    console.log(evt.target.id + "_" + evt.target.value);
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }

  submitCode(evt) {
    if (!this.state.code_url.trim()) {
      alert("Code URL can not be empty");
      return;
    }
    var submission_url = this.state.code_url;
    var url =
      "http://openhackathon.us-east-1.elasticbeanstalk.com/participant/" +
      localStorage.getItem("userId") +
      "/hackathon/" +
      this.state.hackathonId +
      "?submission_url=" +
      submission_url;

    const authHeader = localStorage.getItem("accessToken");

    fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.status != "BadRequest") {
          window.location.href = "http://localhost:3000/my_hackathonlist";
        } else alert("Request failed with error: " + json.message);
      })
      .catch(error => {
        alert("Invalid Request");
      });
  }

  render() {
    const { classes, ...rest } = this.props;
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
                  title={this.state.hackathon.hackathonName}
                  // description="Not getting from backend"
                  icon={Code}
                  iconColor="rose"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} />
              <GridItem xs={12} sm={12} md={2}>
                <InfoArea
                  title="Score"
                  description={this.state.hackathon.score}
                  icon={Score}
                  iconColor="rose"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <h2 style={{ color: "black" }}>Team</h2>
              </GridItem>
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
                      {this.state.hackathon.participants.map(row => (
                        <TableRow key={row.userId}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="left">{row.title}</TableCell>
                          <TableCell align="left">
                            {row.paymentDone ? "Done" : "Pending"}
                          </TableCell>
                          <TableCell align="left">{row.fees}</TableCell>
                          <Button
                            color="primary"
                            component={Link}
                            to={"/profile/" + row.userId}
                          >
                            See Profile
                          </Button>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </GridItem>

              <GridItem xs={12} sm={12} md={8}>
                <h2 style={{ color: "black" }}>Code Submission</h2>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  disabled={
                    this.state.hackathon.hackathonStatus != 1 ||
                    !this.state.hackathon.paymentDone
                      ? true
                      : false
                  }
                  placeholder={
                    this.state.hackathon.hackathonStatus == 1 &&
                    !this.state.hackathon.paymentDone
                      ? "Code submission not allowed as team's payment is pending"
                      : ""
                  }
                  id="code_url"
                  label="Code URL"
                  value={this.state.code_url}
                  fullWidth={true}
                  // value={this.state.changedHackathon.description}
                  type="text"
                  className={classes.textField}
                  inputProps={{
                    onChange: this.handleChange
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  disabled={
                    this.state.hackathon.hackathonStatus != 1 ||
                    !this.state.hackathon.paymentDone
                      ? true
                      : false
                  }
                  color="primary"
                  onClick={this.submitCode}
                >
                  Submit Code
                </Button>

                <h4
                  style={{
                    color: "black",
                    display:
                      this.state.hackathon.hackathonStatus != 1
                        ? "block"
                        : "none"
                  }}
                >
                  This hackathon is closed for submissions
                </h4>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(MyHackathon);
