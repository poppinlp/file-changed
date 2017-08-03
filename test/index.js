import path from 'path';
import test from 'ava';
import Fc from '../lib/main';

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
	file1: path.normalize('./test/files/file1'),
	file2: path.normalize('./test/files/file2'),
	file3: path.normalize('./test/files/file3'),
	notExist: path.normalize('./test/files/notExist'),
	notExist2: path.normalize('./test/files/notExist2'),
	defaultDbPath: path.normalize('./_timestamp.json'),
	customDbPath: path.normalize('./_custom.json'),
	glob: path.normalize('./test/files/*'),
	globEmpty: path.normalize('./test/files/notExist*')
};

[
	addFileCase,
	checkCase,
	cleanCase,
	constructorCase,
	getCase,
	listCase,
	rmFileCase,
	saveCase,
	updateCase
].forEach(testCase => {
	testCase({
		test,
		Fc,
		TEST_PATH
	});
});
