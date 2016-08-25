react-files
=======================

> A file input (dropzone) management component for React

## Demo

![Alt text](/demo.gif?raw=true "Demo")

## Installation

Install from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```
npm install react-files --save
```

## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Files from 'react-files'

var FilesDemo = React.createClass({
  onSubmit: function(files) {
    console.log(files)
  },

  onError: function(error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
  },

  render: function() {
    return (
      <div className="files">
        <Files
          onSubmit={this.onSubmit}
          onError={this.onError}
          maxFiles={10}
          maxSize={10000000}
          minSize={1000}
        />
      </div>
    )
  }
})

ReactDOM.render(<FilesDemo />, document.getElementById('container'))
```

### Props


> `onSubmit(files)` - Function

Perform work on files added when submit is clicked.

---

> `onError(error, file)` - Function

`error.code` - Number

`error.message` - String

Perform work or notify the user when an error occurs.

Error codes are:
1. Invalid file type
2. File too large
3. File too small
4. Maximum file count reached

---

> `accepts` - Array of String

Control what types of generic/specific MIME types, or specific extensions can be dropped/added.

Example
```js
accepts={['image/*', 'video/mp4', 'audio/*', '.pdf', '.txt']}
```

---

> `maxFiles` - Number

Maximum number of files allowed

---

> `maxSize` - Number

Maximum file size allowed (in bytes)

---

> `minSize` - Number

Minimum file size allowed (in bytes)

---

### Styling

Be sure to style your Files component, available selectors are (view `style.css`):
- .files-container
- .files-dropzone-outer
- .files-dropzone
- .files-dropzone:before
- .files-dropzone-ondragenter
- .files-buttons
- .files-button-submit
- .files-button-submit:before
- .files-button-clear
- .files-button-clear:before
- .files-list
- .files-list ul
- .files-list li:last-child
- .files-list-item
- .files-list-item-content
- .files-list-item-content-item
- .files-list-item-content-item-1
- .files-list-item-content-item-2
- .files-list-item-preview
- .files-list-item-preview-image
- .files-list-item-preview-extension
- .files-list-item-remove
- .files-list-item-remove-image

### Test (todo)

```
npm test
```

### Tinker

```
git clone https://github.com/mother/react-files
npm install
npm start
```

### License

MIT. Copyright (c) 2016 Jared Reich.
