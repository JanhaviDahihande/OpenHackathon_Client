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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MemberReport from "../Reports/MemberReport";
const dashboardRoutes = [];
class PaymentReport extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      isLoading: true,
      cardAnimaton: "cardHidden",
      paymentRecordResponse: [],
      paymentRecord: {},
      open: false
    };

    // this.handleModalOpen = this.handleModalOpen.bind(this);
    // this.handleModalClose = this.handleModalClose.bind(this);
  }
  componentDidMount() {
    this.setState(
      { userId: localStorage.getItem("userId"), isLoading: true },
      () => {
        this.getPaymentRecords();
      }
    );
    // this.getOrganizations();
  }

  handleModalOpen = paymentRecord => {
    this.setState({ open: true, paymentRecord: paymentRecord });
  };

  handleModalClose = () => {
    this.setState({ open: false });
  };

  getPaymentRecords() {
    // console.log(name);
    const authHeader = localStorage.getItem("accessToken");
    const id = this.props.match.params.id;
    var paymentRecordResponse = [];
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/hackathon/" +
          id +
          "/paymentreport",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader
          }
        }
      )
      .then(response => {
        console.log("Payment RESPONSE");
        console.log(response);

        for (let i = 0; i < response.data.length; i++) {
          paymentRecordResponse.push({
            hackathonId: response.data[i].hackathonId,
            hackathonName: response.data[i].hackathonName,
            teamId: response.data[i].teamId,
            teamName: response.data[i].teamName,
            status: response.data[i].status,
            paymentDate: response.data[i].paymentDate,
            participants: response.data[i].participants,

            // participants: [
            //   {
            //     userId: 1,
            //     name: "Vishwanath",
            //     title: "TITLE",
            //     paymentDone: true,
            //     fees: 200,
            //     paymentDate: null
            //   },
            //   {
            //     userId: 7,
            //     name: "Thor",
            //     title: "TITLE",
            //     paymentDone: true,
            //     fees: 200,
            //     paymentDate: null
            //   }
            // ],
            paymentDone: response.data[i].paymentDone,
            score: response.data[i].score,
            submissionURL: response.data[i].submissionURL,
            teamLeadId: response.data[i].teamLeadId
          });
        }
        this.setState({
          paymentRecordResponse: paymentRecordResponse,
          isLoading: false
        });
      })
      .then(response => {
        console.log(paymentRecordResponse);
      });
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
            brand="Payment Report"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: 400,
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
                <GridItem xs={12} sm={12} md={12}>
                  <h3 style={{ color: "black" }}>Payment Report</h3>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Paper className={classes.root}>
                    <Table
                      className={classes.table}
                      style={{ marginBottom: 30 }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Team Name</TableCell>
                          <TableCell>Payment status</TableCell>
                          {/* <TableCell align="left">Amount paid</TableCell> */}
                          <TableCell align="left">Payment date</TableCell>
                          <TableCell align="left">Member info</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.paymentRecordResponse.map((row, index) => (
                          <TableRow key={row.teamId}>
                            <TableCell>{row.teamName}</TableCell>
                            <TableCell>
                              {row.paymentDone === true ? "Paid" : "Not Paid"}
                            </TableCell>
                            <TableCell align="left">
                              {row.paymentDate === null
                                ? "Not Available"
                                : row.paymentDate}
                            </TableCell>

                            <TableCell align="left">
                              {/* {row.teamMembers.map((member, index) =>
                                index != row.teamMembers.length - 1
                                  ? member + ", "
                                  : member + ""
                              )} */}
                              <Button
                                color="primary"
                                style={{ width: "80%" }}
                                onClick={() => this.handleModalOpen(row)}
                              >
                                Member info
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </GridItem>
              </GridContainer>
              <div>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleModalClose}
                  aria-labelledby="form-dialog-title"
                  maxWidth="300px"
                  style={{
                    padding: "40px"
                  }}
                >
                  <DialogContent style={{ width: "990px" }}>
                    <MemberReport
                      memberList={this.state.paymentRecord.participants}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={this.handleModalClose}
                      // variant="outlined"
                      // className={classes.button}
                      color="primary"
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      );
    }
  }
}

export default withStyles(loginPageStyle)(PaymentReport);
