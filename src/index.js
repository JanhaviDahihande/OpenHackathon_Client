import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.4.0";

// pages for this product
import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import RegisterPage from "views/RegisterPage/RegisterPage.jsx";
import ConfirmPage from "views/ConfirmPage/ConfirmPage.jsx";
import CreateOrganization from "views/CreateOrganization/CreateOrganization.jsx";
import UserOrganization from "views/UserOrganization/UserOrganization.jsx";
import AllHackathonList from "./views/Hackathon/AllHackathonList";
import HackathonDetails from "./views/Hackathon/HackathonDetails";
import MyHackathonsList from "./views/Hackathon/MyHackathonsList";
import MyHackathon from "./views/Hackathon/MyHackathon";
import RegistrationConfirmation from "./views/RegistrationConfirmation/RegistrationConfirmation";

import ProductSection from "./views/LandingPage/Sections/ProductSection";
import CreateHackathon from "./views/CreateHackathon/CreateHackathon";
import InvitationSent from "./views/InvitationSent/InvitationSent";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PaymentConfirmation from "./views/PaymentConfirmation/PaymentConfirmation";
import TeamRegistration from "./views/TeamRegistration/TeamRegistration";
var hist = createBrowserHistory();

ReactDOM.render(
  <MuiThemeProvider>
  <Router history={hist}>
    <Switch>
      <Route path="/index" component={LandingPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/logout" component={LandingPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/all_hackathons" component={AllHackathonList} />
      <Route path="/create_organization" component={CreateOrganization} />
      <Route path="/team_registration/:id/:minsize/:maxsize" component={TeamRegistration} />
      <Route path="/user_organization" component={UserOrganization} />
      <Route path="/my_hackathonlist" component={MyHackathonsList} />
      <Route path="/my_hackathon/:id" component={MyHackathon} />
      <Route path="/hackathon_details/:id" component={HackathonDetails} />
      <Route
        path="/registration-confirmation"
        component={RegistrationConfirmation}
      />
      <Route
        path="/payment-confirmation"
        component={PaymentConfirmation}
      />
      <Route path="/create_hackathon/:id" component={CreateHackathon} />
      <Route path="/create_hackathon" component={CreateHackathon} />
      <Route path="/invitation-sent" component={InvitationSent} />

      <Route path="/about" component={ProductSection} />
      <Route path="/" component={LandingPage} />
      <Route path="/confirm/:id" component={ConfirmPage} />
    </Switch>
  </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
