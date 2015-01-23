var fc = require('./main.js');

fc.addFile('test/file1');
fc.rmFile('test/file1');
fc.addFile('test/file2');
console.log(fc.check());
fc.update();
console.log(fc.check());
fc.save();
fc.rmFile('test/file2');
