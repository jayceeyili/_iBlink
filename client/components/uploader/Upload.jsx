import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Route, Redirect } from 'react-router';
import style from './style.css';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getTitle: false,
      presentationTitle: 'Untitled presentation'
    };

    // this.handleTitle = this.handleTitle.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleGetTitle = this.handleGetTitle.bind(this);
  }

  handleChange(e) {
    this.setState({presentationTitle: e.target.value});
  }

  handleGetTitle(e) {
    this.setState({getTitle: true});
  }

  handleUpload(event) {
    this.setState({getTitle: false});
    event.preventDefault();
    const newPresentation = {};
    newPresentation.title = this.state.presentationTitle;
    if (!this.props.authorId) {
      console.error('PROBLEM: no user ID in upload, setting ID to 0 for debug');
    }
    newPresentation.author = this.props.authorId || 0;

    this.uploadWidget = cloudinary.openUploadWidget({
      upload_preset: 'nl29au84',
      cloud_name: 'iblink',
      button_caption: 'Upload slides',
      theme: 'minimal',
      sources: ['local'],
      text:
      {
        'sources.local.title': 'Presentations',
        'sources.local.drop_files': 'Drop all slides here',
        'sources.local.drop_or': 'Or',
        'sources.local.select_files': 'Select all',
        'progress.retry_upload': 'Please try again',
        'progress.failed_note': 'Some of your slides failed uploading.'
      }
    },
      (error, result) => {
        if (error) {
      	  console.error('Error in upload:', error);
        } else {
          console.log('Image upload successful! Result:', result);
          // update the state to add this presentation to the user's set
          // send the presentation to the server
          const newSlides = result.map((slide) => {
            const newSlide = {};
            // newSlide.height = slide.height;
            // newSlide.original_filename = slide.original_filename;
            newSlide.secure_url = slide.secure_url;
            newSlide.thumbnail_url = slide.thumbnail_url;
            // newSlide.url = slide.url;
            // newSlide.width = slide.width;
            console.log('mapping to:', newSlide);
            return newSlide;
          });
          console.log('newSlides is:', newSlides);
          newPresentation.slides = newSlides;
          this.props.uploadPresentation(newPresentation);

          // .then((pres) => {
          //   console.log('!! Resulting pres back from upload:', pres);
          // })
          // .catch((err) => { console.log('error in end of Upload!!!', err); });
        }
      });
  }


  render() {
    const button = `btn btn-primary ${style.button}`
    return (
      <div>
        { this.state.getTitle ? (
          <div>Please enter a presentation title:
            <input
              value={this.presentationTitle}
              onChange={this.handleChange.bind(this)} />
            <Button
              basic
              color="blue"
              onClick={this.handleUpload}
              size="medium"
            >
              Add
            </Button>
          </div>
          ) : (
          <Button
            className={button}
            basic
            color="blue"
            onClick={this.handleGetTitle}
            size="big"
          >
            <Icon name="add circle" />
            Upload a presentation
          </Button>
        )}
      </div>
    );
  }
}

export default Upload;
