/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Files = function (_React$Component) {
	  _inherits(Files, _React$Component);

	  function Files(props, context) {
	    _classCallCheck(this, Files);

	    var _this = _possibleConstructorReturn(this, (Files.__proto__ || Object.getPrototypeOf(Files)).call(this, props, context));

	    _this.onDrop = _this.onDrop.bind(_this);
	    _this.onDragEnter = _this.onDragEnter.bind(_this);
	    _this.onDragLeave = _this.onDragLeave.bind(_this);
	    _this.openFileChooser = _this.openFileChooser.bind(_this);

	    _this.id = 1;

	    _this.state = {
	      files: []
	    };
	    return _this;
	  }

	  _createClass(Files, [{
	    key: 'onDrop',
	    value: function onDrop(event) {
	      var _this2 = this;

	      event.preventDefault();
	      this.onDragLeave(event);

	      // Collect added files, perform checking, cast pseudo-array to Array,
	      // then return to method
	      var filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files;

	      // Multiple files dropped when not allowed
	      if (this.props.multiple === false && filesAdded.length > 1) {
	        filesAdded = [filesAdded[0]];
	      }

	      var files = [];
	      for (var i = 0; i < filesAdded.length; i++) {
	        var file = filesAdded[i];

	        // Assign file an id
	        file.id = 'files-' + this.id++;

	        // Tell file it's own extension
	        file.extension = this.fileExtension(file);

	        // Tell file it's own readable size
	        file.sizeReadable = this.fileSizeReadable(file.size);

	        // Add preview, either image or file extension
	        if (file.type && this.mimeTypeLeft(file.type) === 'image') {
	          file.preview = {
	            type: 'image',
	            url: window.URL.createObjectURL(file)
	          };
	        } else {
	          file.preview = {
	            type: 'file'
	          };
	        }

	        // Check for file max limit
	        if (this.state.files.length + files.length >= this.props.maxFiles) {
	          this.onError({
	            code: 4,
	            message: 'maximum file count reached'
	          }, file);
	          break;
	        }

	        // If file is acceptable, push or replace
	        if (this.fileTypeAcceptable(file) && this.fileSizeAcceptable(file)) {
	          files.push(file);
	        }
	      }
	      this.setState({
	        files: this.props.multiple === false ? files : [].concat(_toConsumableArray(this.state.files), files)
	      }, function () {
	        _this2.props.onChange.call(_this2, _this2.state.files);
	      });
	    }
	  }, {
	    key: 'onDragOver',
	    value: function onDragOver(event) {
	      event.preventDefault();
	      event.stopPropagation();
	    }
	  }, {
	    key: 'onDragEnter',
	    value: function onDragEnter(event) {
	      var el = document.getElementsByClassName(this.props.className)[0];
	      el.className += ' ' + this.props.dropActiveClassName;
	    }
	  }, {
	    key: 'onDragLeave',
	    value: function onDragLeave(event) {
	      var el = document.getElementsByClassName(this.props.className)[0];
	      el.className = el.className.replace(' ' + this.props.dropActiveClassName, '');
	    }
	  }, {
	    key: 'openFileChooser',
	    value: function openFileChooser() {
	      this.inputElement.value = null;
	      this.inputElement.click();
	    }
	  }, {
	    key: 'fileTypeAcceptable',
	    value: function fileTypeAcceptable(file) {
	      var accepts = this.props.accepts;
	      if (accepts) {
	        if (file.type) {
	          var typeLeft = this.mimeTypeLeft(file.type);
	          var typeRight = this.mimeTypeRight(file.type);
	          for (var i = 0; i < accepts.length; i++) {
	            var accept = accepts[i];
	            var acceptLeft = accept.split('/')[0];
	            var acceptRight = accept.split('/')[1];
	            if (acceptLeft && acceptRight) {
	              if (acceptLeft === typeLeft && acceptRight === '*') {
	                return true;
	              }
	              if (acceptLeft === typeLeft && acceptRight === typeRight) {
	                return true;
	              }
	            }
	          }
	        }
	        this.onError({
	          code: 1,
	          message: file.name + ' is not a valid file type'
	        }, file);
	        return false;
	      } else {
	        return true;
	      }
	    }
	  }, {
	    key: 'fileSizeAcceptable',
	    value: function fileSizeAcceptable(file) {
	      if (file.size > this.props.maxFileSize) {
	        this.onError({
	          code: 2,
	          message: file.name + ' is too large'
	        }, file);
	        return false;
	      } else if (file.size < this.props.minFileSize) {
	        this.onError({
	          code: 3,
	          message: file.name + ' is too small'
	        }, file);
	        return false;
	      } else {
	        return true;
	      }
	    }
	  }, {
	    key: 'mimeTypeLeft',
	    value: function mimeTypeLeft(mime) {
	      return mime.split('/')[0];
	    }
	  }, {
	    key: 'mimeTypeRight',
	    value: function mimeTypeRight(mime) {
	      return mime.split('/')[1];
	    }
	  }, {
	    key: 'fileExtension',
	    value: function fileExtension(file) {
	      var extensionSplit = file.name.split('.');
	      if (extensionSplit.length > 1) {
	        return extensionSplit[extensionSplit.length - 1];
	      } else {
	        return 'none';
	      }
	    }
	  }, {
	    key: 'fileSizeReadable',
	    value: function fileSizeReadable(size) {
	      if (size >= 1000000000) {
	        return Math.ceil(size / 1000000000) + 'GB';
	      } else if (size >= 1000000) {
	        return Math.ceil(size / 1000000) + 'MB';
	      } else if (size >= 1000) {
	        return Math.ceil(size / 1000) + 'kB';
	      } else {
	        return Math.ceil(size) + 'B';
	      }
	    }
	  }, {
	    key: 'onError',
	    value: function onError(error, file) {
	      this.props.onError.call(this, error, file);
	    }
	  }, {
	    key: 'removeFile',
	    value: function removeFile(fileToRemove) {
	      var _this3 = this;

	      this.setState({
	        files: this.state.files.filter(function (file) {
	          return file.id !== fileToRemove.id;
	        })
	      }, function () {
	        _this3.props.onChange.call(_this3, _this3.state.files);
	      });
	    }
	  }, {
	    key: 'removeFiles',
	    value: function removeFiles() {
	      var _this4 = this;

	      this.setState({
	        files: []
	      }, function () {
	        _this4.props.onChange.call(_this4, _this4.state.files);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this5 = this;

	      var inputAttributes = {
	        type: 'file',
	        accept: this.props.accepts ? this.props.accepts.join() : '',
	        multiple: this.props.multiple ? this.props.multiple : true,
	        style: { display: 'none' },
	        ref: function ref(element) {
	          _this5.inputElement = element;
	        },
	        onChange: this.onDrop
	      };

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('input', inputAttributes),
	        _react2.default.createElement(
	          'div',
	          { className: this.props.className,
	            onClick: this.props.clickable === true ? this.openFileChooser : null,
	            onDrop: this.onDrop,
	            onDragOver: this.onDragOver,
	            onDragEnter: this.onDragEnter,
	            onDragLeave: this.onDragLeave
	          },
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return Files;
	}(_react2.default.Component);

	Files.propTypes = {
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node), _react2.default.PropTypes.node]),
	  className: _react2.default.PropTypes.string.isRequired,
	  dropActiveClassName: _react2.default.PropTypes.string,
	  onChange: _react2.default.PropTypes.func,
	  onError: _react2.default.PropTypes.func,
	  accepts: _react2.default.PropTypes.array,
	  multiple: _react2.default.PropTypes.bool,
	  maxFiles: _react2.default.PropTypes.number,
	  maxFileSize: _react2.default.PropTypes.number,
	  minFileSize: _react2.default.PropTypes.number,
	  clickable: _react2.default.PropTypes.bool
	};

	Files.defaultProps = {
	  onChange: function onChange(files) {
	    console.log(files);
	  },
	  onError: function onError(error, file) {
	    console.log('error code ' + error.code + ': ' + error.message);
	  },
	  className: 'files-dropzone',
	  dropActiveClassName: 'files-dropzone-active',
	  accepts: null,
	  multiple: true,
	  maxFiles: Infinity,
	  maxFileSize: Infinity,
	  minFileSize: 0,
	  clickable: true
	};

	exports.default = Files;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = react;

/***/ }
/******/ ]);