import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import Link from '@material-ui/core/Link';
import { dbRef, authRef, storageRef } from './Firebase'
import Upload from "./Upload";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleProgramChange = this.handleProgramChange.bind(this);
        this.handleProgramEdit = this.handleProgramEdit.bind(this);
        this.handleProgramEditEnter = this.handleProgramEditEnter.bind(this);
        this.checkIfEditing = this.checkIfEditing.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            isProgramEditing: false,
            email: "",
            program: "",
            applications: [],
            firstName: "",
            lastName: "",
            university: "",
            resumeLink: "",
            transcriptLink: ""
        }
    };
    /*
    PROPS I GET
    - Campony
    - Job Title
    - Application Status
    - Application ID
    */


    async componentDidMount() {
        const login = await authRef.signInWithEmailAndPassword("test@gmail","test123")
        const email = await authRef.currentUser.email
        const doc = await dbRef.collection("users").doc(email).get()
        const userData = doc.data();
        userData.applications = [];

        for (let i = 0; i < userData.applicationKeys.length; i++) {
            const key = userData.applicationKeys[i];
            const application = await dbRef.collection("jobs").doc(key).get()
            const randomName = application.data()
            userData.applications.push(randomName);
        }
        const resumeLink = await storageRef.ref(`resumes/${email}.pdf`).getDownloadURL()
        const transcriptLink = await storageRef.ref(`transcripts/${email}.pdf`).getDownloadURL()
        this.setState({
            applications: userData.applications,
            firstName: userData.firstName,
            lastName: userData.lastName,
            university: userData.university,
            program: userData.program,
            resumeLink: resumeLink,
            transcriptLink: transcriptLink,
            email: email
        });
    }

    async checkIfEditing() {
        if (!this.state.isProgramEditing) {
            let test = await dbRef.collection('users').doc(authRef.currentUser.email).set(
                { program: this.state.program, }, { merge: true }
            );
        }
    }
    handleProgramChange(e) {
        this.setState({ program: e.target.value })
    }

    handleProgramEdit(e) {
        this.setState(st => ({ isProgramEditing: !st.isProgramEditing }), () => { this.checkIfEditing() });
    }
    handleProgramEditEnter(e) {
        if (e.key === "Enter") {
            this.setState(st => ({ isProgramEditing: !st.isProgramEditing }), () => { this.checkIfEditing() });
        }
    }

    render() {

        let programDisplay;
        if (this.state.isProgramEditing) {
            programDisplay = <div>
                <div><input value={this.state.program} onChange={this.handleProgramChange} onKeyDown={this.handleProgramEditEnter} /> - <span>{this.props.school}</span></div>
                <CheckIcon onClick={this.handleProgramEdit} />
            </div>
        } else {
            programDisplay = <div>
                <div>{this.state.program} - <span>{this.state.university}</span></div>
                <EditIcon onClick={this.handleProgramEdit} />
            </div>
        }
        console.log(this.state.applications);
        return (
            <Container maxWidth="md">
                <div className="Profile-Header">
                    <h1>{this.state.firstName} {this.state.lastName}</h1>
                    {programDisplay}
                </div>
                <Grid spacing={3}>
                    <Grid className="Profile-InterviewList" xs={8}>
                        <h3>Your Applications</h3>
                        <List>
                            {this.state.applications.map(application => (<div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={application.company + "  -  " + application.jobName} secondary={application.location} />
                                </ListItem>
                                <Divider />
                            </div>))
                            }
                        </List>
                    </Grid>
                    <Grid className="Profile-Upload" xs={9}>
                        <h3>Your Uploads</h3>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Resume"/>
                                {this.state.resumeLink ? (
                                    <Link className="margin-r">Current Resume</Link>
                                ) : (
                                    <div className="margin-r">Please Upload A Resume</div>
                                )
                                } 
                                <Upload filePath="resumes" label="Resume" email={this.state.email} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Transcript"/>
                                {this.state.transcriptLink ? ( 
                                <Link className="margin-r">Current Transcript</Link>
                                ) : (
                                    <div className="margin-r">Please Upload A Transcript</div>
                                )
                                }
                                <Upload filePath="transcripts" label="Transcript" email={this.state.email} />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Container>

        )
    }
}

export default Profile
