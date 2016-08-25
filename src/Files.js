import React from 'react'

class Files extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onDrop = this.onDrop.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClear = this.onClear.bind(this)
    this.openFileChooser = this.openFileChooser.bind(this)

    this.id = 1

    this.state = {
      files: []
    }
  }

  onDrop(event) {
    event.preventDefault()
    this.onDragLeave(event)

    // Collect added files, perform checking, cast pseudo-array to Array,
    // then return to method
    const filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files
    let files = []
    for (let i = 0; i < filesAdded.length; i++) {
      let file = filesAdded[i]

      // Assign file an id
      file.id = 'files-list-item-' + this.id++

      // Add preview, either image or file extension
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

      // Check for file max limit
      if (this.state.files.length + files.length >= this.props.maxFiles) {
        this.onError({
           code: 4,
           message: 'maximum file count reached'
        }, file)
        break
      }

      // If file is acceptable, unshift
      if (this.fileTypeAcceptable(file) &&
          this.fileSizeAcceptable(file)) files.unshift(file)
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

  fileTypeAcceptable(file) {
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
      this.onError({
         code: 1,
         message: file.name + ' is not a valid file type'
      }, file)
      return false
    } else {
      return true
    }
  }

  fileSizeAcceptable(file) {
    if (file.size > this.props.maxSize) {
      this.onError({
         code: 2,
         message: file.name + ' is too large'
      }, file)
      return false
    } else if (file.size < this.props.minSize) {
      this.onError({
         code: 3,
         message: file.name + ' is too small'
      }, file)
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

  fileSizeReadable(size) {
    if (size >= 1000000000) {
      return Math.ceil(size / 1000000000) + 'GB'
    } else if (size >= 1000000) {
      return Math.ceil(size / 1000000) + 'MB'
    } else if (size >= 1000) {
      return Math.ceil(size / 1000) + 'kB'
    } else {
      return Math.ceil(size) + 'B'
    }
  }

  onSubmit() {
    this.props.onSubmit.call(this, this.state.files)
  }

  onError(error, file) {
    this.props.onError.call(this, error, file)
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
                      <div className="files-list-item-content-item files-list-item-content-item-1">{file.name}</div>
                      <div className="files-list-item-content-item-2 files-list-item-content-item-2" className="files-list-item-content-item">{this.fileSizeReadable(file.size)}</div>
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

Files.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onError: React.PropTypes.func.isRequired,
  maxFiles: React.PropTypes.number,
  maxSize: React.PropTypes.number,
  minSize: React.PropTypes.number
}

Files.defaultProps = {
   onSubmit: function (files) {
      console.log(files)
   },
   onError: function (error, file) {
      console.log('error code ' + error.code + ': ' + error.message)
   },
   maxFiles: Infinity,
   maxSize: Infinity,
   minSize: 0
}

export default Files
