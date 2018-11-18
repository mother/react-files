import React from 'react'
import PropTypes from 'prop-types'

const mimeTypeRegexp = /^(application|audio|example|image|message|model|multipart|text|video)\/[a-z0-9\.\+\*-]+$/;
const extRegexp = /\.[a-zA-Z0-9]*$/;

class Files extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onDrop = this.onDrop.bind(this)
    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.openFileChooser = this.openFileChooser.bind(this)

    this.id = 1

    this.state = {
      files: []
    }
  }

  onDrop (event) {
    event.preventDefault()
    this.onDragLeave(event)

    // Collect added files, perform checking, cast pseudo-array to Array,
    // then return to method
    let filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files

    // Multiple files dropped when not allowed
    if (this.props.multiple === false && filesAdded.length > 1) {
      filesAdded = [filesAdded[0]]
    }

    let files = []
    for (let i = 0; i < filesAdded.length; i++) {
      let file = filesAdded[i]

      // Assign file an id
      file.id = 'files-' + this.id++

      // Tell file it's own extension
      file.extension = this.fileExtension(file)

      // Tell file it's own readable size
      file.sizeReadable = this.fileSizeReadable(file.size)

      // Add preview, either image or file extension
      if (file.type && this.mimeTypeLeft(file.type) === 'image') {
        file.preview = {
          type: 'image',
          url: window.URL.createObjectURL(file)
        }
      } else {
        file.preview = {
          type: 'file'
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

      // If file is acceptable, push or replace
      if (this.fileTypeAcceptable(file) && this.fileSizeAcceptable(file)) {
        files.push(file)
      }
    }
    this.setState({
      files: this.props.multiple === false
        ? files
        : [...this.state.files, ...files]
    }, () => {
      this.props.onChange.call(this, this.state.files)
    })
  }

  onDragOver (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  onDragEnter (event) {
    let el = this.dropzone
    el.className += ' ' + this.props.dropActiveClassName
  }

  onDragLeave (event) {
    let el = this.dropzone
    this.dropzone.className = el.className.replace(' ' + this.props.dropActiveClassName, '')
  }

  openFileChooser () {
    this.inputElement.value = null
    this.inputElement.click()
  }

  fileTypeAcceptable (file) {
    let accepts = this.props.accepts;
    if (!accepts) {
      return true
    }

    const result = accepts.some(accept => {
      if (file.type && accept.match(mimeTypeRegexp)) {
        let typeLeft = this.mimeTypeLeft(file.type)
        let typeRight = this.mimeTypeRight(file.type)
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
      } else if (file.extension && accept.match(extRegexp)) {
        const ext = accept.substr(1);
        return file.extension.toLowerCase() === ext.toLowerCase();
      }
      return false
    });

    if (!result) {
      this.onError({
        code: 1,
        message: file.name + ' is not a valid file type'
      }, file)
    }

    return result
  }

  fileSizeAcceptable (file) {
    if (file.size > this.props.maxFileSize) {
      this.onError({
        code: 2,
        message: file.name + ' is too large'
      }, file)
      return false
    } else if (file.size < this.props.minFileSize) {
      this.onError({
        code: 3,
        message: file.name + ' is too small'
      }, file)
      return false
    } else {
      return true
    }
  }

  mimeTypeLeft (mime) {
    return mime.split('/')[0]
  }

  mimeTypeRight (mime) {
    return mime.split('/')[1]
  }

  fileExtension (file) {
    let extensionSplit = file.name.split('.')
    if (extensionSplit.length > 1) {
      return extensionSplit[extensionSplit.length - 1]
    } else {
      return 'none'
    }
  }

  fileSizeReadable (size) {
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

  onError (error, file) {
    this.props.onError.call(this, error, file)
  }

  removeFile (fileToRemove) {
    this.setState({
      files: this.state.files.filter(file => file.id !== fileToRemove.id)
    }, () => {
      this.props.onChange.call(this, this.state.files)
    })
  }

  removeFiles () {
    this.setState({
      files: []
    }, () => {
      this.props.onChange.call(this, this.state.files)
    })
  }

  render () {
    const inputAttributes = {
      type: 'file',
      accept: this.props.accepts ? this.props.accepts.join() : '',
      multiple: this.props.multiple,
      name: this.props.name,
      style: { display: 'none' },
      ref: (element) => {
        this.inputElement = element
      },
      onChange: this.onDrop
    }

    return (
      <div>
        <input
          {...inputAttributes}
        />
        <div
          className={this.props.className}
          onClick={
            this.props.clickable === true
              ? this.openFileChooser
              : null
          }
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          ref={dropzone => { this.dropzone = dropzone }}
          style={this.props.style}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

Files.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string.isRequired,
  dropActiveClassName: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  accepts: PropTypes.array,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  maxFileSize: PropTypes.number,
  minFileSize: PropTypes.number,
  clickable: PropTypes.bool,
  name: PropTypes.string,
  style: PropTypes.object
}

Files.defaultProps = {
  onChange: function (files) {
    console.log(files)
  },
  onError: function (error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
  },
  className: 'files-dropzone',
  dropActiveClassName: 'files-dropzone-active',
  accepts: null,
  multiple: true,
  maxFiles: Infinity,
  maxFileSize: Infinity,
  minFileSize: 0,
  name: 'file',
  clickable: true
}

export default Files
