import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import HackathonRevenueChart from "./HackathonRevenueChart";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      userId: 1,
      hackRevenueData: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ userId: localStorage.getItem("userId") });
  }

  handleChange(evt) {
    // var user = this.state.changedProfile;
    // user[evt.target.id] = evt.target.value;
    // this.setState({ changedProfile: user });
  }

  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Header
          color="primary"
          brand="Open Hackathon"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "black"
          }}
          {...rest}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <div>
                  <HackathonRevenueChart />
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <div>
                  <HackathonRevenueChart />
                </div>
              </GridItem>
            </GridContainer>
            <hr />
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <div>
                  <HackathonRevenueChart />
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <div>
                  <HackathonRevenueChart />
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(Dashboard);
