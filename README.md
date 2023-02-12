React Files
=======================

A minimal, zero dependency, file input (dropzone) component for React

![Alt text](/demo.gif?raw=true "Demo")

## Installation

Install from npm or yarn. Requires React 16.8+.

```bash
npm install react-files --save
```

## Basic Usage

```js
import React from 'react'
import Files from 'react-files'

const FileDropzone = () => {
  const handleChange = (files) => {
    console.log(files)
  }

  const handleError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  return (
    <div className="files">
      <Files
        className='files-dropzone'
        onChange={handleChange}
        onError={handleError}
        accepts={['image/png', '.pdf', 'audio/*']}
        multiple
        maxFileSize={10000000}
        minFileSize={0}
        clickable>
        Drop files here or click to upload
      </Files>
    </div>
  )
}
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

Control what types of generic/specific MIME types or file extensions can be dropped/added.

> See full list of MIME types here: http://www.iana.org/assignments/media-types/media-types.xhtml

Example:
```js
accepts={['image/*', 'video/mp4', 'audio/*', '.pdf']}
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

`dragActiveClassName` - *String*

Class added to the Files component when user is actively hovering over the dropzone with files selected.

---

## Examples

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
npm run demo
```

Then visit http://localhost:8080/

## License

MIT. Copyright (c) Mother Co. 2023
