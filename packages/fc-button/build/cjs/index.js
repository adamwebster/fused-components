'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Button = React__default["default"].forwardRef(function (_a, ref) {
    var children = _a.children;
    return (React__default["default"].createElement("button", { ref: ref }, children));
});

exports.Button = Button;
