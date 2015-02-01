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

Return `true` for add successfully. Return `false` for repeat file or file not found by path.

#### rmFile(path[, path2 ... pathN])

Remove files from collection.

Return `true` for remove successfully. Return `false` for no such file in collection.

#### check()

Check files in collection have changed or not.

Return a list for changed file as a array.

#### update()

Update files last change timestamp in collections.

Return `true` for update successfully. Return `false` for file not found by path.

#### save()

Save collection information.

### Usage Examples

```js
var fc = require('file-changed');
fc.addFile('path/to/file');
fc.update();
fc.save();
console.log(fc.get('path/to/file', 'md5'));
```

### Demo

```shell
node test.js
```

### History

- Ver 0.0.2 Add `get` API and md5 value
- Ver 0.0.1 init
