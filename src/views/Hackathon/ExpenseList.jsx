import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { Link } from "react-router-dom";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";
// core components
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
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "components/CustomButtons/Button.jsx";
const dashboardRoutes = [];
class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      hackathonId: 0,
      userId: 0,
      isLoading: false,
      expenseList: [],
      eventName: ""
    };
  }
  componentDidMount() {
    const hackathonId = this.props.match.params.id;
    this.setState(
      { hackathonId: hackathonId, userId: localStorage.getItem("userId") },
      () => {
        this.getHackathonExpenses();
      }
    );
  }

  getHackathonExpenses() {
    const authHeader = localStorage.getItem("accessToken");
    this.setState({ isLoading: true });
    const url =
      "http://localhost:5000/hackathon/" + this.state.hackathonId + "/expense";
    axios
      .get(url, {
        headers: { Authorization: authHeader }
      })
      .then(response => {
        console.log(response);
        var expenses = [];
        if (response.data.expenses) {
          for (let i = 0; i < response.data.expenses.length; i++) {
            expenses.push({
              id: response.data.expenses[i].id,
              title: response.data.expenses[i].title,
              description: response.data.expenses[i].description,
              expenseDate: response.data.expenses[i].expenseDate,
              amount: response.data.expenses[i].amount
            });
          }
        }
        this.setState({
          eventName: response.data.eventName,
          expenseList: expenses,
          isLoading: false
        });
      });
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
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
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container} style={{}}>
            <GridContainer>
              <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{
                  backgroundColor: "white"
                }}
              >
                <h2 style={{ color: "black" }}>
                  Expenses for
                  <span style={{ color: "#9c27b0", weight: 500 }}>
                    {" " + this.state.eventName}
                  </span>
                  <Button
                    style={{
                      float: "right",
                      margin: "0px 120px 0px 0px"
                    }}
                    color="primary"
                    component={Link}
                    to={
                      "/hackathon/" +
                      this.state.hackathonId +
                      "/" +
                      this.state.eventName +
                      "/addExpense/"
                    }
                  >
                    Add Expense
                  </Button>
                </h2>
              </GridItem>
              <GridItem
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
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{
                  backgroundColor: "white",
                  display: this.state.isLoading == true ? "none" : "block"
                }}
              >
                <Paper className={classes.root}>
                  <Table className={classes.table} style={{ marginBottom: 30 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Expense</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Amount</TableCell>
                        <TableCell align="left">Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.expenseList.map(row => (
                        <TableRow key={row.id}>
                          <TableCell
                          // component="a"
                          // href={"/hackathon_details/" + row.id}
                          >
                            {row.title}
                          </TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{row.amount}</TableCell>

                          <TableCell align="left">
                            {row.expenseDate.substring(0, 10)}
                          </TableCell>

                          <TableCell component="a" align="left" />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </GridItem>
            </GridContainer>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(ExpenseList);
