/**
 * @copyright Copyright 2016 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

'use strict';

var BBPromise = require('bluebird').Promise;
// eslint-disable-next-line no-undef
var PPromise = typeof Promise === 'function' ? Promise : BBPromise;
var execFile = require('child_process').execFile;
var pify = require('pify');

var execFileP = pify(execFile, PPromise, {multiArgs: true});

/**
 * Run git with given arguments and options.
 * @return {Promise} Promise with the process output or Error for non-0 exit.
 */
function git(/* [args...], [options] */) {
  // Default to redirecting stdin (to prevent unexpected prompts) and
  // including any output with test output
  var defaultStdio = ['ignore', process.stdout, process.stderr];

  var args, options;
  if (typeof arguments[arguments.length - 1] === 'object') {
    args = Array.prototype.slice.call(arguments);
    options = args.pop();
    options.stdio = options.stdio || defaultStdio;
  } else {
    // Note:  execFile/spawn requires Array type for arguments
    args = Array.prototype.slice.call(arguments);
    options = {
      stdio: defaultStdio
    };
  }

  return execFileP('git', args, options);
}

module.exports = git;
