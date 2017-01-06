var IpCodec = require('../lib/index');
var assert = require('assert');



function testEncode() {
  var codec = new IpCodec();
  var str = codec.encode('12.23.13.1');
  assert.equal(str.length, 6, "encoded string's length should be 6");
  assert.ok(/^[0-9a-zA-Z]*$/.test(str), "encoded string only consist of 0-9a-zA-Z");
  assert.equal(codec.encode('123.2'), '123.2', "if not a valid ip, return itself");
}

function testDeCode() {
  var codec = new IpCodec();
  var str = codec.encode('12.23.13.1');
  var ip = codec.decode(str);
  assert.equal(ip, '12.23.13.1', "can decode string to ip address");
  assert.doesNotThrow(function() { codec.decode('aaa') }, "can decode any string even is not a valid ip");
}

function testInitSeed() {
  var codec1 = new IpCodec();
  var codec2 = new IpCodec(123);
  assert.notEqual(codec1.encode('1.1.1.1'), codec2.encode('1.1.1.1'), "diffrent seed get different result");
  var codec3 = new IpCodec('afabc');
  assert.equal(codec1.encode('1.1.1.1'), codec3.encode('1.1.1.1'), "not valid parameter as default seed");
}

testEncode();
testDeCode();
testInitSeed();