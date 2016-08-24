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

  componentDidMount() {
    // stuff
  }

  componentWillUnmount() {
    // stuff
  }

  onClick(event) {
    if (event.target && event.target.className) {
      switch(event.target.className) {
        case 'files-dropzone':
          this.inputElement.click()
          break
        case 'files-list-item-remove':
          this.fileRemove(event.target.id)
          break
        default:
          break
      }
    }
  }

  onDrop(event) {
    event.preventDefault()

    // Collect added files and cast pseudo-array to Array,
    // then return to method
    const filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files
    let files = []
    for (let i = 0; i < filesAdded.length; i++) {
      let file = filesAdded[i]
      file.id = 'files-list-item-' + this.id++
      file.preview = window.URL.createObjectURL(file)
      files.unshift(file)
    }
    this.setState({ files: [...files, ...this.state.files] })
  }

  onDragOver(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  fileRemove(fileId) {
    this.setState({
      files: this.state.files.filter(file => file.id !== fileId)
    })
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
        className="files-container"
        onClick={this.onClick}
      >
        <input
          // {...inputProps/* expand user provided inputProps first so inputAttributes override them */}
          {...inputAttributes}
        />
        <div
          className="files-dropzone"
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
        >
        </div>
        {this.props.children}
        {
          this.state.files.length > 0
          ? <div className="files-list">{this.state.files.map((file) =>
              <div className="files-list-item" key={file.id}>
                <div className="files-list-item-preview">
                  <img className="files-list-item-preview-image" src={file.preview} />
                </div>
                <div>{file.name}</div>
                <div>{file.size} bytes</div>
                <img id={file.id} className="files-list-item-remove" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM4IDEyLjgzbC0yLjgzLTIuODMtMTEuMTcgMTEuMTctMTEuMTctMTEuMTctMi44MyAyLjgzIDExLjE3IDExLjE3LTExLjE3IDExLjE3IDIuODMgMi44MyAxMS4xNy0xMS4xNyAxMS4xNyAxMS4xNyAyLjgzLTIuODMtMTEuMTctMTEuMTd6Ii8+PHBhdGggZD0iTTAgMGg0OHY0OGgtNDh6IiBmaWxsPSJub25lIi8+PC9zdmc+" />
              </div>
            )}</div>
          : null
        }
      </div>

    )
  }
}

export default Files
