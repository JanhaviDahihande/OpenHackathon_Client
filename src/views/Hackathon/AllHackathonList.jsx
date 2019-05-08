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
class AllHackathonsList extends React.Component {
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
    axios.get("http://localhost:5000/hackathon").then(response => {
      console.log(response);
      var hackathon = [];
      for (let i = 0; i < response.data.length; i++) {
        hackathon.push({
          id: response.data[i].id,
          eventName: response.data[i].eventName,
          description: response.data[i].description,
          startDate: response.data[i].startDate,
          endDate: response.data[i].endDate,
          minTeamSize: response.data[i].minTeamSize,
          maxTeamSize: response.data[i].maxTeamSize,
          fees: response.data[i].fees
        });
      }
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
              <GridItem xs={12} sm={12} md={12}>
                <h2 style={{ color: "black" }}>Hackathons</h2>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <Paper className={classes.root}>
                  <Table className={classes.table} style={{ marginBottom: 30 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>EventName</TableCell>
                        <TableCell align="left">Start Date</TableCell>
                        <TableCell align="left">End Date</TableCell>
                        <TableCell align="left">Team Size</TableCell>
                        <TableCell align="left">Fees</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.hackathon.map(row => (
                        <TableRow key={row.id}>
                          <TableCell
                            component="a"
                            href={"/hackathon_details/" + row.id}
                          >
                            {row.eventName}
                          </TableCell>
                          <TableCell align="left">
                            {row.startDate.substring(0, 10)}
                          </TableCell>

                          <TableCell align="left">
                            {row.endDate.substring(0, 10)}
                          </TableCell>

                          <TableCell align="left">
                            {row.minTeamSize} - {row.maxTeamSize}
                          </TableCell>

                          <TableCell align="left">{row.fees}</TableCell>
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

export default withStyles(loginPageStyle)(AllHackathonsList);
