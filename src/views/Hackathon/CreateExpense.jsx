import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Select from "@material-ui/core/Select";
const dashboardRoutes = [];

class CreateExpense extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      expense: {
        title: "",
        description: "",
        expenseDate: "",
        amount: 0
      },
      hackathon_id: 0,
      eventName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.postExpense = this.postExpense.bind(this);
    this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    const name = this.props.match.params.name;
    console.log("Params::: ", id);
    if (id) {
      this.setState({ hackathon_id: id, eventName: name });
    }
  }

  handleChange(evt) {
    var expense = this.state.expense;
    expense[evt.target.id] = evt.target.value;
    this.setState({ expense: expense });
  }
  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log([event.target.id]);
    var changedHackathon = this.state.changedHackathon;
    changedHackathon[event.target.id] = value;
    this.setState(
      {
        changedHackathon: changedHackathon
      },
      () => {
        console.log(this.state.judges);
      }
    );
  };

  postExpense() {
    const authHeader = localStorage.getItem("accessToken");
    const url =
      "http://localhost:5000/hackathon/" + this.state.hackathon_id + "/expense";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.expense)
    })
      .then(res => res.json())
      .then(json => {
        if (json.status != "BadRequest") {
          window.location.href =
            "http://localhost:3000/hackathon/" +
            this.state.hackathon_id +
            "/expense";
        } else alert("Request failed with error: " + json.message);
      })
      .catch(error => {
        alert("Invalid Request");
      });
  }
  render() {
    const { classes, ...rest } = this.props;
    console.log("STATE::", this.state);

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
          <div className={classes.container} style={{ paddingTop: 100 }}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <Card>
                  <h2>
                    Add Expense for{" "}
                    <span style={{ color: "#9c27b0", weight: 500 }}>
                      {" " + this.state.eventName}
                    </span>
                  </h2>
                  <form className={classes.form}>
                    <CardBody>
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="title"
                        label="Expense"
                        value={this.state.expense.title}
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
                      <br />
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="description"
                        label="Description"
                        value={this.state.expense.description}
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
                      <br />
                      <TextField
                        id="amount"
                        label="Amount"
                        type="number"
                        value={this.state.expense.amount}
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

                      <br />
                      <TextField
                        id="expenseDate"
                        label="Date"
                        value={this.state.expense.expenseDate}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="date"
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </CardBody>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={this.postExpense}
                    >
                      Create
                    </Button>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(CreateExpense);
