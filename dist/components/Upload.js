"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.promise.js");

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

var _clsx = _interopRequireDefault(require("clsx"));

var _UploadFile = _interopRequireDefault(require("@mui/icons-material/UploadFile"));

var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const GridDragAndDrop = (0, _styles.styled)(_material.Grid)(_ref => {
  let {
    theme
  } = _ref;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing(1),
    zIndex: 3,
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
      marginLeft: 0
    },
    '&.onDragging': {
      backgroundColor: '#eeeeee',
      filter: 'brightness(0.5)'
    }
  };
});
const Input = (0, _styles.styled)('input')({
  display: 'none'
});

const UploadComponent = _ref2 => {
  let {
    setData,
    setFileName,
    setSize,
    containerProps,
    CustomIcon,
    showDelete,
    stylesImage,
    stylesImage2,
    clickWhole,
    showIconUpload,
    data,
    isFormik,
    getFileSize,
    helperText,
    onError,
    NextImage,
    React
  } = _ref2;
  const [dragging, setDragging] = React.useState(false);
  const [loadingImage, setLoadingImage] = React.useState(false);
  const [photo, setPhoto] = React.useState('');
  const upLoadRef = React.useRef(null);
  React.useEffect(() => {
    if (data) {
      setPhoto(data);
    }

    ;
  }, [data]);

  const handleChange = e => {
    // console.log(e.target.value);
    if (e.target.files && e.target.files[0] && !e.target.files[0].type.includes('image/')) {
      if (onError && typeof onError === 'function') {
        onError();
      }

      return;
    }

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      const fileName = e.target.files[0].name;
      const file = e.target.files[0];

      reader.onload = async e => {
        setPhoto(e.target.result);
        setLoadingImage(true);

        if (setFileName) {
          setFileName(fileName);
        }

        if (setSize) {
          const newImg = new window.Image();
          newImg.src = e.target.result;

          newImg.onload = function () {
            setSize({
              width: this.width,
              height: this.height
            });
          };
        }

        if (setData) {
          if (isFormik) {
            setData(file, e.target.result);
          } else {
            setData(e.target.result);
          }
        }

        if (getFileSize) {
          getFileSize(file === null || file === void 0 ? void 0 : file.size);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const dropHandler = ev => {
    setDragging(false); // Prevent default behavior (Prevent file from being opened)

    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();

          if (file.type.includes('image/')) {
            let reader = new FileReader();

            reader.onload = async e => {
              setPhoto(e.target.result);
              setLoadingImage(true);

              if (setFileName) {
                setFileName(file.name);
              }

              if (setSize) {
                const newImg = new window.Image();
                newImg.src = e.target.result;

                newImg.onload = function () {
                  setSize({
                    width: this.width,
                    height: this.height
                  });
                };
              }

              if (setData) {
                if (isFormik) {
                  setData(file, e.target.result);
                } else {
                  setData(e.target.result);
                }
              }

              if (getFileSize) {
                getFileSize(file === null || file === void 0 ? void 0 : file.size);
              }
            };

            reader.readAsDataURL(file);
          } else {
            if (onError && typeof onError === 'function') {
              onError();
            }
          }
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        if (ev.dataTransfer.files[i].type.includes('image/')) {
          let reader = new FileReader();

          reader.onload = async e => {
            setPhoto(e.target.result);
            setLoadingImage(true);

            if (setFileName) {
              setFileName(ev.dataTransfer.files[i].name);
            }

            if (setSize) {
              const newImg = new window.Image();
              newImg.src = e.target.result;

              newImg.onload = function () {
                setSize({
                  width: this.width,
                  height: this.height
                });
              };
            }

            if (setData) {
              if (isFormik) {
                setData(ev.dataTransfer.files[i], e.target.result);
              } else {
                setData(e.target.result);
              }
            }

            if (getFileSize) {
              var _ev$dataTransfer$file;

              getFileSize((_ev$dataTransfer$file = ev.dataTransfer.files[i]) === null || _ev$dataTransfer$file === void 0 ? void 0 : _ev$dataTransfer$file.size);
            }
          };

          reader.readAsDataURL(ev.dataTransfer.files[i]);
        } else {
          if (onError && typeof onError === 'function') {
            onError();
          }
        }
      }
    }
  };

  const dragOverHandler = ev => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  };

  const dragLeaveHandler = ev => {
    setDragging(false); // Prevent default behavior (Prevent file from being opened)

    ev.preventDefault();
  };

  const dragEnterHandler = ev => {
    setDragging(true); // Prevent default behavior (Prevent file from being opened)

    ev.preventDefault();
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Grid, _objectSpread(_objectSpread({}, containerProps), {}, {
    onClick: () => {
      if (clickWhole && upLoadRef !== null && upLoadRef !== void 0 && upLoadRef.current) {
        upLoadRef.current.click();
      }
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(GridDragAndDrop, {
      onDrop: dropHandler,
      onDragOver: dragOverHandler,
      onDragLeave: dragLeaveHandler,
      onDragEnter: dragEnterHandler,
      item: true,
      xs: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      className: (0, _clsx.default)({
        'onDragging': dragging
      })
    }), (photo === null || photo === void 0 ? void 0 : photo.length) > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", _objectSpread(_objectSpread({
      style: {
        borderRadius: '50%',
        overflow: 'hidden',
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, stylesImage), {}, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", _objectSpread(_objectSpread({
        style: {
          display: loadingImage ? 'none' : 'flex',
          overflow: 'hidden',
          position: 'relative'
        }
      }, stylesImage2), {}, {
        children: [showDelete && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
          sx: {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 10,
            opacity: 0.5,
            '&:hover': {
              opacity: 1
            }
          },
          onClick: () => {
            setLoadingImage(false);
            setPhoto('');
          },
          "aria-label": "delete",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Delete.default, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            width: '100%',
            height: '100%',
            position: 'relative'
          },
          children: NextImage && React.isValidElement( /*#__PURE__*/(0, _jsxRuntime.jsx)(NextImage, {})) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(NextImage, {
            src: photo,
            alt: "Photo",
            layout: "fill",
            quality: 100,
            objectFit: "cover",
            onLoadingComplete: () => setLoadingImage(false),
            priority: true
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: photo,
            alt: "Photo",
            style: {
              width: '100%',
              height: '100%'
            },
            onLoad: () => setLoadingImage(false)
          })
        })]
      }))
    })), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Grid, {
      item: true,
      xs: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Input, {
        onChange: handleChange,
        ref: upLoadRef,
        accept: "image/*",
        id: "icon-button-file",
        type: "file"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.IconButton, {
        sx: {
          '&:hover': {
            backgroundColor: 'transparent'
          },
          '&.onDragging': {
            backgroundColor: '#eeeeee',
            filter: 'brightness(0.5)'
          },
          position: 'relative',
          maxWidth: '70%',
          maxHeight: '70%'
        },
        disableFocusRipple: true,
        disableRipple: true,
        color: "primary",
        "aria-label": "upload picture",
        component: "span",
        children: !(photo !== null && photo !== void 0 && photo.length) > 0 && showIconUpload && (CustomIcon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(CustomIcon, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_UploadFile.default, {
          style: {
            width: 100,
            height: 100,
            backgroundColor: '#bdbdbd',
            borderRadius: '50%',
            padding: 10,
            color: 'white'
          }
        }))
      })]
    }), !photo && showIconUpload && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
      item: true,
      xs: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
        variant: "caption",
        sx: {
          px: 2
        },
        align: "center",
        children: helperText || 'Select a photo from the gallery or drag and drop it here.'
      })
    })]
  }));
};

var _default = UploadComponent;
exports.default = _default;