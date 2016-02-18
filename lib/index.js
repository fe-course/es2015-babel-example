'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _copy = require('./copy');

var _copy2 = _interopRequireDefault(_copy);

var _download = require('./download');

var _download2 = _interopRequireDefault(_download);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [callbackify description]
 * @param  {[type]} function download(source, target, progress [description]
 * @return {[type]}          [description]
 */
exports.default = (0, _util.callbackify)(function download(source, target, progress) {
  target = target || (0, _util.randomFilename)(download.tmpDir);
  progress = progress || _util.noop;
  return new Promise(function (resolve, reject) {

    (0, _mkdirp2.default)(_path2.default.dirname(target), function (err) {
      if (err) return callback(err);

      resolve(((0, _util.isURL)(source) ? _download2.default : _copy2.default)(source, target, progress));
    });
  });
});