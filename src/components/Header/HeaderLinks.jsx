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
      <Button
        href="http://localhost:3000/register"
        color="transparent"
        className={classes.navLink}
      >
        Sign Up
      </Button>
    </ListItem>
  );
  const signin = (
    <ListItem className={classes.listItem}>
      <Button
        href="http://localhost:3000/login"
        color="transparent"
        className={classes.navLink}
      >
        Sign In
      </Button>
    </ListItem>
  );

  const welcome = (
    <ListItem className={classes.listItem}>
      <Button
        href="http://localhost:3000/profile"
        color="transparent"
        className={classes.navLink}
      >
        Welcome {localStorage.getItem("username")}
      </Button>
    </ListItem>
  );

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button href="/" color="transparent" className={classes.navLink}>
          About
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button href="/index" color="transparent" className={classes.navLink}>
          Actions
        </Button>
      </ListItem>
      {localStorage.getItem("userId") != null ? welcome : signup}
      {localStorage.getItem("userId") == null ? signin : ""}
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
