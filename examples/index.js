import React from 'react'
import { createRoot } from 'react-dom/client'
import ListWithUploadExample from './ListWithUpload'
import GalleryExample from './Gallery'
import RenderPropsExample from './RenderProps'

const container = document.getElementById('container')
const root = createRoot(container)
root.render(
   <div>
      <ListWithUploadExample />
      <GalleryExample />
      <RenderPropsExample />
   </div>
)
