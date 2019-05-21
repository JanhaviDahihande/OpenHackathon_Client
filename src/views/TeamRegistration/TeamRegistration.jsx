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
// import { List } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
const dashboardRoutes = [];

class TeamRegistration extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      team_members: [],
      team_member: "",
      role: "",
      hackathon_id: 0,
      min_team_size: 0,
      max_team_size: 0,
      participants: [],
      team_name: ""
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    const minsize = this.props.match.params.minsize;
    const maxsize = this.props.match.params.maxsize;
    console.log("Params::: ", id);
    var selfParticipant = [
      { id: localStorage.getItem("userId"), role: "Team Lead" }
    ];
    if (id) {
      this.setState(
        {
          hackathon_id: id,
          participants: selfParticipant,
          min_team_size: minsize,
          max_team_size: maxsize
        },
        () => {
          this.getTeamMembers();
        }
      );
      setTimeout(
        function() {
          this.setState({ cardAnimaton: "" });
        }.bind(this),
        700
      );
    }
    this.addMember = this.addMember.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  getTeamMembers() {
    try {
      const authHeader = localStorage.getItem("accessToken");
      var url =
        "http://openhackathon.us-east-1.elasticbeanstalk.com/" +
        this.state.hackathon_id +
        "/users";
      fetch(url, { headers: { Authorization: authHeader } })
        .then(res => res.json())
        .then(json => {
          console.log("json", json);
          var team_members = [];
          for (var i = 0; i < json.length; i++) {
            team_members.push({
              firstname: json[i].firstname == null ? "" : json[i].firstname,
              lastname: json[i].lastname == null ? "" : json[i].lastname,
              id: json[i].id
            });
          }
          console.log(team_members);

          this.setState({ team_members: team_members }, () => {
            console.log(this.state.team_members);
          });
        });
    } catch (error) {}
  }

  handleChange(evt) {
    console.log(evt.target.id + "_" + evt.target.value);
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }

  addMember(evt) {
    var participants = this.state.participants;
    participants.push({ id: this.state.team_member, role: this.state.role });
    this.setState(
      {
        participants: participants
      },
      () => {
        console.log(this.state.participants);
      }
    );
  }

  register(evt) {
    if (this.state.team_name.trim() == "" || !this.state.team_name) {
      alert("Team name is required");
      return;
    }

    if (
      this.state.participants.length >= this.state.min_team_size &&
      this.state.participants.length <= this.state.max_team_size
    ) {
      const authHeader = localStorage.getItem("accessToken");
      var url =
        "http://openhackathon.us-east-1.elasticbeanstalk.com/participant/" +
        localStorage.getItem("userId") +
        "/hackathon/" +
        this.state.hackathon_id;
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          teamName: this.state.team_name,
          participants: this.state.participants
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.status != "BadRequest") {
            window.location.href =
              "http://openhackathon.online:3000/hackathon_details/" +
              this.state.hackathon_id;
          } else alert("Request failed with error: " + json.message);
        })
        .catch(error => {
          alert("Invalid Request");
        });
    } else {
      alert("Invalid team size");
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    // console.log("STATE::", this.state);
    let rows = this.state.participants.map(request => {
      return (
        <RequestRow
          key={request.id}
          participants={request}
          team_members={this.state.team_members}
        />
      );
    });
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
                <h2>Team Registration</h2>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardBody>
                      <TextField
                        style={{ marginLeft: 10, paddingBottom: 20 }}
                        id="team_name"
                        label="Team Name"
                        value={this.state.teamName}
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
                      <h6>Min Team Size: {this.state.min_team_size}</h6>
                      <h6>Max Team Size: {this.state.max_team_size}</h6>
                      <br />

                      <Select
                        native
                        onChange={this.handleChange}
                        inputProps={{
                          id: "team_member"
                        }}
                      >
                        <option>--Select user--</option>
                        {this.state.team_members
                          .filter(
                            user =>
                              this.state.participants
                                .map(function(p) {
                                  return parseInt(p.id);
                                })
                                .indexOf(user.id) == -1
                          )
                          .map(user => (
                            <option key={user.id} value={user.id}>
                              {user.firstname + " " + user.lastname}
                            </option>
                          ))}
                      </Select>

                      <Select
                        style={{ marginLeft: 10 }}
                        native
                        // value={this.state.sponsors_list}
                        onChange={this.handleChange}
                        inputProps={{
                          id: "role"
                        }}
                      >
                        <option>--Select role--</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Engineer">Engineer</option>
                        <option value="FullStack">FullStack</option>
                        <option value="Designer">Designer</option>
                        <option value="Other">Other</option>
                      </Select>
                      <Button
                        color="primary"
                        onClick={this.addMember}
                        style={{ left: 20 }}
                      >
                        Add
                      </Button>
                      <br />
                      <h3>Team Members</h3>
                      <hr />
                      {rows}

                      <Button
                        color="primary"
                        onClick={this.register}
                        style={{ top: 15 }}
                      >
                        Register
                      </Button>
                      {/* <List>
              <ListItem>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
                <ListItemText
                  primary={member_1}
                  // secondary={this.state.profile.aboutMe}
                />
              </ListItem>
              <ListItem>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
                <ListItemText
                  primary={role_1}
                  // secondary={this.state.profile.aboutMe}
                />
              </ListItem>
              </List> */}
                    </CardBody>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}
const RequestRow = props => {
  var team_members = props.team_members;
  var name;
  for (var i = 0; i < team_members.length; i++) {
    if (team_members[i].id == props.participants.id) {
      name = team_members[i].firstname + " " + team_members[i].lastname;
    }
  }
  return (
    <h4>
      {name} : {props.participants.role}
    </h4>
  );
};
export default withStyles(loginPageStyle)(TeamRegistration);
