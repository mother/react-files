import axios from 'axios'
import Blob from 'blob'
import FormData from 'form-data'
import React from 'react'
import ReactDOM from 'react-dom'
import Files from '../src'

class FilesDemo1 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      files: []
    }
  }

  onFilesChange = (files) => {
    this.setState({
      files
    }, () => {
      console.log(this.state.files)
    })
  }

  onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  filesRemoveOne = (file) => {
    // this.refs.files.removeFile(file)
  }

  filesRemoveAll = () => {
    // this.refs.files.removeFiles()
  }

  filesUpload = () => {
    const formData = new FormData()
    Object.keys(this.state.files).forEach((key) => {
      const file = this.state.files[key]
      formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
    })

    axios.post(`/files`, formData)
    .then(response => window.alert(`${this.state.files.length} files uploaded succesfully!`))
    .catch(err => window.alert('Error uploading files :('))
  }

  render () {
    return (
      <div>
        <h1>Example 1 - List</h1>
        <Files
          // ref='files'
          className='files-dropzone-list'
          style={{ height: '100px' }}
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          multiple
          maxFiles={10}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
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
}

class FilesDemo2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      files: []
    }
  }

  onFilesChange = (files) => {
    this.setState({
      files
    }, () => {
      console.log(this.state.files)
    })
  }

  onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  filesRemoveAll = () => {
    // this.refs.files.removeFiles()
  }

  render () {
    return (
      <div>
        <h1>Example 2 - Gallery</h1>
        <Files
          // ref='files'
          className='files-dropzone-gallery'
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          accepts={['image/*']}
          multiple
          clickable={false}
        >
          {
            this.state.files.length > 0
            ? <div className='files-gallery'>
              {this.state.files.map((file) =>
                <img className='files-gallery-item' src={file.preview.url} key={file.id} />
              )}
            </div>
            : <div>Drop images here</div>
          }
        </Files>
        <button onClick={this.filesRemoveAll}>Remove All Files</button>
      </div>
    )
  }
}

ReactDOM.render(<div><FilesDemo1 /><FilesDemo2 /></div>, document.getElementById('container'))
