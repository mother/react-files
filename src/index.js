import React from 'react'
import ReactDOM from 'react-dom'
import Files from './Files'

var FilesDemo = React.createClass({
  onDrop: function (files) {
    console.log(files)
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
      </div>
    )
  }
})

ReactDOM.render(<FilesDemo name="Jane" />, document.getElementById('container'))
