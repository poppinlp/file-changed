var fc = require('./lib/main.js');

console.log(fc.addFile('test/files/file1', 'test/files/file2').list());

console.log(fc.rmFile('test/files/file1').list());

fc.addFile('test/files/file1');
console.log(fc.check('test/files/file1'));
console.log(fc.check());

fc.update('test/files/file1').update();

console.log(fc.get('test/files/file1'));
console.log(fc.get('test/files/file1', 'md5'));

fc.save();
