react-files
=======================

> A file input (dropzone) management component for React

## Demo

![Alt text](/demo.gif?raw=true "Demo")

## Installation

Install from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```bash
npm install react-files --save
```

## Usage

#### Basic

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Files from 'react-files'

var FilesDemo = React.createClass({
  onFilesChange: function (files) {
    console.log(files)
  },

  onFilesError: function (error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
  },

  render: function() {
    return (
      <div className="files">
        <Files
          className='files-dropzone'
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          accepts={['image/png', 'text/plain', 'audio/*']}
          multiple
          maxFiles={3}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
      </div>
    )
  }
})

ReactDOM.render(<FilesDemo />, document.getElementById('container'))
```

#### Advanced

See "Tinker" instructions below to run and view all examples.

### Tinker

```
git clone https://github.com/mother/react-files
npm install
```
And since React is just a peer dependency:
```
npm install react
```
Then:
```
npm run dev
```

Then visit http://localhost:8080/

### Build

```
npm run build
```

## Props

`onChange(files)` - *Function*

Perform work on files added when submit is clicked.

---

`onError(error, file)` - *Function*
  - `error.code` - Number
  - `error.message` - String

Perform work or notify the user when an error occurs.

Error codes are:
1. Invalid file type
2. File too large
3. File too small
4. Maximum file count reached

---

`accepts` - *Array* of *String*

Control what types of generic/specific MIME types, can be dropped/added.

> See full list of MIME types here: http://www.iana.org/assignments/media-types/media-types.xhtml

Example:
```js
accepts={['image/*', 'video/mp4', 'audio/*']}
```

---

`multiple` - *Boolean*

Default: `true`

Allow multiple files

---

`clickable` - *Boolean*

Default: `true`

Dropzone is clickable to open file browser. Disable for dropping only.

---

`maxFiles` - *Number*

Default: `Infinity`

Maximum number of files allowed

---

`maxFileSize` - *Number*

Default: `Infinity`

Maximum file size allowed (in bytes)

---

`minFileSize` - *Number*

Default: `0`

Minimum file size allowed (in bytes)

---

`dropActiveClassName` - *String*

Default: `'files-dropzone-active'`

Class added to the Files component when user is actively hovering over the dropzone with files selected.

---

### Test (todo)

```
npm test
```

### License

MIT. Copyright (c) 2016 Jared Reich.
