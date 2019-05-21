import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

import HackerMenu from "./HackerMenu";
import AdminMenu from "./AdminMenu";

const dashboardRoutes = [];

class LandingPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const role = localStorage.getItem("role");
    var viewType;
    var banner = "";
    if (role === "Hacker") viewType = <HackerMenu />;
    else if (role === "Admin") viewType = <AdminMenu />;
    else
      banner = (
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Annual Hackathon For Devs</h1>
                <h4>
                  For the last 20 years the Open hackathon’s been the main
                  staple for coders from across the niches and different parts
                  of the US. This year, with more than 2500 tickets sold out
                  already, it looks to be the biggest one!
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href="/register"
                  rel="noopener noreferrer"
                >
                  Register now
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      );
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
        {banner}

        <div className={classNames(classes.main)}>
          <div className={classes.container}>{viewType}</div>
        </div>
        
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
