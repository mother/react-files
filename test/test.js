import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'
expect.extend(expectJSX)

import Files from '../src/Files.js'

describe('Files', () => {
  it('works', () => {
    let renderer = createRenderer()
    renderer.render(<Files name="Jane" />)
    let actualElement = renderer.getRenderOutput()
    let expectedElement = <h1>Hello, Jane</h1>
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
