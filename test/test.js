var assert = require('assert'),
    fs = require('fs'),
    crypto = require('crypto'),
    Fc = require(require('path').normalize('../lib/main.js')),
    rimraf = require('rimraf');

var fc = new Fc();

describe('file-changed API', function() {
    describe('#addFile', function() {
        it('Add exist file', function() {
            assert.strictEqual(fc.addFile('test/files/file1'), fc, 'should return self');
        });
        it('Add not exist file', function() {
            assert.strictEqual(fc.addFile('test/files/notExist'), fc, 'should return self');
        });
        it('Add multi files', function () {
            assert.strictEqual(fc.addFile('test/files/file2', 'test/files/file3'), fc, 'should return self');
        });
    });
    describe('#rmFile', function() {
        it('Remove not exist file', function() {
            assert.strictEqual(fc.rmFile('test/files/notExist'), fc, 'should return self');
        });
        it('Remove exist file', function() {
            assert.strictEqual(fc.rmFile('test/files/file1'), fc, 'should return self');
        });
        it('Remove multi files', function() {
            assert.strictEqual(fc.rmFile('test/files/file2', 'test/files/file3'), fc, 'should return self');
        });
    });
    describe('#list', function() {
        it('List empty collection', function() {
            assert.strictEqual(fc.list().length, 0, 'should return empty array');
        });
        it('List not empty collection', function() {
            fc.addFile('test/files/file1');
            assert.strictEqual(fc.list()[0], 'test/files/file1', 'file path not correct');
            fc.rmFile('test/files/file1');
        });
    });
    describe('#check', function () {
        it('No changed file', function () {
            assert.strictEqual(fc.check().length, 0, 'should return empty array');
        });
        it('Have changed file', function () {
            fc.addFile('test/files/file1');
            assert.strictEqual(fc.check()[0], 'test/files/file1', 'file path not correct');
        });
        it('Check with specified files', function () {
            assert.strictEqual(fc.check('test/files/file2', 'test/files/file1')[0], 'test/files/file1', 'file path not correct');
        });
    });
    describe('#update', function () {
        it('Update files', function () {
            assert.strictEqual(fc.update().check().length, 0, 'should return empty array');
        });
    });
    describe('#get', function () {
        it('Get not exist file', function () {
            assert.strictEqual(fc.get('test/files/notExist'), false, 'should return false');
        });
        it('Get exist file in timestamp', function () {
            var ts = fc.get('test/files/file1');
            assert.strictEqual((new Date(ts)).getTime(), ts, 'should return a timestamp');
        });
        it('Get exist file in md5', function () {
            var filePath = 'test/files/file1',
                md5 = crypto.createHash('md5').update(fs.readFileSync(filePath), 'utf8').digest('hex').slice(0, 16);

            assert.strictEqual(fc.get(filePath, 'md5'), md5, 'should return correct md5');
        });
    });
    describe('#autoClean', function () {
        it('All files exist', function () {
            assert.strictEqual(fc.autoClean(), fc, 'should return self');
        });
        it('Clean not exist file', function () {
            var filePath = 'test/files/file3';

            fc.addFile(filePath).update();
            assert.notStrictEqual(fc.get(filePath), false, 'should not return false when added');

            fs.unlinkSync(filePath);
            assert.notStrictEqual(fc.get(filePath), false, 'should not return false when removed');
            assert.strictEqual(fc.autoClean().get(filePath), false, 'should return false');

            fs.writeFileSync(filePath, 'test');
        });
    });
    describe('#save', function () {
        it('Save collection to file', function () {
            assert.strictEqual(fs.existsSync('_timestamp.json'), false, 'json file should not exist');
            fc.save();
            assert.strictEqual(fs.existsSync('_timestamp.json'), true, 'json file should exist');
        });
    });
});

describe('file-changed initializer', function() {
    describe('#new without argument', function() {
        before(function() {
            rimraf.sync('_timestamp.json');
        });
        it('Save collection to default db file', function() {
            assert.strictEqual(fs.existsSync('_timestamp.json'), false, 'json file should not exist');
            var fcObj = new Fc();
            fcObj.save();
            assert.strictEqual(fs.existsSync('_timestamp.json'), true, 'json file should exist');
        });
    });
    describe('#new with dbPath argument', function() {
        before(function() {
            fs.mkdirSync('tmp');
        });
        after(function() {
            rimraf.sync('tmp');
        });
        var dbPath = require('path').join('tmp', 'myFcDatabase.json');
        it('Save collection to custom db file', function() {
            assert.strictEqual(fs.existsSync(dbPath), false, 'json file should not exist');
            var fcObj = new Fc(dbPath);
            fcObj.save();
            assert.strictEqual(fs.existsSync(dbPath), true, 'json file should exist');
        });
        it('Throw error if dbPath is empty or it is not a string', function() {
            var test = function() { var fcObj = new Fc([dbPath]); };
            assert.throws(test, 'pathDb argument must be a valid string.', 'function should throw');
        });
    });
});