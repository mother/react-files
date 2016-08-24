import React from 'react'

class Files extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onClick = this.onClick.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    // this.onDragStart = this.onDragStart.bind(this)
    // this.onDragEnter = this.onDragEnter.bind(this)
    // this.onDragLeave = this.onDragLeave.bind(this)

    this.id = 1

    this.state = {
      files: []
    }
  }

  onClick() {
    this.inputElement.click()
  }

  onDrop(e) {
    e.preventDefault()

    // Collect added files and cast pseudo-array to Array,
    // then return to method
    const filesAdded = e.dataTransfer ? e.dataTransfer.files : e.target.files
    for (let i = 0; i < filesAdded.length; i++) {
      let file = filesAdded[i]
      file.id = this.id++
      file.preview = window.URL.createObjectURL(file)
      this.state.files.push(file)
    }
    this.props.onDrop(this.state.files)
  }

  onDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  fileRemove(fileId) {
    console.log(fileId)
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
        onDragOver={this.onDragOver}
      >
        {this.props.children}
        <input
          // {...inputProps/* expand user provided inputProps first so inputAttributes override them */}
          {...inputAttributes}
        />
        {
          this.state.files.length > 0
          ? <div>{this.state.files.map((file) => <img key={file.id} src={file.preview} onClick={this.fileRemove(file.id)} />)}</div>
          : null
        }
      </div>

    )
  }
}

export default Files
