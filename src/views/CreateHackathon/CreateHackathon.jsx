import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import TextField from "@material-ui/core/TextField";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

import { GoogleLogin } from "react-google-login";
import ChipInput from "material-ui-chip-input";
import AutoComplete from "material-ui/AutoComplete";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
const dashboardRoutes = [];

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
class CreateHackathon extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      sponsors: [],
      sponsors_list: [],
      eventName:'',
      startDate:'',
      endDate:'',
      description:'',
      fees:0,
      judges:[],
      judges_list:[],
      minTeamSize: 0,
      maxTeamSize:0,
      discount: 0,
      hackathon_id: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.postHackathon = this.postHackathon.bind(this);
    this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("Params::: ", id);
    if(id){
    this.setState(
      { hackathon_id: 1 }
    );
    }
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );

    try {
      var url = 'http://localhost:5000/organization';
      fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log("json", json);
          var sponsors = [];
          for(var i=0;i<json.length;i++){
            sponsors.push({name: json[i].name, id: json[i].id});
          }
          console.log(sponsors);
          
          this.setState({sponsors_list: sponsors})
        });
    } catch (error) {}

    try {
      var url = 'http://localhost:5000/user/list';
      fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log("json", json);
          var judges = [];
          for(var i=0;i<json.length;i++){
            judges.push({firstname: json[i].firstname==null?"":json[i].firstname,
            lastname: json[i].lastname==null?"":json[i].lastname, id: json[i].id});
          }
          console.log(judges);
          
          this.setState({judges_list: judges}, () => {console.log(this.state.judges_list)})
        });
    } catch (error) {}

  }

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log([event.target.id]);
    this.setState({
      [event.target.id]: value,
    }, ()=>{console.log(this.state.judges)});
  };

  postHackathon = event =>{
    console.log(this.state.discount + "_" + this.state.startDate + "_" + this.state.endDate);
    fetch("http://localhost:5000/hackathon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName: this.state.eventName,
        description: this.state.description,
        fees: this.state.fees,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        minTeamSize: this.state.minTeamSize,
        maxTeamSize: this.state.maxTeamSize,
        sponsors: this.state.sponsors,
        judges: this.state.judges
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
      });
  }

  render() {
    const { classes, ...rest } = this.props;

    var comp = this.state.hackathon_id == 0 ? (<CardFooter className={classes.cardFooter}>
      <Button
        simple
        color="primary"
        size="lg"
        onClick={this.postHackathon}
      >
        Create
      </Button>
    </CardFooter>
    ) : this.state.hackathon_id == 1 ? (
      <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={this.postHackathon}
                      >
                        Update
                      </Button>
                    </CardFooter>
    ): (
      ""
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
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container} style={{ paddingTop: 100 }}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h2>Create Hackathon</h2>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardBody>
                      <CustomInput
                        labelText="Hackathon Name"
                        id="eventName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          type: "text"
                        }}
                      />
                      <CustomInput
                        labelText="Description"
                        id="description"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          type: "text"
                        }}
                      />
                     <Select
                        multiple
                        native
                        // value={this.state.sponsors_list}
                        onChange={this.handleChangeMultiple}
                        inputProps={{
                          id: 'judges',
                        }}
                      >
                        {this.state.judges_list.map(judge => (
                          <option key={judge.id} value={judge.id}>
                            {judge.firstname + " " + judge.lastname}
                          </option>
                        ))}
                      </Select>
                      <Select
                        multiple
                        native
                        // value={this.state.sponsors_list}
                        onChange={this.handleChangeMultiple}
                        inputProps={{
                          id: 'sponsors',
                        }}
                      >
                        {this.state.sponsors_list.map(sponsor => (
                          <option key={sponsor.id} value={sponsor.id}>
                            {sponsor.name}
                          </option>
                        ))}
                      </Select>
                      <br />
                      <TextField
                        id="fees"
                        label="Fees"
                        type="number"
                        className={classes.textField}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="discount"
                        label="Discount %"
                        type="number"
                        className={classes.textField}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                      <br />
                      <TextField
                        id="startDate"
                        label="Start Date"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="date"
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="endDate"
                        label="End Date"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="date"
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <br />
                      <TextField
                        id="minTeamSize"
                        label="Min Team Size"
                        type="number"
                        className={classes.textField}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        style={{ marginLeft: 10 }}
                        id="maxTeamSize"
                        label="Max Team Size"
                        type="number"
                        className={classes.textField}
                        inputProps={{
                          onChange: this.handleChange
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                    </CardBody>
                    {comp}
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(CreateHackathon);
