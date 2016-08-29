import React from 'react'
import ReactDOM from 'react-dom'
import Files from './Files'

var FilesDemo = React.createClass({
  getInitialState () {
    return {
      files: []
    }
  },

  onFilesChange: function (files) {
    this.setState({
      files
    }, () => {
      console.log(this.state.files)
    })
  },

  onFilesError: function (error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
  },

  filesRemoveOne: function (file) {
    this.refs.files.removeFile(file)
  },

  filesRemoveAll: function () {
    this.refs.files.removeFiles()
  },

  filesUpload: function () {
    window.alert('Ready to upload ' + this.state.files.length + ' file(s)!')
  },

  render: function () {
    return (
      <div>
        <Files
          ref='files'
          className='files-dropzone'
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          accepts={['image/png', 'text/plain', 'audio/*']}
          multiple
          maxFiles={3}
          maxFileSize={10000000}
          minFileSize={0}
          clickable={false}
        >
          Drop files here or click to upload
        </Files>
        <button onClick={this.filesRemoveAll}>Remove All Files</button>
        <button onClick={this.filesUpload}>Upload</button>
        {
          this.state.files.length > 0
          ? <div className='files-list'>
            <ul>{this.state.files.map((file) =>
              <li className='files-list-item' key={file.id}>
                <div className='files-list-item-preview'>
                  {file.preview.type === 'image'
                  ? <img className='files-list-item-preview-image' src={file.preview.url} />
                  : <div className='files-list-item-preview-extension'>{file.extension}</div>}
                </div>
                <div className='files-list-item-content'>
                  <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                  <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
                </div>
                <div
                  id={file.id}
                  className='files-list-item-remove'
                  onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
                />
              </li>
            )}</ul>
          </div>
          : null
        }
      </div>
    )
  }
})

ReactDOM.render(<FilesDemo />, document.getElementById('container'))
