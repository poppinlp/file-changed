import path from 'path';
import test from 'ava';
import Fc from '../src/main';

import addFileCase from './add-file';
import checkCase from './check';
import cleanCase from './clean';
import constructorCase from './constructor';
import getCase from './get';
import listCase from './list';
import rmFileCase from './rm-file';
import saveCase from './save';
import updateCase from './update';

const TEST_PATH = {
	file1: path.normalize('./tests/files/file1'),
	file2: path.normalize('./tests/files/file2'),
	file3: path.normalize('./tests/files/file3'),
	notExist: path.normalize('./tests/files/notExist'),
	notExist2: path.normalize('./tests/files/notExist2'),
	glob: path.normalize('./tests/files/*'),
	globEmpty: path.normalize('./tests/files/notExist*'),
	invalidGlob: '',
	defaultDbPath: path.normalize('./_timestamp.json'),
	customDbPath: path.normalize('./tests/dbs/_custom.json'),
	existDbPath: path.normalize('./tests/dbs/db.json')
};

[
	constructorCase,
	addFileCase,
	checkCase,
	updateCase,
	getCase,
	rmFileCase,
	listCase,
	saveCase,
	cleanCase
].forEach(testCase => {
	testCase({
		test,
		Fc,
		TEST_PATH
	});
});
