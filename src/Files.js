import React from 'react'

class Files extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onDrop = this.onDrop.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onUnaccepted = this.onUnaccepted.bind(this)
    this.onClear = this.onClear.bind(this)
    this.openFileChooser = this.openFileChooser.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.fileAcceptable = this.fileAcceptable.bind(this)

    this.id = 1

    this.state = {
      files: []
    }
  }

  onDrop(event) {
    event.preventDefault()
    this.onDragLeave(event)

    // Collect added files and cast pseudo-array to Array, then return to method
    const filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files
    let files = []
    for (let i = 0; i < filesAdded.length; i++) {
      let file = filesAdded[i]
      file.id = 'files-list-item-' + this.id++
      if (file.type && this.mimeTypeLeft(file.type) === 'image') {
        file.preview = {
          type: 'image',
          url: window.URL.createObjectURL(file)
        }
      } else {
        file.preview = {
          type: 'file',
          extension: this.fileExtension(file)
        }
      }
      if (this.fileAcceptable(file)) files.unshift(file)
    }
    this.setState({ files: [...files, ...this.state.files] })
  }

  onDragOver(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  onDragEnter(event) {
    event.target.className += ' files-dropzone-ondragenter'
  }

  onDragLeave(event) {
    event.target.className = event.target.className.replace(' files-dropzone-ondragenter', '')
  }

  openFileChooser() {
    this.inputElement.value = null
    this.inputElement.click()
  }

  removeFile(fileId) {
    this.setState({
      files: this.state.files.filter(file => file.id !== fileId)
    })
  }

  fileAcceptable(file) {
    let accepts = this.props.accepts
    if (accepts) {
      if (accepts.indexOf(this.fileExtension(file)) !== -1) return true
      if (file.type) {
        let typeLeft = this.mimeTypeLeft(file.type)
        let typeRight = this.mimeTypeRight(file.type)
        for (let i = 0; i < accepts.length; i++) {
          let accept = accepts[i]
          let acceptLeft = accept.split('/')[0]
          let acceptRight = accept.split('/')[1]
          if (acceptLeft && acceptRight) {
            if (acceptLeft === typeLeft && acceptRight === '*') {
              return true
            }
            if (acceptLeft === typeLeft && acceptRight === typeRight) {
              return true
            }
          }
        }
      }
      this.onUnaccepted(file)
      return false
    } else {
      return true
    }
  }

  mimeTypeLeft(mime) {
    return mime.split('/')[0]
  }

  mimeTypeRight(mime) {
    return mime.split('/')[1]
  }

  fileExtension(file) {
    let extensionSplit = file.name.split('.')
    if (extensionSplit.length > 1) {
      return '.' + extensionSplit[extensionSplit.length - 1]
    } else {
      return 'none'
    }
  }

  onSubmit() {
    this.props.onSubmit.call(this, this.state.files);
  }

  onUnaccepted(file) {
    this.props.onUnaccepted.call(this, file);
  }

  onClear() {
    this.setState({
      files: []
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
      >
        <input
          // {...inputProps/* expand user provided inputProps first so inputAttributes override them */}
          {...inputAttributes}
        />
        <div
          className="files-dropzone-outer"
        >
          <div className="files-dropzone"
            onClick={this.openFileChooser}
            onDrop={this.onDrop}
            onDragOver={this.onDragOver}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
          />
        </div>
        {this.props.children}
        {
          this.state.files.length > 0
          ? <div>
              <div className="files-list">
                <ul>{this.state.files.map((file) =>
                  <li className="files-list-item" key={file.id}>
                    <div className="files-list-item-preview">
                      {file.preview.type === 'image'
                      ? <img className="files-list-item-preview-image" src={file.preview.url} />
                      : <div className="files-list-item-preview-extension">{file.preview.extension}</div>}
                    </div>
                    <div className="files-list-item-content">
                      <div id="files-list-item-content-item-1" className="files-list-item-content-item">{file.name}</div>
                      <div id="files-list-item-content-item-2" className="files-list-item-content-item">{file.size} bytes</div>
                    </div>
                    <div
                      id={file.id}
                      className="files-list-item-remove"
                      onClick={this.removeFile.bind(this, file.id)}
                    />
                  </li>
                )}</ul>
              </div>
              <div className="files-buttons">
                <div onClick={this.onSubmit} className="files-button-submit" />
                <div onClick={this.onClear} className="files-button-clear" />
              </div>
            </div>
          : null
        }
      </div>

    )
  }
}

export default Files
