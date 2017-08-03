module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[check] check empty collection', t => {
		const fc = new Fc();

		t.plan(1);

		t.is(fc.check().length, 0, 'should return 0');
	});
	test('[check] check not empty collection', t => {
		const fc = new Fc();

		t.plan(2);

		fc.addFile(TEST_PATH.file1);
		t.deepEqual(fc.check(), [TEST_PATH.file1], 'should return file path within array');

		fc.rmFile(TEST_PATH.file1);
		t.is(fc.check().length, 0, 'should return 0');
	});
	test('[check] check with arguments', t => {
		const fc = new Fc();

		t.plan(4);

		fc.addFile(TEST_PATH.file1);
		t.deepEqual(fc.check(TEST_PATH.file1), [TEST_PATH.file1], 'should return file path within array');
		t.deepEqual(fc.check(TEST_PATH.file1, TEST_PATH.file2), [TEST_PATH.file1], 'should return file path within array');
		t.is(fc.check(TEST_PATH.file2, TEST_PATH.file3).length, 0, 'should return 0');

		fc.rmFile(TEST_PATH.file1);
		t.is(fc.check(TEST_PATH.file1, TEST_PATH.file2, TEST_PATH.file3).length, 0, 'should return 0');
	});
	test('[check] check glob', t => {
		const fc = new Fc();

		t.plan(1);

		fc.addFile(TEST_PATH.glob);
		t.deepEqual(fc.check(TEST_PATH.glob), [TEST_PATH.file1, TEST_PATH.file2, TEST_PATH.file3], 'should return 3 files path within array');
	});
	test('[check] check empty glob', t => {
		const fc = new Fc();

		t.plan(1);

		fc.addFile(TEST_PATH.glob);
		t.deepEqual(fc.check(TEST_PATH.globEmpty), [], 'should return empty array');
	});
};
