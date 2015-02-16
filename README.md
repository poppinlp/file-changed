# file-changed

[![Build Status](https://travis-ci.org/poppinlp/file-changed.png?branch=master)](https://travis-ci.org/poppinlp/file-changed)
[![Dependency Status](https://david-dm.org/poppinlp/file-changed.svg)](https://david-dm.org/poppinlp/file-changed)
[![devDependency Status](https://david-dm.org/poppinlp/file-changed/dev-status.svg)](https://david-dm.org/poppinlp/file-changed#info=devDependencies)

Node module to check file changed in collection.

### Getting Started

Install with this command:

```shell
npm install file-changed --save
```

### API

#### get(file[, type])

Access to a file last modified information. `type` could be `ts` for timestamp (default) or `md5` for md5 hash.

Return `false` for no such file in collection. Return timestamp or md5 value depends on `type`.

#### addFile(path[, path2 ... pathN])

Add files to collection.

Return `this` for chain operation.

#### rmFile(path[, path2 ... pathN])

Remove files from collection.

Return `this` for chain operation.

#### check([path1 ... pathN])

Check files in collection have changed or not. If provide arguments, this will check files in arguments only.

Return a list of changed file as a array.

#### autoClean()

Auto clean for file in collection that file not found.

Return `this` for chain operation.

#### update([path1 ... pathN])

Update files last change timestamp in collections. If provide arguments, this will update files in arguments only.

Return `this` for chain operation.

#### save()

Save collection information.

Return `this` for chain operation.

### Usage Examples

```js
var fc = require('file-changed');
fc.addFile('path/to/file').update().save();
console.log(fc.get('path/to/file', 'md5'));
```

### Demo

```shell
node test.js
```

### History

- Ver 0.0.6 Bugfix
- Ver 0.0.5 Some methods support chain operation
- Ver 0.0.4 Add feature for `check` and `update`
- Ver 0.0.3 Bugfix and Add `autoClean` API
- Ver 0.0.2 Add `get` API and md5 value
- Ver 0.0.1 init
