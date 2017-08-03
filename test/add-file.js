module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[addFile] add exist file', t => {
		const fc = new Fc();

		t.plan(3);

		t.deepEqual(fc.addFile(TEST_PATH.file1), fc, 'should return self');
		t.deepEqual(fc.addFile(TEST_PATH.file2, TEST_PATH.file3), fc, 'should return self');
		t.is(fc.list().length, 3, 'should have 3 items');
	});
	test('[addFile] add not exist file', t => {
		const fc = new Fc();

		t.plan(3);

		t.deepEqual(fc.addFile(TEST_PATH.notExist), fc, 'should return self');
		t.deepEqual(fc.addFile(TEST_PATH.notExist, TEST_PATH.notExist2), fc, 'should return self');
		t.is(fc.list().length, 0, 'should have 0 item');
	});
	test('[addFile] add glob', t => {
		const fc = new Fc();

		t.plan(2);

		t.deepEqual(fc.addFile(TEST_PATH.glob), fc, 'should return self');
		t.is(fc.list().length, 3, 'should have 3 items');
	});
	test('[addFile] add empty glob', t => {
		const fc = new Fc();

		t.plan(2);

		t.deepEqual(fc.addFile(TEST_PATH.globEmpty), fc, 'should return self');
		t.is(fc.list().length, 0, 'should have 0 item');
	});
};
