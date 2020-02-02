import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { Card, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { dbRef, authRef } from "./Firebase"
import { withRouter } from "react-router-dom";
import * as firebase from 'firebase'

let job = {};

async function confirmApply() {
  const userEmail = await authRef.currentUser.email;
  const jobsSaveResult = await dbRef.collection("jobs").doc(job.id).set({
    applicants: firebase.firestore.FieldValue.arrayUnion(userEmail)
  }, {merge: true})
  const userSaveResult = await dbRef.collection("users").doc(userEmail).set({
    applicationKeys: firebase.firestore.FieldValue.arrayUnion(job.id)

  }, {merge: true})
  alert(`You have successfully applied to ${job.company} in ${job.location} `)
}

export class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: this.props.location.state.job
    };
    // console.log(props);
    // console.log(this.props); 
  }
  render() {
    job = this.state.job
    return (
      <Container maxWidth="md">
        <Card className="paper">
          <CardContent>
            <div>
              <strong>Job Name: </strong>
              {this.state.job.jobName}
            </div>
          </CardContent>
          <CardContent>
            <div>
              <strong>Company: </strong>
              {this.state.job.company}
            </div>
          </CardContent>
          <CardContent>
            <div>
              <strong>Job Location: </strong>
              {this.state.job.location}
            </div>
          </CardContent>
          <CardContent>
            <div>
              <strong>Application Deadline: </strong>
              {this.state.job.applicationDeadline}
            </div>
          </CardContent>

          <CardContent>
            <div>
              <strong>Job Summary: </strong>
              {this.state.job.jobSummary}
            </div>
          </CardContent>
          <CardContent>
            <div>
              <strong>Job Summary: </strong>
            </div>
            {this.state.job.requiredSkills.map(skill => {
              // Return the element. Also pass key
              return <div> {skill} </div>;
            })}
          </CardContent>
          <Button onClick={confirmApply} variant="contained" className="background">
              Apply
          </Button>
        </Card>
      </Container>
    );
  }
}

export default withRouter(JobDetail);
