"use strict";

/**
 * IP address codec module
 * @module ip-codec
 * @author Huangliun <hlj8080@gmail.com>
 */

/** 
 * IpCodec is tool for converting a ip adress to a ascii string and vice versa.
 * The string contains 6 characters and consists only of '1-9a-zA-Z'.
 * @class
 * @param {number} initSeed A seed for encoder and decoder. Diffrent value get the diffrent result.
 */
function IpCodec(initSeed) {
  if (!initSeed || typeof initSeed !== 'number') {
    initSeed = 213;
  } else {
    initSeed += 213;
  }

  // characters table
  this.__chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYZ';
  // must not in chars.
  this.__padChars = 'XXXXXX'

  var len = this.__chars.length - 1;
  var r = initSeed % Math.floor(len / 2);
  var v = Math.floor(initSeed / len) + 1;
  for (var i = 0; i < v; i++) {
    var s = this.__chars.substring(r);
    var e = this.__chars.substring(0, r).split('').reverse().join('');
    this.__chars = s + e;
  }
}

/**
 * encode ip address to string.
 * @param {string} ip The ip address.
 * @return {string} The encoded text. If the parameter 'ip' is not a valid ip address, return itself.
 */
IpCodec.prototype.encode = function(ip) {
  var pattern = new RegExp("^([1-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3}$");
  ip = ip.toString();
  if (!pattern.test(ip)) {
    return ip;
  }
  var parts = ip.split('.');
  var value = (parseInt(parts[0]) << 24 >>> 0) +
    (parseInt(parts[1]) << 16 >>> 0) +
    (parseInt(parts[2]) << 8 >>> 0) +
    parseInt(parts[3]);
  var result = this.__intToString(value, '');
  if (result.length < this.__padChars.length) {
    result = (this.__padChars + result).slice(-this.__padChars.length);
  }
  return result;
}

/**
 * decode string to ip address.
 * @param {string} encodedText The encoded string.
 * @return {string} The ip address.
 */
IpCodec.prototype.decode = function(encodedText) {
  if (typeof encodedText !== 'string') {
    throw new Error("ERROR: encodeText must be a string");
  }

  var padPattern = new RegExp(this.__padChars[0], 'g');
  var realText = encodedText.replace(padPattern, '');
  var value = 0;
  var idx = 0;
  var charNums = this.__chars.length - 1;
  for (var i = realText.length - 1; i >= 0; i--) {
    idx = this.__chars.indexOf(realText[i]);
    value += idx * Math.pow(charNums, i);
  }
  var nums = [];
  nums.push(value >>> 24);
  nums.push((value & 0x00FFFFFF) >>> 16);
  nums.push((value & 0x0000FFFF) >>> 8);
  nums.push((value & 0x000000FF));
  return nums.join('.');
}


IpCodec.prototype.__intToString = function(value, str) {
  var charNums = this.__chars.length - 1;
  var r = value % charNums;
  str += this.__chars[r];
  var v = Math.floor(value / charNums);
  if (v <= charNums) {
    return str + this.__chars[v];
  }
  return this.__intToString(v, str);
}

exports = module.exports = IpCodec;