import React from 'react'
import ReactDOM from 'react-dom'
import Files from './Files'

var FilesDemo = React.createClass({
  onSubmit: function(files) {
    console.log(files)
  },

  onUnaccepted: function(file) {
    console.log(file.name + ' is not a valid file type.')
  },

  render: function() {
    return (
      <div className="files">
        <Files
          onSubmit={this.onSubmit}
          onUnaccepted={this.onUnaccepted}
        />
      </div>
    )
  }
})

ReactDOM.render(<FilesDemo />, document.getElementById('container'))
