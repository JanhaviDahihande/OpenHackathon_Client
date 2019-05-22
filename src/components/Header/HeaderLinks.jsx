/*eslint-disable*/
import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  const signup = (
    <ListItem className={classes.listItem}>
      <Button href="/register" color="transparent" className={classes.navLink}>
        Sign Up
      </Button>
    </ListItem>
  );
  const signin = (
    <ListItem className={classes.listItem}>
      <Button href="/login" color="transparent" className={classes.navLink}>
        Sign In
      </Button>
    </ListItem>
  );

  const welcome = (
    <ListItem className={classes.listItem}>
      <Button href="/profile" color="transparent" className={classes.navLink}>
        Welcome {localStorage.getItem("username")}
      </Button>
    </ListItem>
  );

  const signout = (
    <ListItem className={classes.listItem}>
      <Button
        onClick={() => {
          localStorage.clear();
        }}
        href="l/logout"
        color="transparent"
        className={classes.navLink}
      >
        Sign Out
      </Button>
    </ListItem>
  );

  return (
    <List className={classes.list}>
      <ListItem
        className={classes.listItem}
        style={{
          display: localStorage.getItem("userId") != null ? "block" : "none"
        }}
      >
        <Button href="/index" color="transparent" className={classes.navLink}>
          All Actions
        </Button>
      </ListItem>

      <ListItem
        className={classes.listItem}
        style={{
          display: localStorage.getItem("userId") != null ? "block" : "none"
        }}
      >
        <Button
          href="/all_hackathons"
          color="transparent"
          className={classes.navLink}
        >
          All Hackathons
        </Button>
      </ListItem>
      <ListItem
        className={classes.listItem}
        style={{
          display:
            (localStorage.getItem("userId") != null) &
            (localStorage.getItem("role") != "Admin")
              ? "block"
              : "none"
        }}
      >
        <Button
          href="/my_hackathonlist"
          color="transparent"
          className={classes.navLink}
        >
          My Hackathons
        </Button>
      </ListItem>

      <ListItem
        className={classes.listItem}
        style={{
          display:
            (localStorage.getItem("userId") != null) &
            (localStorage.getItem("role") == "Admin")
              ? "block"
              : "none"
        }}
      >
        <Button
          href="/create_hackathon"
          color="transparent"
          className={classes.navLink}
        >
          Create Hackathon
        </Button>
      </ListItem>
      <ListItem
        className={classes.listItem}
        style={{
          display: localStorage.getItem("userId") != null ? "block" : "none"
        }}
      >
        <Button
          href="/user_organization"
          color="transparent"
          className={classes.navLink}
        >
          My Organizations
        </Button>
      </ListItem>
      {localStorage.getItem("userId") != null ? welcome : signup}
      {localStorage.getItem("userId") != null ? signout : signin}
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
