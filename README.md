# ip-codec
[![npm](https://img.shields.io/npm/v/ip-codec.svg)](https://www.npmjs.com/package/ip-codec)   [![build status](https://travis-ci.org/hlj/ip-codec.svg?branch=master)](https://travis-ci.org/hlj/ip-codec)

A simple tool for converting IP address to ascii string.

It's only supports IPv4 now.

## Installation

npm

```shell
npm install ip-codec
```

## Usage

* encode & decode IP address

```javascript

var IpCodec = require('ip-codec');
var codec = new IpCodec();
// valid IP
codec.encode('192.168.1.1');  // "tsfAlg"
codec.decode('tsfAlg');       // "192.168.1.1"
// invalid IP
codec.encode('a.b');          // 'a.b', return itself
codec.decode('a.b');          // '0.3.47.159', meaningless result
```

* use diffrent seed.

```javascript
var IpCodec = require('ip-codec');
var codec = new IpCodec();
var codec1 = new IpCodec(1);
var codec2 = new IpCodec(22023);
// different result
codec.encode('192.168.1.1');   // "tsfAlg"
codec1.encode('192.168.1.1');  // "xwjEpk"
codec2.encode('192.168.1.1');  // "jk96f8"
// ignore invalid seed
var codec4 = new IpCodec('a invalid seed');
codec4.encode('192.168.1.1');   // "tsfAlg"
```