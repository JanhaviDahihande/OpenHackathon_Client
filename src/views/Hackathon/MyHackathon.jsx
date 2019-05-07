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

import axios from "axios";
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
        score: 0,
        submissionURL: null,
        teamLeadId: null
      }
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
      .get(
        "http://localhost:5000/participant/" +
          this.state.userId +
          "/hackathon/" +
          this.state.hackathonId
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
        hackathon.score = response.data.score;
        hackathon.submissionURL = response.data.submissionURL;
        hackathon.teamLeadId = response.data.teamLeadId;
        this.setState({ hackathon: hackathon });
      });
  }
  render() {
    const { classes, ...rest } = this.props;
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
                  description="Not getting from backend"
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
                          <TableCell align="left">{0}</TableCell>
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

export default withStyles(loginPageStyle)(MyHackathon);
