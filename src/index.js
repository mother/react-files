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
    console.log(files)
    this.setState({
      files: files
    })
  },

  onClick: function () {
    console.log('click')
  },

  // {this.state.files.length > 0
  //   ? <div>
  //       <h2>Uploading {this.state.files.length} files...</h2>
  //       <div>{this.state.files.map((file) => <img key={file.id} src={file.preview} />)}</div>
  //     </div>
  //   : null}

  render: function () {
    return (
      <div>
        <Files className="wow" onDrop={this.onDrop} onClick={this.onClick}>
          <div>Try dropping some files here, or click to select files.</div>
        </Files>

      </div>
    )
  }
})

ReactDOM.render(<FilesDemo name="Jane" />, document.getElementById('container'))
