import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Card from "components/Card/Card.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import profile from "assets/img/faces/christian.jpg";
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Input from "@material-ui/core/Input";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      editable: 0,
      userId: 1,
      profileUserId: 1,
      profile: {},
      changedProfile: {}
    };
    this.editProfile = this.editProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.cancelUpdateProfile = this.cancelUpdateProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var profileUserId = 0;
    if (this.props.match.params.id) profileUserId = this.props.match.params.id;
    this.setState(
      { userId: localStorage.getItem("userId"), profileUserId: profileUserId },
      () => {
        this.getUserProfile();
      }
    );
  }

  cancelUpdateProfile() {
    this.setState({ editable: 0 });
  }

  editProfile() {
    this.setState({ editable: 1 });
  }

  getUserProfile() {
    const authHeader = localStorage.getItem("accessToken");
    const userId =
      this.state.profileUserId == 0
        ? this.state.userId
        : this.state.profileUserId;
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/user/" + userId,
        {
          headers: { Authorization: authHeader }
        }
      )
      .then(response => {
        var user = {};
        user.aboutMe = response.data.aboutMe;
        user.city = response.data.city;
        user.email = response.data.email;
        user.firstname = response.data.firstname;
        user.lastname = response.data.lastname;
        user.membershipStatus = response.data.membershipStatus;
        user.organizationName = response.data.organizationName;
        user.potrait_url = response.data.potraitURL;
        user.screenName = response.data.screenName;
        user.state = response.data.state;
        user.street = response.data.street;
        user.title = response.data.title;
        user.zip = response.data.zip;
        this.setState({ profile: user, changedProfile: user });
      });
  }

  updateProfile() {
    console.log("Sending:::", JSON.stringify(this.state.changedProfile));
    const authHeader = localStorage.getItem("accessToken");
    fetch(
      "http://openhackathon.us-east-1.elasticbeanstalk.com/user/" +
        this.state.userId,
      {
        method: "PUT",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.changedProfile)
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.status != "BadRequest") {
          this.setState({
            editable: 0,
            profile: this.state.changedProfile
          });
        } else {
          console.log("Error occured in update");
        }
      });
  }

  handleChange(evt) {
    var user = this.state.changedProfile;
    user[evt.target.id] = evt.target.value;
    this.setState({ changedProfile: user });
  }

  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    var comp =
      this.state.editable == 1 ? (
        <div className={classes.container} style={{ paddingTop: 10 }}>
          <GridContainer justify="center">
            <GridItem xs={4} sm={4} md={4}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader title="Primary info" />
                <form className={classes.form}>
                  <CardBody>
                    <TextField
                      xs={6}
                      sm={6}
                      md={6}
                      id="firstname"
                      label="First Name"
                      className={classes.textField}
                      value={this.state.profile.firstname}
                      inputProps={{
                        onChange: this.handleChange,
                        type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                    <br />
                    <TextField
                      xs={6}
                      sm={6}
                      md={6}
                      id="lastname"
                      label="Last Name"
                      className={classes.textField}
                      value={this.state.profile.lastname}
                      inputProps={{
                        onChange: this.handleChange
                        // type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                    <br />
                    <TextField
                      xs={6}
                      sm={6}
                      md={6}
                      id="screenName"
                      label="Screen Name"
                      className={classes.textField}
                      disabled
                      value={this.state.profile.screenName}
                      inputProps={{
                        onChange: this.handleChange,
                        type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="email"
                      label="Email"
                      disabled
                      className={classes.textField}
                      value={this.state.profile.email}
                      inputProps={{
                        onChange: this.handleChange,
                        type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                  </CardBody>
                </form>
              </Card>
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader title="Address info" />
                <form className={classes.form}>
                  <CardBody>
                    <TextField
                      id="street"
                      label="Street"
                      className={classes.textField}
                      value={this.state.profile.street}
                      inputProps={{
                        onChange: this.handleChange,
                        type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="city"
                      label="City"
                      className={classes.textField}
                      value={this.state.profile.city}
                      inputProps={{
                        onChange: this.handleChange,
                        type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="state"
                      label="State"
                      className={classes.textField}
                      value={this.state.profile.state}
                      inputProps={{
                        onChange: this.handleChange,
                        type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="zip"
                      label="Zip"
                      className={classes.textField}
                      value={this.state.profile.zip}
                      inputProps={{
                        onChange: this.handleChange,
                        type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                  </CardBody>
                </form>
              </Card>
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader title="Profile info" />
                <form className={classes.form}>
                  <CardBody>
                    <TextField
                      id="title"
                      label="Title"
                      className={classes.textField}
                      value={this.state.profile.title}
                      inputProps={{
                        onChange: this.handleChange,
                        type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="potrait_url"
                      label="Portrait URL"
                      className={classes.textField}
                      value={this.state.profile.potrait_url}
                      inputProps={{
                        onChange: this.handleChange,
                        type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="aboutMe"
                      label="About me"
                      className={classes.textField}
                      value={this.state.profile.aboutMe}
                      inputProps={{
                        onChange: this.handleChange,
                        type: "text"
                      }}
                      margin="normal"
                      fullWidth
                    />
                  </CardBody>
                  <CardFooter
                    className={classes.cardFooter}
                    style={{ paddingBottom: "5px" }}
                  />
                </form>
              </Card>
            </GridItem>
            <Button
              style={{ align: "right", left: "450px" }}
              color="primary"
              size="md"
              onClick={this.updateProfile}
            >
              Update
            </Button>
            <br />
            <Button
              color="primary"
              size="md"
              onClick={this.cancelUpdateProfile}
              style={{ left: "450px" }}
            >
              Cancel
            </Button>
          </GridContainer>
        </div>
      ) : //section 1 ends here
      this.state.editable == 0 ? (
        <GridContainer justify="center">
          <GridItem xs={4} sm={4} md={4}>
            <Card
              className={classes[this.state.cardAnimaton]}
              style={{ height: "400px", backgroundColor: "" }}
            >
              <form className={classes.form}>
                <CardHeader title="Primary info" />
                <CardBody>
                  <List className={classes.root}>
                    <ListItem>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                      <ListItemText
                        primary="Name"
                        secondary={this.state.profile.firstname}
                      />
                    </ListItem>
                    <ListItem>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                      <ListItemText
                        primary="Last name"
                        secondary={this.state.profile.lastname}
                      />
                    </ListItem>
                    <ListItem>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                      <ListItemText
                        primary="Screen name"
                        secondary={this.state.profile.screenName}
                      />
                    </ListItem>
                    <ListItem>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                      <ListItemText
                        primary="Email"
                        secondary={this.state.profile.email}
                      />
                    </ListItem>
                  </List>
                </CardBody>
              </form>
            </Card>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <Card style={{ height: "400px" }}>
              <form>
                <CardHeader title="Address info" />
                <CardBody>
                  <List>
                    <ListItem>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                      <ListItemText
                        primary="Street"
                        secondary={this.state.profile.street}
                      />
                    </ListItem>
                    <ListItem>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                      <ListItemText
                        primary="City"
                        secondary={this.state.profile.city}
                      />
                    </ListItem>
                    <ListItem>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                      <ListItemText
                        primary="State"
                        secondary={this.state.profile.state}
                      />
                    </ListItem>
                    <ListItem>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                      <ListItemText
                        primary="Zip"
                        secondary={this.state.profile.zip}
                      />
                    </ListItem>
                  </List>
                </CardBody>
              </form>
            </Card>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <Card style={{ height: "400px" }}>
              <form>
                <CardHeader
                  title="Profile info"
                  // style={{ backgroundColor: "#9c27b0" }}
                />
                <CardBody>
                  <List>
                    <ListItem>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                      <ListItemText
                        primary="Title"
                        secondary={this.state.profile.title}
                      />
                    </ListItem>
                    {/* <ListItem>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                      <ListItemText
                        primary="Organization"
                        secondary={this.state.profile.organizationName}
                      />
                    </ListItem> */}
                    <ListItem>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                      <ListItemText
                        primary="Portrait URL"
                        secondary={this.state.profile.potrait_url}
                      />
                    </ListItem>
                    <ListItem>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                      <ListItemText
                        primary="About Me"
                        secondary={this.state.profile.aboutMe}
                      />
                    </ListItem>
                  </List>
                </CardBody>
                <CardFooter className={classes.cardFooter} />
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      ) : (
        ""
      );

    var editButton =
      this.state.profileUserId == 0 ? (
        <Button
          color="primary"
          size="md"
          style={{ left: "500px" }}
          onClick={this.editProfile}
        >
          Edit
        </Button>
      ) : (
        ""
      );

    return (
      <div>
        <Header
          color="primary"
          brand="Open hackathons"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        {/* <Parallax small filter image={require("assets/img/profile-bg.jpg")} /> */}
        <Parallax small filter image={require("assets/img/bg2.jpg")} />
        <div
          className={classNames(classes.main, classes.mainRaised)}
          style={{ paddingBottom: "20px" }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={
                        !this.state.profile.potrait_url ||
                        this.state.profile.potrait_url == ""
                          ? profile
                          : this.state.profile.potrait_url
                      }
                      alt="Profile page"
                      className={imageClasses}
                    />
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            {comp}
            {this.state.editable == 0 ? editButton : ""}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(ProfilePage);
