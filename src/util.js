import path from 'path';
import os from 'os';

let getTmpDir = os.tmpdir || os.tmpDir;

function randomString(size = 6, chars = 'abcdefghijklmnopqrstuvwxyz0123456789') {
  let max = chars.length + 1;
  let str = '';
  while (size > 0) {
    str += chars.charAt(Math.floor(Math.random() * max));
    size--;
  }
  return str;
}

/**
 * [randomFilename description]
 * @param  {[type]} tmpDir =             getTmpDir( [description]
 * @return {[type]}        [description]
 */
export function randomFilename(tmpDir = getTmpDir()) {
  return path.resolve(tmpDir, randomString(20));
}

/**
 * [isURL description]
 * @param  {[type]}  url [description]
 * @return {Boolean}     [description]
 */
export function isURL (url) {
  if (url.substr(0, 7) === 'http://') return true;
  if (url.substr(0, 8) === 'https://') return true;
  return false;
}

/**
 * [noop description]
 * @return {[type]} [description]
 */
export function noop() { }

/**
 * [callbackify description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
export function callbackify(fn) {
  let argc = fn.length;
  return (...args) => {
    let callback = args[argc];
    if (typeof callback !== 'function') callback = null;
    return fn(...args)
      .then(ret => {
        callback && callback(null, ret);
        return Promise.resolve(ret);
      })
      .catch(err => {
        callback && callback(err);
        return Promise.reject(err);
      });
  }
}
