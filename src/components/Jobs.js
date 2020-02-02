import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import JobList from "./JobList";
import Filter from "./Filter";

const jobs = [
  {
    jobName: "Software Developer",
    company: "Google",
    targetedProgram: "Software Engineering",
    location: "Waterloo",
    requiredSkills: ["C++", "Java"],
    wagePerHour: 25.0,
    jobSummary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    applicationDeadline: "02/01/2020",
    interviews: [],
    id: 123
  },
  {
    jobName: "Software Developer",
    company: "Google",
    targetedProgram: "Software Engineering",
    location: "Waterloo",
    requiredSkills: ["C++", "Java"],
    wagePerHour: 25.0,
    jobSummary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    applicationDeadline: "02/01/2020",
    interviews: [],
    id: 123
  },
  {
    jobName: "Software Developer",
    company: "Google",
    targetedProgram: "Software Engineering",
    location: "Waterloo",
    requiredSkills: ["C++", "Java"],
    wagePerHour: 25.0,
    jobSummary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    applicationDeadline: "02/01/2020",
    interviews: [],
    id: 123
  }
];

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

// function viewJob() {
//   this.props.history.push("/job");
// }

export class Jobs extends Component {
  // const classes = useStyles();
  constructor(props) {
    super(props);
    this.toggleTest = this.toggleTest.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    // this.handleWageChange = this.handleWageChange.bind(this);
    this.handleWageMaxChange = this.handleWageMaxChange.bind(this);
    this.handleWageMinChange = this.handleWageMinChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleProgramChange = this.handleProgramChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);

    this.state = {
      filters: {
        duration: 4,
        wageMax: 0,
        wageMin: 100,
        location: "",
        program: "",
        jobKeyword: ""
      },
      test: "words",
      filteredJobs: null
    };
  }

  toggleTest(event) {
    this.setState({ test: event.target.value });
  }
  handleDurationChange(event) {
    const value = event.target.value;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters, // copy all other key-value pairs of food object
        duration: value
      }
    }));
    // this.setState({ filters.duration: event.target.value });
  }
  handleWageMaxChange(event) {
    const value = event.target.value;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters, // copy all other key-value pairs of food object
        wageMax: value
      }
    }));
  }
  handleWageMinChange(event) {
    const value = event.target.value;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters, // copy all other key-value pairs of food object
        wageMin: value
      }
    }));
    // this.setState({ wageMin: event.target.value });
  }
  handleLocationChange(event) {
    const value = event.target.value;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters, // copy all other key-value pairs of food object
        location: value
      }
    }));
    // this.setState({ location: event.target.value });
  }
  handleProgramChange(event) {
    const value = event.target.value;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters, // copy all other key-value pairs of food object
        program: value
      }
    }));
    // this.setState({ program: event.target.value });
  }
  handleKeywordChange(event) {
    const value = event.target.value;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters, // copy all other key-value pairs of food object
        jobKeyword: value
      }
    }));
    // this.setState({ jobKeyword: event.target.value });
  }

  filterTable() {
    //   const filters = this.state.
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Filter
            toggleTest={this.toggleTest}
            test={this.state.test}
            filters={this.state.filters}
            // functionHandlers={this.functionHandlers}
            handleDurationChange={this.handleDurationChange}
            handleWageMaxChange={this.handleWageMaxChange}
            handleWageMinChange={this.handleWageMinChange}
            handleLocationChange={this.handleLocationChange}
            handleProgramChange={this.handleProgramChange}
            handleKeywordChange={this.handleKeywordChange}
          />
        </Grid>
        <Grid item xs={9}>
          <JobList
            jobs={this.state.filteredJobs || jobs}
            test={this.state.test}
            filters={this.state.filters}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Jobs;
