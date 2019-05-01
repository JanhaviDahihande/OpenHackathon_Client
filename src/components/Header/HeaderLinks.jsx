/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list }>
    <ListItem className={classes.listItem}>
        <Button
          href="/"
          color="transparent"
          className={classes.navLink}
        >
           About
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/index"
          color="transparent"
          className={classes.navLink}
        >
           Tickets
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/index"
          color="transparent"
          className={classes.navLink}
        >
           Actions
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/index"
          color="transparent"
          className={classes.navLink}
        >
          {/* <CloudDownload className={classes.icons} />  */}
          Team
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/index"
          color="transparent"
          className={classes.navLink}
        >
          {/* <CloudDownload className={classes.icons} />  */}
          Work with us
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="More"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            // <Link to="/" className={classes.dropdownLink}>
            //   All components
            // </Link>,
            <a
              href="/index"
              className={classes.dropdownLink}
            >
              Blog
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="http://localhost:3000/register"
          color="transparent"
          className={classes.navLink}
        >
           Sign Up
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="http://localhost:3000/login"
          color="transparent"
          className={classes.navLink}
        >
           Sign In
        </Button>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
        </ListItem> */}
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
