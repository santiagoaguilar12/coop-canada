import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



export class Profile extends Component {
    
    static defaultProps = {
        firstName: "John",
        lastName: "Doe",
        school: "Queen's University",
        program: "Computer Engineering",
        transcript: "transcript pdf...",
        interviews: [
            {
                id: 0,
                time: Date.now,
                company: "Shopify"
            }, {
                id: 1,
                time: Date.now,
                company: "BlackBerry"
            }, {
                id: 2,
                time: Date.now,
                company: "Air Transat"
            }
        ],
        id: "3819353",
        resume: "resume pdf..."
    };
    constructor(props) {
        super(props);
        props.notOnLoginPage()
    }
    render() {
        return (
            <Container maxWidth="md">
                <div className="Profile-Header">
                    <h1>{this.props.firstName} {this.props.lastName}</h1>
                    <h5>{this.props.program} - <span>{this.props.school}</span></h5>
                </div>
                <Grid spacing={3}>
                    <Grid className="Profile-InterviewList" xs={9}>
                        <h3>Your Interviews</h3>
                        {//map a list of interviews
                        }
                        <List>
                            {this.props.interviews.map(interview =>
                                <div>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={interview.company} secondary="February 17th" />
                                    </ListItem>
                                    <Divider />
                                </div>)
                            }
                        </List>
                    </Grid>
                    <Grid className="Profile-Upload" xs={3}>
                        <h3>Your Uploads</h3>
                        {//Display resume and transcript upload options with when it was uploaded
                        }
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Resume" secondary='${Date.now}' />
                                <CloudUploadIcon />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Transcript" secondary='${Date.now}' />
                                <CloudUploadIcon />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Container>

        )
    }
}

export default Profile
