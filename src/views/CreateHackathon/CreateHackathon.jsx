import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import TextField from "@material-ui/core/TextField";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

import { GoogleLogin } from "react-google-login";
import ChipInput from "material-ui-chip-input";
import AutoComplete from "material-ui/AutoComplete";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import axios from "axios";
const dashboardRoutes = [];

class CreateHackathon extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",

      sponsors_list: [],
      hackathon: {},
      changedHackathon: {
        eventName: "",
        startDate: "",
        endDate: "",
        description: "",
        fees: 0,
        judges: [],
        minTeamSize: 0,
        maxTeamSize: 0,
        discount: 0,
        sponsors: []
      },

      judges_list: [],

      hackathon_id: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.postHackathon = this.postHackathon.bind(this);
    this.updateHackathon = this.updateHackathon.bind(this);
    this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("Params::: ", id);
    if (id) {
      this.setState({ hackathon_id: id }, () => {
        this.getHackathon();
      });
    }
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
    this.getSponsors();
    this.getJudges();
  }

  getJudges() {
    try {
      var url = "http://localhost:5000/user/list";
      fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log("json", json);
          var judges = [];
          for (var i = 0; i < json.length; i++) {
            judges.push({
              firstname: json[i].firstname == null ? "" : json[i].firstname,
              lastname: json[i].lastname == null ? "" : json[i].lastname,
              id: json[i].id
            });
          }
          console.log(judges);

          this.setState({ judges_list: judges }, () => {
            console.log(this.state.judges_list);
          });
        });
    } catch (error) {}
  }
  getSponsors() {
    try {
      var url = "http://localhost:5000/organization";
      fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log("json", json);
          var sponsors = [];
          for (var i = 0; i < json.length; i++) {
            sponsors.push({ name: json[i].name, id: json[i].id });
          }
          console.log(sponsors);

          this.setState({ sponsors_list: sponsors });
        });
    } catch (error) {}
  }

  handleChange(evt) {
    var changedHackathon = this.state.changedHackathon;
    changedHackathon[evt.target.id] = evt.target.value;
    this.setState({ changedHackathon: changedHackathon });
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

  getHackathon() {
    axios
      .get("http://localhost:5000/hackathon/" + this.state.hackathon_id, {
        params: {
          userId: localStorage.getItem("userId")
        }
      })
      .then(response => {
        console.log(response);
        var hackathon = {};
        var changedHackathon = {};

        hackathon.eventName = response.data.eventName;
        hackathon.description = response.data.description;
        hackathon.fees = response.data.fees;
        hackathon.startDate = response.data.startDate.substring(0, 10);
        hackathon.endDate = response.data.endDate.substring(0, 10);
        hackathon.minTeamSize = response.data.minTeamSize;
        hackathon.maxTeamSize = response.data.maxTeamSize;
        hackathon.sponsors = response.data.sponsors;
        hackathon.judges = response.data.judges;

        changedHackathon = hackathon;
        changedHackathon.sponsors = [];
        changedHackathon.judges = [];
        for (let i = 0; i < response.data.sponsors.length; i++) {
          changedHackathon.sponsors.push(response.data.sponsors[i].id);
        }
        for (let i = 0; i < response.data.judges.length; i++) {
          changedHackathon.judges.push(response.data.judges[i].id);
        }
        this.setState({
          hackathon: hackathon,
          changedHackathon: changedHackathon
        });
      });
  }
  postHackathon() {
    fetch("http://localhost:5000/hackathon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        this.state.changedHackathon
        // eventName: this.state.eventName,
        // description: this.state.description,
        // fees: this.state.fees,
        // startDate: this.state.startDate,
        // endDate: this.state.endDate,
        // minTeamSize: this.state.minTeamSize,
        // maxTeamSize: this.state.maxTeamSize,
        // sponsors: this.state.sponsors,
        // judges: this.state.judges
      )
    })
      .then(res => res.json())
      .then(json => {
        if (json.status != "BadRequest") {
          window.location.href =
            "http://localhost:3000/hackathon_details/" + json.id;
        } else alert("Request failed with error: " + json.message);
      })
      .catch(error => {
        alert("Invalid Request");
      });
  }

  updateHackathon() {
    fetch("http://localhost:5000/hackathon/" + this.state.hackathon_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.changedHackathon)
    })
      .then(res => res.json())
      .then(json => {
        if (json.status != "BadRequest") {
          window.location.href =
            "http://localhost:3000/hackathon_details/" + json.id;
        } else alert("Request failed with error: " + json.message);
      })
      .catch(error => {
        alert("Invalid Request");
      });
  }

  render() {
    const { classes, ...rest } = this.props;
    console.log("STATE::", this.state);
    var comp =
      this.state.hackathon_id == 0 ? (
        <CardFooter className={classes.cardFooter}>
          <Button simple color="primary" size="lg" onClick={this.postHackathon}>
            Create
          </Button>
        </CardFooter>
      ) : (
        <CardFooter className={classes.cardFooter}>
          <Button
            simple
            color="primary"
            size="lg"
            onClick={this.updateHackathon}
          >
            Update
          </Button>
        </CardFooter>
      );
    var title =
      this.state.hackathon_id == 0 ? "Create Hackathon" : "Update Hackathon";
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
                <h2>{title}</h2>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardBody>
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="eventName"
                        label="Hackathon Name"
                        value={this.state.changedHackathon.eventName}
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
                        value={this.state.changedHackathon.description}
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
                      <Select
                        multiple
                        native
                        onChange={this.handleChangeMultiple}
                        inputProps={{
                          id: "judges"
                        }}
                      >
                        {this.state.judges_list.map(judge => (
                          <option key={judge.id} value={judge.id}>
                            {judge.firstname + " " + judge.lastname}
                          </option>
                        ))}
                      </Select>
                      <Select
                        multiple
                        native
                        // value={this.state.sponsors_list}
                        onChange={this.handleChangeMultiple}
                        inputProps={{
                          id: "sponsors"
                        }}
                      >
                        {this.state.sponsors_list.map(sponsor => (
                          <option key={sponsor.id} value={sponsor.id}>
                            {sponsor.name}
                          </option>
                        ))}
                      </Select>
                      <br />
                      <TextField
                        id="fees"
                        label="Fees"
                        type="number"
                        value={this.state.changedHackathon.fees}
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
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="discount"
                        label="Discount %"
                        type="number"
                        value={this.state.changedHackathon.discount}
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
                        id="startDate"
                        label="Start Date"
                        value={this.state.changedHackathon.startDate}
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
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="endDate"
                        label="End Date"
                        value={this.state.changedHackathon.endDate}
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
                      <br />
                      <TextField
                        id="minTeamSize"
                        label="Min Team Size"
                        value={this.state.changedHackathon.minTeamSize}
                        type="number"
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
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="maxTeamSize"
                        label="Max Team Size"
                        value={this.state.changedHackathon.maxTeamSize}
                        type="number"
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
                    </CardBody>
                    {comp}
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

export default withStyles(loginPageStyle)(CreateHackathon);
