import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import LooksOne from "@material-ui/icons/LooksOne";
import LooksTwo from "@material-ui/icons/LooksTwo";
import Looks3 from "@material-ui/icons/Looks3";
import Looks4 from "@material-ui/icons/Looks4";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import { Button } from "@material-ui/core";
import modalStyle from "assets/jss/material-kit-react/modalStyle.jsx";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
class TicketSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Tickets</h2>
            <h5 className={classes.description}>
              This is the paragraph where you can write more details about your
              product. Keep you user engaged by providing meaningful
              information. Remember that by this time, the user is curious,
              otherwise he wouldn't scroll to get here. Add a button if you want
              the user to see more.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <InfoArea
                title="1 Day"
                description="$100"
                icon={LooksOne}
                iconColor="info"
                vertical
              />
               <Button
                  color="danger"
                  size="lg"
                  href=""
                  rel="noopener noreferrer"
                  onClick={() => this.handleClickOpen("modal")}>
                 
                  Select
                </Button>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={this.state.modal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => this.handleClose("modal")}
                  aria-labelledby="modal-slide-title"
                  aria-describedby="modal-slide-description">
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}>
                    
                    <h4 className={classes.modalTitle}>Confirm booking?</h4>
                  </DialogTitle>
                  <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}>
                  </DialogContent>
                  <DialogActions
                    className={classes.modalFooter +" " +classes.modalFooterCenter}>
                    <Button
                      onClick={() => this.handleClose("modal")}
                    >
                      Never Mind
                    </Button>
                    <Button
                      onClick={() => this.handleClose("modal")}
                      color="successNoBackground">
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <InfoArea
                title="2 Days"
                description="$200"
                icon={LooksTwo}
                iconColor="info"
                vertical
              />
               <Button
                  color="danger"
                  size="lg"
                  href=""
                  rel="noopener noreferrer"
                  onClick={() => this.handleClickOpen("modal")}
                >
                 
                  Select
                </Button>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={this.state.modal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => this.handleClose("modal")}
                  aria-labelledby="modal-slide-title"
                  aria-describedby="modal-slide-description">
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}>
                    
                    <h4 className={classes.modalTitle}>Confirm booking?</h4>
                  </DialogTitle>
                  <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}>
                  </DialogContent>
                  <DialogActions
                    className={classes.modalFooter +" " +classes.modalFooterCenter}>
                    <Button
                      onClick={() => this.handleClose("modal")}
                    >
                      Never Mind
                    </Button>
                    <Button
                      onClick={() => this.handleClose("modal")}
                      color="successNoBackground">
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <InfoArea
                title="3 Days"
                description="$300"
                icon={Looks3}
                iconColor="info"
                vertical
              />
               <Button
                  color="danger"
                  size="lg"
                  href=""
                  rel="noopener noreferrer"
                  onClick={() => this.handleClickOpen("modal")}
                >
                 
                  Select
                </Button>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={this.state.modal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => this.handleClose("modal")}
                  aria-labelledby="modal-slide-title"
                  aria-describedby="modal-slide-description">
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}>
                    
                    <h4 className={classes.modalTitle}>Confirm booking?</h4>
                  </DialogTitle>
                  <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}>
                  </DialogContent>
                  <DialogActions
                    className={classes.modalFooter +" " +classes.modalFooterCenter}>
                    <Button
                      onClick={() => this.handleClose("modal")}
                    >
                      Never Mind
                    </Button>
                    <Button
                      onClick={() => this.handleClose("modal")}
                      color="successNoBackground">
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <InfoArea
                title="4 Days"
                description="$400"
                icon={Looks4}
                iconColor="info"
                vertical
              />
               <Button
                  color="danger"
                  size="lg"
                  href=""
                  rel="noopener noreferrer"
                  onClick={() => this.handleClickOpen("modal")}
                >
                 
                  Select
                </Button>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={this.state.modal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => this.handleClose("modal")}
                  aria-labelledby="modal-slide-title"
                  aria-describedby="modal-slide-description">
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}>
                    
                    <h4 className={classes.modalTitle}>Confirm booking?</h4>
                  </DialogTitle>
                  <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}>
                  </DialogContent>
                  <DialogActions
                    className={classes.modalFooter +" " +classes.modalFooterCenter}>
                    <Button
                      onClick={() => this.handleClose("modal")}
                    >
                      Never Mind
                    </Button>
                    <Button
                      onClick={() => this.handleClose("modal")}
                      color="successNoBackground">
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle,modalStyle)(TicketSection);
