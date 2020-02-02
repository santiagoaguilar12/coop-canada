import React, { Component } from 'react'
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class Upload extends Component {
    static defaultProps = {
        email: "test@gmail.com"
    }
    state = {
        avatar: "",
        isUploading: false,
        progress: 0,
    };
    handleUploadStart = (file) => {

    }
    // handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        console.log("Success");

    };

    render() {
        return (
            <div>
                <form>
                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                    <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                        Resume
                        <FileUploader
                            accept="application/pdf"
                            hidden
                            filename={this.props.email}
                            storageRef={firebase.storage().ref(`/resumes`)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                        <CloudUploadIcon />
                    </label>

                </form>
            </div>
        );
    }
}

export default Upload;
