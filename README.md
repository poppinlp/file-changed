# file-changed

[![Build Status][ci-img]][ci-url]
[![Code coverage][cov-img]][cov-url]
[![Code style][lint-img]][lint-url]
[![Dependency Status][dep-img]][dep-url]
[![Dev Dependency Status][dev-dep-img]][dev-dep-url]
[![NPM version][npm-ver-img]][npm-url]
[![NPM downloads][npm-dl-img]][npm-url]
[![NPM license][npm-lc-img]][npm-url]
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpoppinlp%2Ffile-changed.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpoppinlp%2Ffile-changed?ref=badge_shield)

A node module to check and store file changed.

## Install

By npm:

```shell
npm i file-changed --save
```

By yarn:

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

- path {String}: the target file path or glob

Return:

- `this` {Object}: for chain operation

### rmFile(path[, path2 ... pathN])

Remove files from collection.

Params:

- path {String}: the target file path or glob

Return:

- `this` {Object}: for chain operation

### check([path1 ... pathN])

Check collection files changed or not.

Arguments:

- no arguments: check all files.
- path {String}: the target file path or glob

Return:

- changed files {Array}

### update([path1 ... pathN])

Update files last modified information.

Arguments:

- no arguments: update all files
- path {String}: the target file path or glob

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
const Fc = require('file-changed');
const collectionA = new Fc('./path/to/save/info'); // Create collection instance whill will load modified info from that path if that path exists

collectionA.addFile('test/files/file1', 'test/files/file2'); // Add 2 files in collectionA

const fileList = collectionA.list(); // Get file list in collectionA

collectionA.rmFile('test/files/file1'); // Remove 1 file from collectionA

collectionA.addFile('test/files/*'); // Add file by glob

const modifiedList1 = collectionA.check('test/files/file1'); // Check 1 file modified or not
const modifiedList2 = collectionA.check()); // Check all files in collectionA modified or not

collectionA.update('test/files/file1'); // Update last modified info for 1 file
collectionA.update(); // Update last modified info for all files in collectionA

const lastModifiedTS = collectionA.get('test/files/file1'); // Get last modified timestamp for that file
const lastModifiedMD5 = collectionA.get('test/files/file1', 'md5'); // Get last modified md5 for that file

collectionA.save(); // Save collectionA modified info to disk
```

## Test

```shell
npm test
```

[ci-img]:https://img.shields.io/travis/poppinlp/file-changed.svg?style=flat-square
[ci-url]:https://travis-ci.org/poppinlp/file-changed

[cov-img]:https://img.shields.io/coveralls/poppinlp/file-changed.svg?style=flat-square
[cov-url]:https://coveralls.io/github/poppinlp/file-changed?branch=master

[lint-img]:https://img.shields.io/badge/code%20style-handsome-brightgreen.svg?style=flat-square
[lint-url]:https://github.com/poppinlp/eslint-config-handsome

[dep-img]:https://img.shields.io/david/poppinlp/file-changed.svg?style=flat-square
[dep-url]:https://david-dm.org/poppinlp/file-changed

[dev-dep-img]:https://img.shields.io/david/dev/poppinlp/file-changed.svg?style=flat-square
[dev-dep-url]:https://david-dm.org/poppinlp/file-changed#info=devDependencies

[npm-ver-img]:https://img.shields.io/npm/v/file-changed.svg?style=flat-square
[npm-dl-img]:https://img.shields.io/npm/dm/file-changed.svg?style=flat-square
[npm-lc-img]:https://img.shields.io/npm/l/file-changed.svg?style=flat-square
[npm-url]:https://www.npmjs.com/package/file-changed


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpoppinlp%2Ffile-changed.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpoppinlp%2Ffile-changed?ref=badge_large)