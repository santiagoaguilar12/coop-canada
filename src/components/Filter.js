import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Card, CardContent } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <CardContent>
          <div>
            <strong>Job Filters: </strong>
          </div>
          <FormControl>
            <InputLabel id="duration-label">Duration</InputLabel>
            <Select
              labelId="duration-label"
              id="duration-select"
              value={this.props.filters.duration}
              onChange={this.props.handleDurationChange}
            >
              <MenuItem value={0}>Any</MenuItem>
              <MenuItem value={4}>4 months</MenuItem>
              <MenuItem value={8}>8 months</MenuItem>
              <MenuItem value={12}>12 months</MenuItem>
              <MenuItem value={16}>16 months</MenuItem>
            </Select>
            <TextField
              id="job-field"
              label="Job Keyword"
              value={this.props.filters.jobKeyword}
              onChange={this.props.handleKeywordChange}
            />

            <TextField
              id="location-field"
              label="Location"
              value={this.props.filters.location}
              onChange={this.props.handleLocationChange}
            />
            <TextField
              id="wage-max-field"
              label="Max Wage"
              value={this.props.filters.wageMax}
              onChange={this.props.handleWageMaxChange}
            />
            <TextField
              id="wage-min-field"
              label="Min Wage"
              value={this.props.filters.wageMin}
              onChange={this.props.handleWageMinChange}
            />
            <TextField
              id="company-field"
              label="Company"
              value={this.props.filters.company}
              onChange={this.props.handleCompanyChange}
            />
          </FormControl>
        </CardContent>
      </Card>      
    );
  }
}

export default Filter;



// Be able to login and go to profile without resetting the user
// Redirect
// Csss
// make sure it applies 