import React from 'react'
import ReactDOM from 'react-dom'
import Files from './Files'

var FilesDemo = React.createClass({
  onSubmit: function(files) {
    console.log(files)
  },

  onError: function(error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
  },

  render: function() {
    return (
      <div className="files">
        <Files
          onSubmit={this.onSubmit}
          onError={this.onError}
          maxFiles={10}
          maxSize={10000000}
          minSize={1000}
        />
      </div>
    )
  }
})

ReactDOM.render(<FilesDemo />, document.getElementById('container'))
