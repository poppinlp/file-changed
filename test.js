var fc = require('./main.js');

fc.addFile('test/file1', 'test/file2');
fc.update();
console.log(fc.get('test/file1', 'md5'));
fc.rmFile('test/file1');
fc.save();
