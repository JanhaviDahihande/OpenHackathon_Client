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
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";

const dashboardRoutes = [];
class MemberReport extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      isLoading: true,
      cardAnimaton: "cardHidden",
      memberList: []
    };
  }
  componentDidMount() {
    this.setState(
      { userId: localStorage.getItem("userId"), isLoading: true },
      () => {
        this.getMemberList();
      }
    );
    // this.getOrganizations();
  }

  getMemberList() {
    const authHeader = localStorage.getItem("accessToken");
    this.setState({ memberList: this.props.memberList, isLoading: false });
  }

  render() {
    const { classes, ...rest } = this.props;

    if (this.state.isLoading) {
      return (
        <div style={{ backgroundColor: "white", textAlign: "center" }}>
          <CircularProgress className={classes.progress} />
        </div>
      );
    } else {
      return (
        <div>
          <Header
            color="primary"
            routes={dashboardRoutes}
            brand="Member List"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: "100px",
              color: "white"
            }}
            {...rest}
          />
          <div
            className={classes.pageHeader}
            style={{
              backgroundImage: "url(" + image + ")",
              backgroundSize: "cover",
              backgroundPosition: "top center"
            }}
          >
            <div className={classes.container}>
              <GridContainer
                style={{
                  backgroundColor: "white"
                }}
              >
                {/* <GridItem xs={12} sm={12} md={12}>
                  <h3 style={{ color: "black" }}>Member List</h3>
                </GridItem> */}
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    backgroundColor: "white",
                    textAlign: "center",
                    padding: "20px"
                  }}
                >
                  <h2 style={{ color: "black", textTransform: "uppercase" }}>
                    Member List
                  </h2>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Paper className={classes.root}>
                    <Table
                      className={classes.table}
                      style={{ marginBottom: 30 }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Payment status</TableCell>
                          <TableCell align="left">Amount</TableCell>
                          <TableCell align="left">Payment date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.memberList.map((row, index) => (
                          <TableRow key={row.teamId}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              {row.paymentDone === true ? "Paid" : "Not paid"}
                            </TableCell>
                            <TableCell align="left">
                              {row.fees > null ? row.fees : "Not available"}
                            </TableCell>
                            <TableCell align="left">
                              {row.paymentDate === null
                                ? "Not available"
                                : row.paymentDate}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </GridItem>
              </GridContainer>
            </div>
          </div>
          {/*  */}
        </div>
      );
    }
  }
}

export default withStyles(loginPageStyle)(MemberReport);
