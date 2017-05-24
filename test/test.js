import assert from 'assert';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import test from 'ava';
import Fc from '../lib/main';

const testPath = {
	file1: path.normalize('./test/files/file1'),
	file2: path.normalize('./test/files/file2'),
	file3: path.normalize('./test/files/file3'),
	notExist: path.normalize('./test/files/notExist'),
	notExist2: path.normalize('./test/files/notExist2'),
	defaultDbPath: path.normalize('./_timestamp.json'),
	customDbPath: path.normalize('./_custom.json')
};

test('[constructor] no arguments', t => {
	t.notThrows(() => {
		new Fc();
	}, 'should throw no error');
});
test('[constructor] validate arguments', t => {
	t.notThrows(() => {
		new Fc(testPath.customDbPath);
	}, 'should throw no error');
});
test('[constructor] not validate arguments', t => {
	t.throws(() => {
		new Fc({});
	}, 'dbPath must be a valid string.', 'should throw error');
});

test('[addFile] add exist file', t => {
	const fc = new Fc();

	t.plan(2);

	t.deepEqual(fc.addFile(testPath.file1), fc, 'should return self');
	t.deepEqual(fc.addFile(testPath.file2, testPath.file3), fc, 'should return self');
});
test('[addFile] add not exist file', t => {
	const fc = new Fc();

	t.plan(2);

	t.deepEqual(fc.addFile(testPath.notExist), fc, 'should return self');
	t.deepEqual(fc.addFile(testPath.notExist, testPath.notExist2), fc, 'should return self');
});

test('[rmFile] remove exist file', t => {
	const fc = new Fc();

	t.plan(2);

	t.deepEqual(fc.rmFile(testPath.file1), fc, 'should return self');
	t.deepEqual(fc.rmFile(testPath.file2, testPath.file3), fc, 'should return self');
});
test('[rmFile] remove not exist file', t => {
	const fc = new Fc();

	t.plan(2);

	t.deepEqual(fc.rmFile(testPath.notExist), fc, 'should return self');
	t.deepEqual(fc.rmFile(testPath.notExist, testPath.notExist2), fc, 'should return self');
});

test('[list] list empty collection', t => {
	const fc = new Fc();

	t.plan(1);

	t.is(fc.list().length, 0, 'should return empty array');
});
test('[list] list not empty collection', t => {
	const fc = new Fc();

	t.plan(2);

	fc.addFile(testPath.file1);
	t.deepEqual(fc.list(), [ testPath.file1 ], 'should return file path within array');

	fc.rmFile(testPath.file1);
	t.is(fc.list().length, 0, 'should return 0');
});

test('[check] check empty collection', t => {
	const fc = new Fc();

	t.plan(1);

	t.is(fc.check().length, 0, 'should return 0');
});
test('[check] check not empty collection', t => {
	const fc = new Fc();

	t.plan(2);

	fc.addFile(testPath.file1);
	t.deepEqual(fc.check(), [ testPath.file1 ], 'should return file path within array');

	fc.rmFile(testPath.file1);
	t.is(fc.check().length, 0, 'should return 0');
});
test('[check] check with arguments', t => {
	const fc = new Fc();

	t.plan(4);

	fc.addFile(testPath.file1);
	t.deepEqual(fc.check(testPath.file1), [ testPath.file1 ], 'should return file path within array');
	t.deepEqual(fc.check(testPath.file1, testPath.file2), [ testPath.file1 ], 'should return file path within array');
	t.is(fc.check(testPath.file2, testPath.file3).length, 0, 'should return 0');

	fc.rmFile(testPath.file1);
	t.is(fc.check(testPath.file1, testPath.file2, testPath.file3).length, 0, 'should return 0');
});

test('[update] return self', t => {
	const fc = new Fc();

	t.plan(1);

	t.deepEqual(fc.update(), fc, 'should return self');
});
test('[update] update all collection', t => {
	const fc = new Fc();

	t.plan(1);

	fc.addFile(testPath.file1, testPath.file2, testPath.file3);
	t.is(fc.update().check().length, 0, 'should return 0');
});
test('[update] update with arguments', t => {
	const fc = new Fc();

	t.plan(2);

	fc.addFile(testPath.file1, testPath.file2, testPath.file3);
	t.is(fc.update(testPath.file1).check().length, 2, 'should return 2');
	t.is(fc.update(testPath.file2, testPath.file3).check().length, 0, 'should return 0');
});

test('[get] get not exist file', t => {
	const fc = new Fc();

	t.plan(1);

	t.is(fc.get(testPath.notExist), false, 'should return false');
});
test('[get] get file timestamp', t => {
	const
		fc = new Fc(),
		ts = fc.addFile(testPath.file1).update().get(testPath.file1);

	t.plan(2);

	t.is(typeof ts, 'number', 'should be a number');
	t.is((new Date(ts)).getTime(), ts, 'should return a timestamp');
});
test('[get] get file md5', t => {
	const
		fc = new Fc(),
		md5 = fc.addFile(testPath.file1).update().get(testPath.file1, 'md5');

	t.plan(2);

	t.is(typeof md5, 'string', 'should be a string');
	t.is(md5.length, 16, 'should have 16 chars');
});

test('[clean] return self', t => {
	const fc = new Fc();

	t.plan(1);

	t.deepEqual(fc.clean(), fc, 'should return self');
});
test('[clean] clean collection', t => {
	const fc = new Fc();

	t.plan(2);

	fs.writeFileSync(testPath.notExist, '');

	fc.addFile(testPath.file1, testPath.notExist);
	t.is(fc.clean().list().length, 2, 'should return 2');

	fs.unlinkSync(testPath.notExist);
	t.is(fc.clean().list().length, 1, 'should return 1');
});

test('[save] save to default path', t => {
	const fc = new Fc();

	t.plan(2);
	t.is(fs.existsSync(testPath.defaultDbPath), false, 'should not exist');
	fc.save();
	t.is(fs.existsSync(testPath.defaultDbPath), true, 'should exist');

	fs.unlinkSync(testPath.defaultDbPath);
});
test('[save] save to custom path', t => {
	const fc = new Fc(testPath.customDbPath);

	t.plan(2);
	t.is(fs.existsSync(testPath.customDbPath), false, 'should not exist');
	fc.save();
	t.is(fs.existsSync(testPath.customDbPath), true, 'should exist');

	fs.unlinkSync(testPath.customDbPath);
});
