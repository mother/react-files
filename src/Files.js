import React from 'react'

class Files extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onClick = this.onClick.bind(this)
    this.onDrop = this.onDrop.bind(this)
    // this.onDragStart = this.onDragStart.bind(this)
    // this.onDragEnter = this.onDragEnter.bind(this)
    // this.onDragLeave = this.onDragLeave.bind(this)
    // this.onDragOver = this.onDragOver.bind(this)
  }

  onClick() {
    this.inputElement.click()
  }

  onDrop(e) {
    // Collect added files and cast pseudo-array to Array,
    // then return to method
    const filesAdded = e.dataTransfer ? e.dataTransfer.files : e.target.files
    let files = []
    for (let i = 0; i < filesAdded.length; i++) {
      let file = filesAdded[i]
      file.preview = window.URL.createObjectURL(file)
      files.push(file)
    }
    this.props.onDrop(files)
  }

  render() {

    const inputAttributes = {
      type: 'file',
      multiple: true,
      style: { display: 'none' },
      ref: element => this.inputElement = element,
      onChange: this.onDrop
    }

    return (
      <div
        className="div"
        onClick={this.onClick}
        onDrop={this.onDrop}
      >
      <input
        // {...inputProps/* expand user provided inputProps first so inputAttributes override them */}
        {...inputAttributes}
      />
      </div>

    )
  }
}

export default Files
