import React from 'react'
import ReactDOM from 'react-dom'
import Files from './Files'

var FilesDemo = React.createClass({
  getInitialState: function () {
    return {
      files: []
    }
  },

  onDrop: function (files) {
    console.log(Array.isArray(files))
    this.setState({
      files: files
    })
  },

  onClick: function () {
    console.log('click')
  },

  render: function () {
    return (
      <div>
        <Files className="wow" onDrop={this.onDrop} onClick={this.onClick}>
          <div>Try dropping some files here, or click to select files.</div>
        </Files>
        {this.state.files.length > 0
          ? <div>
              <h2>Uploading {this.state.files.length} files...</h2>
              <div>{this.state.files.map((file) => <img src={file.preview} />)}</div>
            </div>
          : null}
      </div>
    )
  }
})

ReactDOM.render(<FilesDemo name="Jane" />, document.getElementById('container'))
