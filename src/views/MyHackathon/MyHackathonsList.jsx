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
class MyHackathonsList extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      hackathon: []
    };
  }
  componentDidMount() {
    this.getMyHackathons();
  }

  getMyHackathons() {
    axios
      .get("http://localhost:5000/participant/1/hackathon")
      .then(response => {
        console.log(response);
        var hackathon = [];
        for (let i = 0; i < response.data.length; i++) {
          hackathon.push({
            id: response.data[i].id,
            eventName: response.data[i].eventName,
            description: response.data[i].description,
            startDate: response.data[i].startDate,
            endDate: response.data[i].endDate,
            role: response.data[i].role
          });
        }
        this.setState({ hackathon: hackathon });
      });
  }
  render() {
    const { classes, ...rest } = this.props;
    var participatingList = this.state.hackathon.filter(function(hack) {
      return hack.role == 1;
    });
    var judgingList = this.state.hackathon.filter(function(hack) {
      return hack.role == 2;
    });
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
              <GridItem xs={12} sm={12} md={12}>
                <h2 style={{ color: "black" }}>Hackathons</h2>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <h2 style={{ color: "black" }}>Participating</h2>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Paper className={classes.root}>
                  <Table className={classes.table} style={{ marginBottom: 30 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>EventName</TableCell>
                        <TableCell align="left">Start Date</TableCell>
                        <TableCell align="left">End Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {participatingList.map(row => (
                        <TableRow key={row.id}>
                          <TableCell
                            component="a"
                            href={"/my_hackathon/" + row.id}
                          >
                            {row.eventName}
                          </TableCell>
                          <TableCell align="left">{row.startDate}</TableCell>

                          <TableCell align="left">{row.endDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <h2 style={{ color: "black" }}>Judging</h2>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Paper className={classes.root}>
                  <Table className={classes.table} style={{ marginBottom: 30 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>EventName</TableCell>
                        <TableCell align="left">Start Date</TableCell>
                        <TableCell align="left">End Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {judgingList.map(row => (
                        <TableRow key={row.id}>
                          <TableCell
                            component="a"
                            href={"/my_hackathon/" + row.id}
                          >
                            {row.eventName}
                          </TableCell>
                          <TableCell align="left">{row.startDate}</TableCell>

                          <TableCell align="left">{row.endDate}</TableCell>
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

export default withStyles(loginPageStyle)(MyHackathonsList);
