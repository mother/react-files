import React, { useState } from 'react'
import Files from '../src'

const Gallery = () => {
   const [files, setFiles] = useState([])
   const handleChange = (newFiles) => {
      setFiles(prevFiles => [...prevFiles, ...newFiles])
   }

   return (
      <div>
         <h1>Example 2 - Gallery</h1>
         <Files
            className="files-dropzone-gallery"
            dragActiveClassName="files-dropzone-active"
            onChange={handleChange}
            accepts={['image/*']}
            multiple
            clickable={false}>
            {files.length === 0 && (
               <div>Drop images here</div>
            )}
            {files.length > 0 && (
               <div className="files-gallery">
                  {files.map(file => (
                     <img
                        key={file.id}
                        className="files-gallery-item"
                        src={file.preview.url}
                     />
                  ))}
               </div>
            )}
         </Files>
      </div>
   )
}

export default Gallery
