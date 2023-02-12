import React from 'react'
import Files from '../src'

const RenderProps = () => (
   <div>
      <h1>Example 3 - Render Props</h1>
      <Files
         accepts={['image/*']}
         multiple
         style={{ height: '100px', width: '200px' }}>
         {isDragging => (
            <div
               style={{
                  width: '100%',
                  height: '100%',
                  background: isDragging ? 'red' : 'white',
                  border: '1px dashed #D3D3D3'
               }}>
               {isDragging && 'Drop Here!'}
               {!isDragging && 'Ready'}
            </div>
         )}
      </Files>
   </div>
)

export default RenderProps
