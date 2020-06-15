import React from 'react'
import Enzyme, { mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import Files from '../src'

Enzyme.configure({ adapter: new EnzymeAdapter() })

// Add DOM environment
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

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

  it('allows us to set a class name', () => {
    const wrapper = mount(<Files className='files-dropzone' />)
    expect(wrapper.find('div.files-dropzone')).to.have.length(1)
  })

  it('allows us to set the "dragActiveClassName" prop', () => {
    const wrapper = mount(<Files dragActiveClassName={'files-dropzone-active'} />)
    expect(wrapper.props().dragActiveClassName).to.equal('files-dropzone-active')
  })

  it('allows us to call the "onChange" method prop', () => {
    const onChange = function () {
      return true
    }
    const wrapper = mount(<Files onChange={onChange} />)
    expect(wrapper.props().onChange()).to.equal(true)
  })

  it('allows us to call the "onError" method prop', () => {
    const onError = function () {
      return true
    }
    const wrapper = mount(<Files onError={onError} />)
    expect(wrapper.props().onError()).to.equal(true)
  })

  it('allows us to set the "accepts" prop', () => {
    const wrapper = mount(<Files accepts={['image/png', 'text/plain', 'audio/*']} />)
    expect(wrapper.props().accepts[0]).to.equal('image/png')
    expect(wrapper.props().accepts[1]).to.equal('text/plain')
    expect(wrapper.props().accepts[2]).to.equal('audio/*')
  })

  it('allows us to set the "multiple" prop', () => {
    const wrapper = mount(<Files multiple={false} />)
    expect(wrapper.props().multiple).to.equal(false)
  })

  it('allows us to set the "maxFiles" prop', () => {
    const wrapper = mount(<Files maxFiles={10} />)
    expect(wrapper.props().maxFiles).to.equal(10)
  })

  it('allows us to set the "maxFileSize" prop', () => {
    const wrapper = mount(<Files maxFileSize={10000} />)
    expect(wrapper.props().maxFileSize).to.equal(10000)
  })

  it('allows us to set the "minFileSize" prop', () => {
    const wrapper = mount(<Files minFileSize={5} />)
    expect(wrapper.props().minFileSize).to.equal(5)
  })

  // it('sets the url preview for an image file', () => {
  //   const files = [{
  //     name: 'image.png',
  //     size: 5000000,
  //     type: 'image/png'
  //   }]
  //
  //   const onChange = function (files) {
  //     console.log('here')
  //   }
  //
  //   const className = 'files-dropzone'
  //
  //   const wrapper = mount(<Files className={className} onChange={onChange} />)
  //   wrapper.find('.' + className).simulate('drop', { dataTransfer: { files } })
  // })
})
