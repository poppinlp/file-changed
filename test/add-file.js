module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[addFile] add exist file', t => {
		const fc = new Fc();

		t.plan(3);

		t.deepEqual(fc.addFile(TEST_PATH.file1), fc, 'should return self');
		t.deepEqual(fc.addFile(TEST_PATH.file2, TEST_PATH.file3), fc, 'should return self');
		t.deepEqual(fc.list(), [TEST_PATH.file1, TEST_PATH.file2, TEST_PATH.file3], 'should return those 3 files within array');
	});
	test('[addFile] add not exist file', t => {
		const fc = new Fc();

		t.plan(3);

		t.deepEqual(fc.addFile(TEST_PATH.notExist), fc, 'should return self');
		t.deepEqual(fc.addFile(TEST_PATH.notExist, TEST_PATH.notExist2), fc, 'should return self');
		t.deepEqual(fc.list(), [], 'should return empty array');
	});
	test('[addFile] add glob', t => {
		const fc = new Fc();

		t.plan(2);

		t.deepEqual(fc.addFile(TEST_PATH.glob), fc, 'should return self');
		t.deepEqual(fc.list(), [TEST_PATH.file1, TEST_PATH.file2, TEST_PATH.file3], 'should return those 3 files within array');
	});
	test('[addFile] add empty glob', t => {
		const fc = new Fc();

		t.plan(2);

		t.deepEqual(fc.addFile(TEST_PATH.emptyGlob), fc, 'should return self');
		t.deepEqual(fc.list(), [], 'should return empty array');
	});
	test('[addFile] add invalid glob', t => {
		const fc = new Fc();

		t.notThrows(() => {
			fc.addFile(TEST_PATH.invalidGlob);
		}, 'should throw error');
	});
};
