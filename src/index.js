import React, { useRef } from 'react'
import PropTypes from 'prop-types'

// TODO: SUPPORT */*
// See: https://github.com/mother/react-files/issues/27
// eslint-disable-next-line
const mimeTypeRegexp = /^(application|audio|example|image|message|model|multipart|text|video)\/[a-z0-9\.\+\*-]+$/
const extRegexp = /\.[a-zA-Z0-9]*$/

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
      el.className = `${el.className} ${dragActiveClassName}`
   }

   const handleDragLeave = (event) => {
      const el = dropzoneElement.current
      el.className = el.className.replace(` ${dragActiveClassName}`, '')
   }

   const openFileChooser = () => {
      inputElement.current.value = null
      inputElement.current.click()
   }

   const fileTypeAcceptable = (file) => {
      if (!accepts) {
         return true
      }

      const result = accepts.some((accept) => {
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
            const ext = accept.substr(1)
            return file.extension.toLowerCase() === ext.toLowerCase()
         }

         return false
      })

      if (!result) {
         handleError({
            code: 1,
            message: `${file.name} is not a valid file type`
         }, file)
      }

      return result
   }

   const fileSizeAcceptable = (file) => {
      if (file.size > maxFileSize) {
         handleError({
            code: 2,
            message: `${file.name} is too large`
         }, file)

         return false
      }

      if (file.size < minFileSize) {
         handleError({
            code: 3,
            message: `${file.name} is too small`
         }, file)

         return false
      }

      return true
   }

   const fileExtension = (file) => {
      const extensionSplit = file.name.split('.')
      if (extensionSplit.length > 1) {
         return extensionSplit[extensionSplit.length - 1]
      }

      return 'none'
   }

   /* eslint-disable prefer-template */
   const fileSizeReadable = (size) => {
      if (size >= 1000000000) {
         return Math.ceil(size / 1000000000) + 'GB'
      }

      if (size >= 1000000) {
         return Math.ceil(size / 1000000) + 'MB'
      }

      if (size >= 1000) {
         return Math.ceil(size / 1000) + 'kB'
      }

      return Math.ceil(size) + 'B'
   }
   /* eslint-enable prefer-template */

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

      const fileResults = []
      for (let i = 0; i < filesAdded.length; i += 1) {
         const file = filesAdded[i]

         // Assign file an id
         file.id = `files-${idCounter.current}`
         idCounter.current += 1

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
         if (fileResults.length >= maxFiles) {
            handleError({
               code: 4,
               message: 'maximum file count reached'
            }, file)

            break
         }

         // If file is acceptable, push or replace
         if (fileTypeAcceptable(file) && fileSizeAcceptable(file)) {
            fileResults.push(file)
         }
      }

      onChange(fileResults)
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
         {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
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
   accepts: PropTypes.array,
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ]),
   className: PropTypes.string,
   clickable: PropTypes.bool,
   dragActiveClassName: PropTypes.string,
   multiple: PropTypes.bool,
   maxFiles: PropTypes.number,
   maxFileSize: PropTypes.number,
   minFileSize: PropTypes.number,
   name: PropTypes.string,
   onChange: PropTypes.func,
   onError: PropTypes.func,
   style: PropTypes.object
}

Files.defaultProps = {
   accepts: null,
   className: 'files-dropzone',
   clickable: true,
   dragActiveClassName: 'files-dropzone-active',
   multiple: true,
   maxFiles: Infinity,
   maxFileSize: Infinity,
   minFileSize: 0,
   name: 'file',
   onChange: files => console.log(files), // eslint-disable-line no-console
   onError: err => console.log(`error code ${err.code}: ${err.message}`) // eslint-disable-line no-console
}

export default Files
