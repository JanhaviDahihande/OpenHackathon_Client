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
import Fab from "components/FloatingActionButton/Fab.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ProductSection from "./Sections/ProductSection.jsx";
import TicketSection from "./Sections/TicketSection.jsx";
import TeamSection from "./Sections/TeamSection.jsx";
import WorkSection from "./Sections/WorkSection.jsx";
import MenuSection from "./Sections/MenuSection.jsx";
import CarousalSection from "./Sections/CarousalSection.jsx";
import ActionsSection from "./Sections/ActionsSection.jsx";

const dashboardRoutes = [];

class LandingPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
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
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Annual Hackathon For Devs</h1>
                <h4>
                For the last 20 years the Codathon hackathon’s been the main staple for coders from across the niches and different parts of the US. This year, with more than 2500 tickets sold out already, it looks to be the biggest one!
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
          {/* <Fab/> */}
        </Parallax>
        
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            <CarousalSection/>
            <TicketSection />
            <ActionsSection/>
            <TeamSection />
            <WorkSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);