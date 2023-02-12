React Files
=======================

A minimal, zero dependency, file input (dropzone) component for React.

If upgrading from version 1 or 2, see the [Upgrading to Version 3](#upgrading-to-version-3) section below.

![Alt text](/demo.gif?raw=true "Demo")

## Installation

Install using npm or yarn. Requires React 16.8+.

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

## Upgrading to Version 3

Most of the changes made to version 3 are internal, but there are some notable and breaking changes:
1. The most significant change is that `react-files` no longer manages state internally to track files that have been uploaded to a file list. This can be achieved quite simply however - please refer to the [`ListWithUpload` example](https://github.com/mother/react-files/blob/master/examples/ListWithUpload.js).
2. `dropActiveClassName` prop has been renamed to `dragActiveClassName`.
2. Removed unnecessary parent/wrapper `div` element. No more default values for `className` or `dragActiveClassName` props.
3. Ability to pass in a render prop with a prop that indicates whether a drag is in progress. See the [`RenderProps` example](https://github.com/mother/react-files/blob/master/examples/RenderProps.js).
4. Ability to pass in attributes to underlying input

For a full list of changes, please checkout the [v3.0.0 release changelog](https://github.com/mother/react-files/releases/tag/v3.0.0) or the [corresponding pull request](https://github.com/mother/react-files/pull/32).

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

To run the examples locally, clone and install peer dependencies (React 16.8+)

```
git clone https://github.com/mother/react-files
npm install
npm i react react-dom
```

Then run the examples server:
```
npm run examples
```

Then visit http://localhost:8080/

## License

MIT. Copyright (c) Mother Co. 2023
