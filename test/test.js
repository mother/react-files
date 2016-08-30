import React from 'react'
import { mount } from 'enzyme'
// import sinon from 'sinon'
import { expect } from 'chai'
import { describe, it } from 'mocha'

// Add DOM environment
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

import Files from '../src/Files'

describe('<Files />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Files bar='baz' />)
    expect(wrapper.props().bar).to.equal('baz')
    wrapper.setProps({ bar: 'foo' })
    expect(wrapper.props().bar).to.equal('foo')
  })

  it('renders children props', () => {
    const wrapper = mount(
      <Files>
        <div className='files-child'>child content</div>
      </Files>
    )
    expect(wrapper.containsMatchingElement(
      <div className='files-child'>child content</div>
    )).to.equal(true)
  })
})
