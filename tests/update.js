module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[update] return self', t => {
		const fc = new Fc();

		t.plan(4);

		t.deepEqual(fc.update(), fc, 'should return self');
		t.deepEqual(fc.update(TEST_PATH.file1), fc, 'should return self');
		t.deepEqual(fc.update(TEST_PATH.notExist), fc, 'should return self');
		t.deepEqual(fc.update(TEST_PATH.glob), fc, 'should return self');
	});
	test('[update] update all collection', t => {
		const fc = new Fc();

		t.plan(1);

		fc.addFile(TEST_PATH.file1, TEST_PATH.file2, TEST_PATH.file3);
		t.deepEqual(fc.update().check(), [], 'should return empty array');
	});
	test('[update] update files', t => {
		const fc = new Fc();

		t.plan(2);

		fc.addFile(TEST_PATH.file1, TEST_PATH.file2, TEST_PATH.file3);
		t.is(fc.update(TEST_PATH.file1).check().length, 2, 'should return 2');
		t.is(fc.update(TEST_PATH.file2, TEST_PATH.file3).check().length, 0, 'should return 0');
	});
	test('[update] update not in collection files', t => {
		const fc = new Fc();

		t.plan(1);

		t.is(fc.update(TEST_PATH.file1, TEST_PATH.file2).check().length, 0, 'should return 0');
	});
	test('[update] update glob', t => {
		const fc = new Fc();

		t.plan(1);

		fc.addFile(TEST_PATH.glob);
		t.deepEqual(fc.update(TEST_PATH.glob).check(), [], 'should return empty array');
	});
	test('[update] check empty glob', t => {
		const fc = new Fc();

		t.plan(1);

		fc.addFile(TEST_PATH.glob);
		t.deepEqual(
			fc.update(TEST_PATH.emptyGlob).check(),
			[TEST_PATH.file1, TEST_PATH.file2, TEST_PATH.file3],
			'should return 3 files path array'
		);
	});
	test('[update] update invalid glob', t => {
		const fc = new Fc();

		t.notThrows(() => {
			fc.update(TEST_PATH.invalidGlob);
		}, 'should throw error');
	});
};
