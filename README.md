# file-changed

[![Build Status][ci-img]][ci-url]
[![Code Coverage][cov-img]][cov-url]
[![Dependency Status][dep-img]][dep-url]
[![Dev Dependency Status][dev-dep-img]][dev-dep-url]
[![NPM version][npm-ver-img]][npm-url]
[![NPM downloads][npm-dl-img]][npm-url]
[![NPM license][npm-lc-img]][npm-url]

A node module to check and store file changed.

## Getting Started

Install with this command:

```shell
npm i file-changed --save
```

or maybe you like yarn:

```shell
yarn add file-changed
```

## Class

This package export a class since version 1.0.0 which means you could have multiple instances ans save the information where you like.

### constructor([dbPath])

Params:

- dbPath {String}: path to save collection information on disk, default is `./_timestamp.json`

Return:

- collection instance {Object}

## Instance Methods

### get(file[, type])

Access to a file last modified information.

Params:

- file {String}: the target file path
- type {String}: the information type
  - `ts`: timestamp (default)
  - `md5`: md5 hash

Return:

- `false` {Boolean}: no such file in collection
- timestamp or md5 {String}: depends on `type`

### list()

Get all file paths in collection.

Return:

- file paths {Array}

### addFile(path[, path2 ... pathN])

Add files to collection.

Params:

- path {String}: the target file path

Return:

- `this` {Object}: for chain operation

### rmFile(path[, path2 ... pathN])

Remove files from collection.

Params:

- path {String}: the target file path

Return:

- `this` {Object}: for chain operation

### check([path1 ... pathN])

Check collection files changed or not.

Arguments:

- no arguments: check all files
- path {String}: check these files only

Return:

- changed files {Array}

### update([path1 ... pathN])

Update files last modified information.

Arguments:

- no arguments: update all files
- path {String}: update these files only

Return:

- `this` {Object}: for chain operation

### clean()

Clean files in collection which could not found.

Return:

- `this` {Object}: for chain operation

### save()

Save collection information onto disk.

Return:

- `this` {Object}: for chain operation

## Usage Examples

```js
const
	Fc = require('file-changed'),
	collectionA = new Fc('./path/to/save/info');

console.log(collectionA.addFile('test/files/file1', 'test/files/file2').list());

console.log(collectionA.rmFile('test/files/file1').list());

collectionA.addFile('test/files/file1');
console.log(collectionA.check('test/files/file1'));
console.log(collectionA.check());

collectionA.update('test/files/file1').update();

console.log(collectionA.get('test/files/file1'));
console.log(collectionA.get('test/files/file1', 'md5'));

collectionA.save();
```

## Test

```shell
npm test
```

[ci-img]:https://img.shields.io/travis/poppinlp/file-changed.svg?style=flat-square
[ci-url]:https://travis-ci.org/poppinlp/file-changed

[cov-img]:https://img.shields.io/codecov/poppinlp/github/codecov/file-changed.svg
[cov-url]:https://codecov.io/gh/poppinlp/file-changed

[dep-img]:https://img.shields.io/david/poppinlp/file-changed.svg?style=flat-square
[dep-url]:https://david-dm.org/poppinlp/file-changed

[dev-dep-img]:https://img.shields.io/david/dev/poppinlp/file-changed.svg?style=flat-square
[dev-dep-url]:https://david-dm.org/poppinlp/file-changed#info=devDependencies

[npm-ver-img]:https://img.shields.io/npm/v/file-changed.svg?style=flat-square
[npm-dl-img]:https://img.shields.io/npm/dm/file-changed.svg?style=flat-square
[npm-lc-img]:https://img.shields.io/npm/l/file-changed.svg?style=flat-square
[npm-url]:https://www.npmjs.com/package/file-changed
