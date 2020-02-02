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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export class JobList extends Component {
  // const classes = useStyles();
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table /*className={classes.table}*/ aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Job Title</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">App Deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.jobs.map(row => (
              //   <Link>
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Link to={{ pathname: "/job", state: { test: true } }}>
                    {row.jobName}
                  </Link>
                </TableCell>
                <TableCell align="right">{row.company}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.applicationDeadline}</TableCell>
              </TableRow>
              //   </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default JobList;
