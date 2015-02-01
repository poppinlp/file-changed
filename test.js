var fc = require('./main.js');

fc.addFile('test/file1', 'test/file2');
fc.addFile('test/file3');

fc.rmFile('test/file1');
fc.rmFile('test/file3');

fc.addFile('test/file1');
console.log(fc.check('test/file1'));
console.log(fc.check('test/file3'));
console.log(fc.check());

fc.update('test/file1');
fc.update('test/file3');
fc.update();

console.log(fc.get('test/file1'));
console.log(fc.get('test/file1', 'md5'));

fc.save();
