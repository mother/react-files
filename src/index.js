import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import fileExtension from './utils/fileExtension'
import fileSizeReadable from './utils/fileSizeReadable'
import fileTypeAcceptable from './utils/fileTypeAcceptable'

const Files = ({
   accepts = null,
   children,
   className,
   clickable = true,
   dragActiveClassName,
   inputProps = {},
   multiple = true,
   maxFiles = Infinity,
   maxFileSize = Infinity,
   minFileSize = 0,
   name = 'file',
   onChange = files => console.log(files),
   onDragEnter,
   onDragLeave,
   onError = err => console.log(`error code ${err.code}: ${err.message}`),
   style
}) => {
   const idCounter = useRef(1)
   const dropzoneElement = useRef()
   const inputElement = useRef()
   const [isDragging, setDragging] = useState(false)

   const handleError = (error, file) => {
      onError(error, file)
   }

   const handleDragOver = useCallback((event) => {
      event.preventDefault()
      event.stopPropagation()
   }, [])

   const handleDragEnter = (event) => {
      const el = dropzoneElement.current
      if (dragActiveClassName && !el.className.includes(dragActiveClassName)) {
         el.className = `${el.className} ${dragActiveClassName}`
      }

      if (typeof children === 'function') {
         setDragging(true)
      }

      if (onDragEnter) {
         onDragEnter(event)
      }
   }

   const handleDragLeave = (event) => {
      const el = dropzoneElement.current
      if (dragActiveClassName) {
         el.className = el.className.replace(` ${dragActiveClassName}`, '')
      }

      if (typeof children === 'function') {
         setDragging(false)
      }

      if (onDragLeave) {
         onDragLeave(event)
      }
   }

   const openFileChooser = () => {
      inputElement.current.value = null
      inputElement.current.click()
   }

   const handleDrop = (event) => {
      event.preventDefault()
      handleDragLeave(event)

      // Collect added files, perform checking, cast pseudo-array to Array,
      // then return to method
      let filesAdded = event.dataTransfer
         ? event.dataTransfer.files
         : event.target.files

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

         // Check max file count
         if (fileResults.length >= maxFiles) {
            handleError({
               code: 4,
               message: 'maximum file count reached'
            }, file)

            break
         }

         // Check if file is too big
         if (file.size > maxFileSize) {
            handleError({
               code: 2,
               message: `${file.name} is too large`
            }, file)

            break
         }

         // Check if file is too small
         if (file.size < minFileSize) {
            handleError({
               code: 3,
               message: `${file.name} is too small`
            }, file)

            break
         }

         // Ensure acceptable file type
         if (!fileTypeAcceptable(accepts, file)) {
            handleError({
               code: 1,
               message: `${file.name} is not a valid file type`
            }, file)

            break
         }

         fileResults.push(file)
      }

      onChange(fileResults)
   }

   return (
      <>
         <input
            {...inputProps}
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
            {typeof children === 'function' ? children(isDragging) : children}
         </div>
      </>
   )
}

Files.propTypes = {
   accepts: PropTypes.array,
   children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ]),
   className: PropTypes.string,
   clickable: PropTypes.bool,
   dragActiveClassName: PropTypes.string,
   inputProps: PropTypes.object,
   multiple: PropTypes.bool,
   maxFiles: PropTypes.number,
   maxFileSize: PropTypes.number,
   minFileSize: PropTypes.number,
   name: PropTypes.string,
   onChange: PropTypes.func,
   onDragEnter: PropTypes.func,
   onDragLeave: PropTypes.func,
   onError: PropTypes.func,
   style: PropTypes.object
}

export default Files
