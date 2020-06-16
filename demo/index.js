import React from 'react'
import ReactDOM from 'react-dom'
import ListWithUploadExample from './ListWithUpload'
import GalleryExample from './Gallery'
import RenderPropsExample from './RenderProps'

ReactDOM.render((
   <div>
      <ListWithUploadExample />
      <GalleryExample />
      <RenderPropsExample />
   </div>
), document.getElementById('container'))
