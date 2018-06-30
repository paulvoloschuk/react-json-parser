import React, {Component, Fragment} from 'react'
import Dropzone from 'react-dropzone'
import './styles.css'

class FullScreenDropZone extends Component {
  state = {active: false}

  onDragEnter = () => this.setState({active: true})
  onDragLeave = () => this.setState({active: false})
  onDrop = (accepted, rejected) => accepted.length && this.props.onDrop(accepted[0])

  render () {
    const {state: {active}, props: {children}, onDrop, onDragEnter, onDragLeave} = this

    return (
      <Dropzone
          {...{onDrop, onDragEnter, onDragLeave}}
          accept="application/json"
          className={`dropzone ${children && 'dropzone--children'}`}
          activeClassName="dropzone--active"
          disableClick
          key={children && children.props.dataUrl}
        >
          {({isDragActive, isDragReject, acceptedFiles, rejectedFiles}) => {
            let content = 'Try dropping some json here.',
                classModifier = 'dropzone__overlay--file'
            if (isDragActive) {
              classModifier = 'dropzone__overlay--accept'
              content = "This file is authorized"
            } else if (isDragReject) {
              content = "dropzone__overlay--reject"
              content = "This file is not authorized"
            } else if (acceptedFiles.length || rejectedFiles.length) {
              content = `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
            }
            return (
              <Fragment>
                {children || content}
                <div className={`dropzone__overlay ${active && 'dropzone__overlay--active'} ${classModifier}`}>
                  {content}
                </div>
              </Fragment>
            )
          }}

        </Dropzone>
    )
  }
}

export default FullScreenDropZone
