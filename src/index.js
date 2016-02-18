import os from 'os';
import path from 'path';
import mkdirp from 'mkdirp';
import copyFile from './copy';
import downloadFile from './download';
import { randomFilename, isURL, noop, callbackify } from './util';

/**
 * [callbackify description]
 * @param  {[type]} function download(source, target, progress [description]
 * @return {[type]}          [description]
 */
export default callbackify(function download(source, target, progress) {
  target = target || randomFilename(download.tmpDir);
  progress = progress || noop;
  return new Promise((resolve, reject) => {

    mkdirp(path.dirname(target), err => {
      if (err) return callback(err);

      resolve((isURL(source) ? downloadFile : copyFile)
        (source, target, progress));
    });

  });
});
