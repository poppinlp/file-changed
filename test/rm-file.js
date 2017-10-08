module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[rmFile] return self', t => {
		const fc = new Fc();

		t.plan(4);

		t.deepEqual(fc.rmFile(), fc, 'should return self');
		t.deepEqual(fc.rmFile(TEST_PATH.file1), fc, 'should return self');
		t.deepEqual(fc.rmFile(TEST_PATH.notExist), fc, 'should return self');
		t.deepEqual(fc.rmFile(TEST_PATH.glob), fc, 'should return self');
	});
	test('[rmFile] remove exist file', t => {
		const fc = new Fc();

		t.plan(2);

		fc.addFile(TEST_PATH.glob).rmFile(TEST_PATH.file1);
		t.is(fc.list().length, 2, 'should have 2 items');
		fc.rmFile(TEST_PATH.file2, TEST_PATH.file3);
		t.is(fc.list().length, 0, 'should have 0 item');
	});
	test('[rmFile] remove not exist file', t => {
		const fc = new Fc();

		t.plan(2);

		fc.addFile(TEST_PATH.glob).rmFile(TEST_PATH.notExist);
		t.is(fc.list().length, 3, 'should have 3 items');
		fc.rmFile(TEST_PATH.notExist, TEST_PATH.notExist2);
		t.is(fc.list().length, 3, 'should have 3 items');
	});
	test('[rmFile] remove exist but not in collection file', t => {
		const fc = new Fc();

		t.plan(2);

		fc.addFile(TEST_PATH.file1).rmFile(TEST_PATH.notExist);
		t.is(fc.list().length, 1, 'should have 1 items');
		fc.rmFile(TEST_PATH.file2, TEST_PATH.file3);
		t.is(fc.list().length, 1, 'should have 1 items');
	});
	test('[rmFile] remove glob', t => {
		const fc = new Fc();

		t.plan(1);

		fc.addFile(TEST_PATH.glob).rmFile(TEST_PATH.glob);
		t.is(fc.list().length, 0, 'should have 0 item');
	});
	test('[rmFile] remove empty glob', t => {
		const fc = new Fc();

		t.plan(1);

		fc.addFile(TEST_PATH.glob).rmFile(TEST_PATH.emptyGlob);
		t.is(fc.list().length, 3, 'should have 3 items');
	});
	test('[rmFile] remove invalid glob', t => {
		const fc = new Fc();

		t.notThrows(() => {
			fc.rmFile(TEST_PATH.invalidGlob);
		}, 'should throw error');
	});
};
