import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

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
import ExpenseList from "./views/Hackathon/ExpenseList";
import CreateExpense from "./views/Hackathon/CreateExpense";
import HackathonDetails from "./views/Hackathon/HackathonDetails";
import MyHackathonsList from "./views/Hackathon/MyHackathonsList";
import MyHackathon from "./views/Hackathon/MyHackathon";
import RegistrationConfirmation from "./views/RegistrationConfirmation/RegistrationConfirmation";

import ProductSection from "./views/LandingPage/Sections/ProductSection";
import CreateHackathon from "./views/CreateHackathon/CreateHackathon";
import InvitationSent from "./views/InvitationSent/InvitationSent";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PaymentConfirmation from "./views/PaymentConfirmation/PaymentConfirmation";
import TeamRegistration from "./views/TeamRegistration/TeamRegistration";
import JudgeHackathon from "./views/Hackathon/JudgeHackathon";
import JudgeHackathon_Teams from "./views/Hackathon/JudgeHackathon_Teams";
import Dashboard from "./views/Dashboard/Dashboard";
import LeaderBoard from "./views/Hackathon/Leaderboard";
import FinanceReport from "./views/Reports/FinanceReport";
var hist = createBrowserHistory();

function ProtectedRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}

function loggedIn() {
  if (
    localStorage.getItem("userId") == undefined ||
    localStorage.getItem("userId") == "" ||
    localStorage.getItem("accessToken") == undefined ||
    localStorage.getItem("accessToken") == ""
  )
    return false;
  else return true;
}

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={hist}>
      <Switch>
        <Route path="/index" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LandingPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/payment-confirmation" component={PaymentConfirmation} />
        <Route
          path="/registration-confirmation"
          component={RegistrationConfirmation}
        />

        <ProtectedRoute
          authed={loggedIn()}
          path="/profile/:id"
          component={ProfilePage}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/profile"
          component={ProfilePage}
        />

        <ProtectedRoute
          authed={loggedIn()}
          path="/all_hackathons"
          component={AllHackathonList}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/create_organization"
          component={CreateOrganization}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/team_registration/:id/:minsize/:maxsize"
          component={TeamRegistration}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/user_organization"
          component={UserOrganization}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/my_hackathonlist"
          component={MyHackathonsList}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/my_hackathon/:id"
          component={MyHackathon}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/hackathon/:id/expense"
          component={ExpenseList}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/hackathon/:id/:name/addExpense"
          component={CreateExpense}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/earningreport"
          component={FinanceReport}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/judge_hackathon/:id"
          component={JudgeHackathon}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/judge_hackathon_teams/:id"
          component={JudgeHackathon_Teams}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/hackathon_details/:id"
          component={HackathonDetails}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/hackathon/leaderboard/:id"
          component={LeaderBoard}
        />

        <ProtectedRoute
          authed={loggedIn()}
          path="/create_hackathon/:id"
          component={CreateHackathon}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/create_hackathon"
          component={CreateHackathon}
        />
        <ProtectedRoute
          authed={loggedIn()}
          path="/invitation-sent"
          component={InvitationSent}
        />

        <ProtectedRoute
          authed={loggedIn()}
          path="/about"
          component={ProductSection}
        />
        <ProtectedRoute authed={loggedIn()} path="/" component={LandingPage} />
        <ProtectedRoute
          authed={loggedIn()}
          path="/confirm/:id"
          component={ConfirmPage}
        />
      </Switch>
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
