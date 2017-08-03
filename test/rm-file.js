module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[rmFile] remove exist file', t => {
		const fc = new Fc();

		t.plan(4);

		fc.addFile(TEST_PATH.glob);
		t.deepEqual(fc.rmFile(TEST_PATH.file1), fc, 'should return self');
		t.is(fc.list().length, 2, 'should have 2 items');
		t.deepEqual(fc.rmFile(TEST_PATH.file2, TEST_PATH.file3), fc, 'should return self');
		t.is(fc.list().length, 0, 'should have 0 item');
	});
	test('[rmFile] remove not exist file', t => {
		const fc = new Fc();

		t.plan(4);

		fc.addFile(TEST_PATH.glob);
		t.deepEqual(fc.rmFile(TEST_PATH.notExist), fc, 'should return self');
		t.is(fc.list().length, 3, 'should have 3 items');
		t.deepEqual(fc.rmFile(TEST_PATH.notExist, TEST_PATH.notExist2), fc, 'should return self');
		t.is(fc.list().length, 3, 'should have 3 items');
	});
	test('[rmFile] remove glob', t => {
		const fc = new Fc();

		t.plan(2);

		fc.addFile(TEST_PATH.glob);
		t.deepEqual(fc.rmFile(TEST_PATH.glob), fc, 'should return self');
		t.is(fc.list().length, 0, 'should have 0 item');
	});
	test('[rmFile] remove empty glob', t => {
		const fc = new Fc();

		t.plan(2);

		fc.addFile(TEST_PATH.glob);
		t.deepEqual(fc.rmFile(TEST_PATH.globEmpty), fc, 'should return self');
		t.is(fc.list().length, 3, 'should have 3 items');
	});
};
