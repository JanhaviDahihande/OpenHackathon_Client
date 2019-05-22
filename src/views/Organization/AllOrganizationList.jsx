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
import MUIDataTable from "mui-datatables";

const dashboardRoutes = [];
class AllOrganizationsList extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      isLoading: true,
      cardAnimaton: "cardHidden",
      organization: [],
      data : [],
    };

    this.joinOrganization = this.joinOrganization.bind(this);
  }
  componentDidMount() {
    this.setState(
      { userId: localStorage.getItem("userId"), isLoading: true },
      () => {
        this.getOrganizations();
      }
    );
    // this.getOrganizations();
  }

  joinOrganization(name) {
    console.log(name);
    const authHeader = localStorage.getItem("accessToken");
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/user/" +
          this.state.userId +
          "/join/" +
          name,
        {
          headers: { Authorization: authHeader }
        }
      )
      .then(response => {
        if (response.status != "BadRequest") {
          console.log(response);
          var organization = [];
          var data = [];
          for (let i = 0; i < response.data.length; i++) {
            organization.push({
              id: response.data[i].id,
              name: response.data[i].name,
              description: response.data[i].description,
              owner: response.data[i].owner,
              address: response.data[i].address
            });
            data.push([response.data[i].name, response.data[i].description, response.data[i].owner.name]);
            
          }
          this.setState({ organization: organization });
          this.setState({ data: data });
          this.props.reloadAfterJoin();
          this.props.handleModalClose();
        } else {
          alert(response.data.message);
        }
      });
  }

  getOrganizations() {
    const authHeader = localStorage.getItem("accessToken");
    var organization = [];
    var data = [];
    
    axios
      .get("http://openhackathon.us-east-1.elasticbeanstalk.com/organization", {
        headers: { Authorization: authHeader }
      })
      .then(response => {
        if (response.status != "BadRequest") {
          console.log(response);

          for (let i = 0; i < response.data.length; i++) {
            var button =  <Button
    color="primary"
    onClick={() => this.joinOrganization(response.data[i].name)}
    disabled={
      this.props.currentUserOrganization == response.data[i].name
        ? true
        : false
    }
  >
    Join
  </Button>;
            organization.push({
              id: response.data[i].id,
              name: response.data[i].name,
              description: response.data[i].description,
              owner: response.data[i].owner,
              address: response.data[i].address
            });
            data.push([response.data[i].name, response.data[i].description, response.data[i].owner.name, button]);
          }
          this.setState({ organization: organization, isLoading: false });
          this.setState({ data: data });

        } else {
          alert(response.data.message);
        }
      });
  }
  render() {
    const columns = ["Organization Name", "Description", "Owner", "Join"];
    const options = {
      filterType: "dropdown",
      responsive: "scroll"
    };

    console.log(this.state.data);
    const { classes, ...rest } = this.props;

    if (this.state.isLoading) {
      return (
        <div style={{ backgroundColor: "white", textAlign: "center" }}>
          <CircularProgress className={classes.progress} />
        </div>
      );
    } else {
      return (
        <div style={{ paddingTop: 0 }}>
          <Header
            color="primary"
            routes={dashboardRoutes}
            brand="List of Organizations"
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
            <div className={classes.container} style={{ paddingTop: 0 }}>
              <GridContainer
                style={{
                  backgroundColor: "white"
                }}
              >
                <GridItem xs={12} sm={12} md={12}>
                  {/* <h3 style={{ color: "black" }}>List of Organizations</h3> */}
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Paper className={classes.root}>
                  <MUIDataTable
        title={"List of Organizations"}
        data={this.state.data}
        columns={columns}
        options={options}
      />
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

export default withStyles(loginPageStyle)(AllOrganizationsList);
