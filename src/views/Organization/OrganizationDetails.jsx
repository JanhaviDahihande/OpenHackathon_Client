import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Code from "@material-ui/icons/Code";
import Score from "@material-ui/icons/Score";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import Button from "components/CustomButtons/Button.jsx";
import image from "assets/img/bg7.jpg";
// core components
import { Link } from "react-router-dom";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import axios from "axios";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
const dashboardRoutes = [];
class OrganizationDetails extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      isLoading: false,
      cardAnimaton: "cardHidden",
      organizationId: 0,
      userId: 1,
      organization: {
        id: "ZZZ",
        name: "ZZZ",
        owner: {
          userId: "ZZZ",
          name: "ZZZ"
        },
        description: "ZZZ",
        address: {
          street: "ZZZ",
          city: "ZZZ",
          state: "ZZZ",
          zip: "ZZZ"
        },
        members: [],
        sponsoredHackathons: []
      }
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("Params::: ", id);
    this.setState(
      { organizationId: id, userId: localStorage.getItem("userId") },
      () => {
        this.getMyOrganization();
      }
    );
  }

  getMyOrganization() {
    console.log("State:::", this.state);
    const authHeader = localStorage.getItem("accessToken");
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/organization/" +
          this.state.organizationId,
        {
          params: {
            userId: this.state.userId
          },
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        if (response.status != "BadRequest") {
          console.log(response);
          var organization = {};
          organization.id = response.data.id;
          organization.name = response.data.name;
          organization.owner = response.data.owner;
          organization.description = response.data.description;
          organization.address = response.data.address;
          // organization.address.street = response.data.address.street;
          // organization.address.city = response.data.address.city;
          // organization.address.state = response.data.address.state;
          // organization.address.zip = response.data.address.zip;
          organization.members = response.data.members;
          organization.sponsoredHackathons = response.data.sponsoredHackathons;
          this.setState({ organization: organization });
        } else {
          alert(response.message);
        }
      });
  }
  render() {
    const { classes, ...rest } = this.props;
    if (localStorage.getItem("role") == "Admin")
      var comp = (
        <Button
          color="primary"
          component={Link}
          to={"/create_organization/" + this.state.organizationId}
        >
          Edit
        </Button>
      );

    const CustomTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
      },
      body: {
        fontSize: 14
      }
    }))(TableCell);

    return (
      <div>
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
        </div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div
            className={classes.container}
            style={{ backgroundSize: 100, paddingTop: 100 }}
          >
            <GridContainer style={{ backgroundColor: "white" }}>
              <GridItem xs={12} sm={12} md={12}>
                <InfoArea
                  title={this.state.organization.name}
                  description={this.state.organization.description}
                  icon={Code}
                  iconColor="rose"
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={2} />

              <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <Table className={classes.table} style={{ marginBottom: 30 }}>
                  <TableBody>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Owner</CustomTableCell>
                      <CustomTableCell>
                        {this.state.organization.owner.name}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Street</CustomTableCell>
                      <CustomTableCell>
                        {this.state.organization.address.street}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>City</CustomTableCell>
                      <CustomTableCell>
                        {this.state.organization.address.city}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>State</CustomTableCell>
                      <CustomTableCell>
                        {this.state.organization.address.state}
                      </CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <CustomTableCell>Zip</CustomTableCell>
                      <CustomTableCell>
                        {this.state.organization.zip}
                      </CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </GridItem>
              {/* <GridItem xs={12} sm={12} md={12}>
                <hr />
              </GridItem> */}

              <GridItem xs={12} sm={12} md={4}>
                {/* <CardBody style={{ width: "30rem" }}>{comp}</CardBody> */}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(OrganizationDetails);
