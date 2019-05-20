import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import axios from "axios";
import Chart from "react-google-charts";
class HackathonRevenueChart extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      userId: 1,
      hackRevenueData: [],
      options: {
        title: "Hackathon-wise Revenue",
        titleTextStyle: {
          color: "black",
          fontSize: 15
        },
        vAxis: { baseline: 0 },
        pointSize: 5,
        legend: { position: "none" },
        hAxis: { title: "Hackathon" },
        vAxis: { title: "Revenue" },
        fontSize: 12
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ userId: localStorage.getItem("userId") }, () => {
      this.updateRevenueChart();
    });
  }

  updateRevenueChart() {
    const authHeader = localStorage.getItem("accessToken");
    axios
      .get(
        "http://openhackathon.us-east-1.elasticbeanstalk.com/dashboard/hackathonRevenue",
        {
          headers: { Authorization: authHeader },
          params: {
            userId: this.state.userId
          }
        }
      )
      .then(response => {
        var result = [];
        response.data.reduce(function(res, value) {
          if (!res[value.id]) {
            res[value.id] = {
              id: value.id,
              eventName: value.eventName,
              amount: 0
            };
            result.push(res[value.id]);
          }
          res[value.id].amount += value.amount;
          return res;
        }, {});

        var data = [];
        data.push(["Hackathons", "Revenue", { role: "style" }]);
        for (var i = 0; i < result.length; ++i) {
          var row = [];
          row.push(result[i].eventName);
          row.push(result[i].amount);
          if (result[i][1] < 500) {
            row.push("red");
          } else {
            row.push("blue");
          }
          data.push(row);
        }
        this.setState({ hackRevenueData: data });
      });
  }

  handleChange(evt) {
    // var user = this.state.changedProfile;
    // user[evt.target.id] = evt.target.value;
    // this.setState({ changedProfile: user });
  }

  render() {
    const { classes, ...rest } = this.props;

    return (
      <Chart
        width={"100%"}
        height={"100%"}
        chartType="AreaChart"
        data={this.state.hackRevenueData}
        options={this.state.options}
      />
    );
  }
}

export default withStyles(loginPageStyle)(HackathonRevenueChart);
