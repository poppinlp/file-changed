var fc = require('./lib/main.js');

fc.addFile('test/file1', 'test/file2').addFile('test/file3');

fc.rmFile('test/file1').rmFile('test/file3');

fc.addFile('test/file1');
console.log(fc.check('test/file1'));
console.log(fc.check('test/file3'));
console.log(fc.check());

fc.update('test/file1').update('test/file3').update();

console.log(fc.get('test/file1'));
console.log(fc.get('test/file1', 'md5'));

fc.save();
