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
import MyHackathon from "./views/MyHackathon/MyHackathonsList";
import RegistrationConfirmation from "./views/RegistrationConfirmation/RegistrationConfirmation";

import ProductSection from "./views/LandingPage/Sections/ProductSection";
import CreateHackathon from "./views/CreateHackathon/CreateHackathon";
import InvitationSent from "./views/InvitationSent/InvitationSent";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/index" component={LandingPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/create_organization" component={CreateOrganization} />
      <Route path="/user_organization" component={UserOrganization} />
      <Route path="/my_hackathon" component={MyHackathon} />
      <Route
        path="/registration-confirmation"
        component={RegistrationConfirmation}
      />
      <Route path="/create_hackathon" component={CreateHackathon} />
      <Route path="/invitation-sent" component={InvitationSent} />

      <Route path="/about" component={ProductSection} />
      <Route path="/" component={Components} />
      <Route path="/confirm/:id" component={ConfirmPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
