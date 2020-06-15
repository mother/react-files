import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

// TODO: SUPPORT */*
// See: https://github.com/mother/react-files/issues/27
const mimeTypeRegexp = /^(application|audio|example|image|message|model|multipart|text|video)\/[a-z0-9\.\+\*-]+$/;
const extRegexp = /\.[a-zA-Z0-9]*$/;

const Files = ({
   accepts,
   children,
   className,
   clickable,
   dragActiveClassName,
   dragActiveStyle,
   onChange,
   onError,
   multiple,
   maxFiles,
   maxFileSize,
   minFileSize,
   name,
   style
}) => {
  const idCounter = useRef(1)
  const dropzoneElement = useRef()
  const inputElement = useRef()

  const handleError = (error, file) => {
    onError(error, file)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDragEnter = (event) => {
    const el = dropzoneElement.current
    el.className += ' ' + dragActiveClassName
  }

  const handleDragLeave = (event) => {
    const el = dropzoneElement.current
    dropzoneElement.current.className = el.className.replace(' ' + dragActiveClassName, '')
  }

  const openFileChooser = () => {
    inputElement.current.value = null
    inputElement.current.click()
  }

  const fileTypeAcceptable = (file) => {
    if (!accepts) {
      return true
    }

    const result = accepts.some(accept => {
      if (file.type && accept.match(mimeTypeRegexp)) {
        const [typeLeft, typeRight] = file.type.split('/')
        const [acceptLeft, acceptRight] = accept.split('/')

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
    })

    if (!result) {
      handleError({
        code: 1,
        message: file.name + ' is not a valid file type'
      }, file)
    }

    return result
  }

  const fileSizeAcceptable = (file) => {
    if (file.size > maxFileSize) {
      handleError({
        code: 2,
        message: file.name + ' is too large'
      }, file)
      return false
    } else if (file.size < minFileSize) {
      handleError({
        code: 3,
        message: file.name + ' is too small'
      }, file)
      return false
    } else {
      return true
    }
  }

  const fileExtension = (file) => {
    let extensionSplit = file.name.split('.')
    if (extensionSplit.length > 1) {
      return extensionSplit[extensionSplit.length - 1]
    } else {
      return 'none'
    }
  }

  const fileSizeReadable = (size) => {
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

  const handleDrop = (event) => {
     event.preventDefault()
     handleDragLeave(event)

     // Collect added files, perform checking, cast pseudo-array to Array,
     // then return to method
     let filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files

     // Multiple files dropped when not allowed
     if (multiple === false && filesAdded.length > 1) {
      filesAdded = [filesAdded[0]]
     }

     let droppedFiles = []
     for (let i = 0; i < filesAdded.length; i++) {
      let file = filesAdded[i]

      // Assign file an id
      file.id = 'files-' + idCounter.current++

      // Tell file it's own extension
      file.extension = fileExtension(file)

      // Tell file it's own readable size
      file.sizeReadable = fileSizeReadable(file.size)

      // Add preview, either image or file extension
      if (file.type && file.type.split('/')[0] === 'image') {
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
      if (droppedFiles.length >= maxFiles) {
         handleError({
            code: 4,
            message: 'maximum file count reached'
         }, file)
         break
      }

      // If file is acceptable, push or replace
      if (fileTypeAcceptable(file) && fileSizeAcceptable(file)) {
         droppedFiles.push(file)
      }
     }

     onChange(droppedFiles)
 }

    return (
      <>
        <input
          ref={inputElement}
          type="file"
          accept={accepts ? accepts.join() : ''}
          multiple={multiple}
          name={name}
          style={{ display: 'none' }}
          onChange={handleDrop}
        />
        <div
          ref={dropzoneElement}
          className={className}
          onClick={clickable === true ? openFileChooser : null}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          style={style}>
          {children}
        </div>
      </>
    )
}

Files.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string.isRequired,
  dragActiveClassName: PropTypes.string,
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
  dragActiveClassName: 'files-dropzone-active',
  accepts: null,
  multiple: true,
  maxFiles: Infinity,
  maxFileSize: Infinity,
  minFileSize: 0,
  name: 'file',
  clickable: true
}

export default Files
