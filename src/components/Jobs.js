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
import * as keyword_extractor from "keyword-extractor";
import { dbRef, authRef } from "./Firebase";

const jobs = [
  {
    jobName: "Software Developer",
    company: "Google",
    targetedProgram: "Software Engineering",
    location: "Waterloo",
    requiredSkills: ["C++", "Java"],
    wagePerHour: 25.0,
    duration: 4,
    jobSummary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    applicationDeadline: "02/01/2020",
    interviews: [],
    id: 123
  },
  {
    jobName: "Computer Engineer",
    company: "Google",
    targetedProgram: " Engineering",
    location: "Waterloo",
    requiredSkills: ["RISC V", "VHDL"],
    wagePerHour: 22.0,
    duration: 8,
    jobSummary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    applicationDeadline: "02/01/2020",
    interviews: [],
    id: 123
  },
  {
    jobName: "Software Engineer",
    company: "Facebook",
    targetedProgram: "Computer Science",
    location: "California",
    requiredSkills: ["React", "Javascript"],
    wagePerHour: 40.0,
    duration: 12,
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
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);

    props.notOnLoginPage()
    this.state = {
      filters: {
        duration: 0,
        wageMax: null,
        wageMin: null,
        location: "",
        company: "",
        jobKeyword: ""
      },
      test: "words",
      filteredJobs: [],
      allJobs: []
    };
    this.filterTable();
  }

  // async componentDidMount() {
  //   const jobs = await dbRef.collection("jobs").get();
  //   this.setState({ allJobs: jobs });
  // }
  componentDidMount() {
    dbRef
      .collection("jobs")
      .get()
      .then(
        function(querySnapshot) {
          const testArray = [];
          querySnapshot.forEach(doc => {
            testArray.push(doc.data());
          });
          // console.log(testArray);
          this.setState({ allJobs: testArray });
        }.bind(this)
      );
  }

  toggleTest(event) {
    this.setState({ test: event.target.value });
  }
  handleDurationChange(event) {
    const value = event.target.value;

    this.setState(
      prevState => ({
        filters: {
          ...prevState.filters, // copy all other key-value pairs of food object
          duration: value
        }
      }),
      () => {
        this.filterTable();
      }
    );
    // this.setState({ filters.duration: event.target.value });
  }
  handleWageMaxChange(event) {
    const value = event.target.value;
    this.setState(
      prevState => ({
        filters: {
          ...prevState.filters, // copy all other key-value pairs of food object
          wageMax: value
        }
      }),
      () => {
        this.filterTable();
      }
    );
  }
  handleWageMinChange(event) {
    const value = event.target.value;

    this.setState(
      prevState => ({
        filters: {
          ...prevState.filters, // copy all other key-value pairs of food object
          wageMin: value
        }
      }),
      () => {
        this.filterTable();
      }
    );
    // this.setState({ wageMin: event.target.value });
  }
  handleLocationChange(event) {
    const value = event.target.value;
    this.setState(
      prevState => ({
        filters: {
          ...prevState.filters, // copy all other key-value pairs of food object
          location: value
        }
      }),
      () => {
        this.filterTable();
      }
    );
    // this.setState({ location: event.target.value });
  }
  handleCompanyChange(event) {
    const value = event.target.value;
    // console.log(value);
    this.setState(
      prevState => ({
        filters: {
          ...prevState.filters, // copy all other key-value pairs of food object
          company: value
        }
      }),
      () => {
        this.filterTable();
      }
    );
    // this.setState({ program: event.target.value });
  }
  handleKeywordChange(event) {
    const value = event.target.value;

    this.setState(
      prevState => ({
        filters: {
          ...prevState.filters, // copy all other key-value pairs of food object
          jobKeyword: value
        }
      }),
      () => {
        this.filterTable();
      }
    );

    // this.setState({ jobKeyword: event.target.value });
  }

  filterTable() {
    this.setState({
      filteredJobs: this.state.allJobs.filter(job => {
        // console.log(this.state.filters.company);
        this.checkCompany(job);
        return (
          !this.checkFilters(job) ||
          this.checkJobName(job) ||
          this.checkDuration(job) ||
          this.checkWage(job) ||
          this.checkCompany(job) ||
          this.checkLocation(job)
        );
      })
    });
  }

  checkFilters() {
    return (
      this.state.filters.jobKeyword ||
      this.state.filters.company ||
      this.state.filters.duration ||
      this.state.filters.wageMax ||
      this.state.filters.wageMin ||
      this.state.filters.location
    );
  }

  checkJobName(job) {
    if (this.state.filters.jobKeyword) {
      return job.jobName
        .toLowerCase()
        .includes(this.state.filters.jobKeyword.toLowerCase());
    } else {
      return false;
    }
  }
  checkLocation(job) {
    if (this.state.filters.location) {
      return job.location
        .toLowerCase()
        .includes(this.state.filters.location.toLowerCase());
    } else {
      return false;
    }
  }
  checkCompany(job) {
    if (this.state.filters.company) {
      console.log(job.company);
      console.log(this.state.filters.company);
      return job.company
        .toLowerCase()
        .includes(this.state.filters.company.toLowerCase());
    } else {
      return false;
    }
  }
  checkDuration(job) {
    if (this.state.filters.duration && this.state.filters.duration != 0) {
      return job.duration === this.state.filters.duration;
    } else {
      return false;
    }
  }
  checkWage(job) {
    if (this.state.filters.wageMax && this.state.filters.wageMin) {
      return (
        job.wagePerHour >= this.state.filters.wageMin &&
        job.wagePerHour <= this.state.filters.wageMax
      );
    } else if (this.state.filters.wageMax) {
      return job.wagePerHour <= this.state.filters.wageMax;
    } else if (this.state.filters.wageMin) {
      return job.wagePerHour >= this.state.filters.wageMin;
    } else {
      return false;
    }
  }

  render() {
    console.log(this.state.allJobs);
    return (
      <div className="paper">
<Grid container spacing={3}>
        <Grid item xs={3} className="filter">
          <Filter
            toggleTest={this.toggleTest}
            test={this.state.test}
            filters={this.state.filters}
            // functionHandlers={this.functionHandlers}
            handleDurationChange={this.handleDurationChange}
            handleWageMaxChange={this.handleWageMaxChange}
            handleWageMinChange={this.handleWageMinChange}
            handleLocationChange={this.handleLocationChange}
            handleCompanyChange={this.handleCompanyChange}
            handleKeywordChange={this.handleKeywordChange}
          />
        </Grid>
        <Grid item xs={10}>
          <JobList
            jobs={
              this.state.filteredJobs.length > 0
                ? this.state.filteredJobs
                : this.state.allJobs
              // jobs
            }
            test={this.state.test}
            filters={this.state.filters}
          />
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default Jobs;
