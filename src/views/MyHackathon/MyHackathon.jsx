import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Code from "@material-ui/icons/Code";
import Score from "@material-ui/icons/Score";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

import { GoogleLogin } from "react-google-login";
// @material-ui/icons
import Group from "@material-ui/icons/Group";
import Assessment from "@material-ui/icons/Assessment";

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
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
    this.getMyHackathons();
  }

  getMyHackathons() {
    axios
      .get("http://localhost:5000/participant/1/hackathon/1")
      .then(response => {
        console.log(response);
        var hackathon = {};
        hackathon.hackathonId = response.data.hackathonId;
        hackathon.hackathonName = response.data.hackathonName;
        hackathon.teamId = response.data.teamId;
        hackathon.teamName = response.data.teamName;
        hackathon.participants = response.data.participants;
        // for (var i = 0; i < response.data.participants; i++) {
        //   hackathon.participants.push(response.data.participants[i]);
        // }
        hackathon.paymentDone = response.data.paymentDone;
        hackathon.score = response.data.score;
        hackathon.submissionURL = response.data.submissionURL;
        hackathon.teamLeadId = response.data.teamLeadId;
        this.setState({ hackathon: hackathon });
      });
  }
  render() {
    const styles = theme => ({
      root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
      },
      table: {
        minWidth: 700
      }
    });

    let id = 0;
    function createData(name, role, payment_status, amount) {
      id += 1;
      return { id, name, role, payment_status, amount };
    }

    var rows = [
      createData("A", "BackEnd Engineer", "Done", "$240"),
      createData("B", "FE Engineer", "Done", "$240"),
      createData("C", "DB Engineer", "Pending", "$240"),
      createData("D", "Designer", "Done", "$240")
    ];
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
              {/* <GridItem >
                  <input type="search" 
                style={{marginTop: 10,  width: 500, height: 50}}
                ></input>
                </GridItem> */}
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
