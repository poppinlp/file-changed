module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[list] list empty collection', t => {
		const fc = new Fc();

		t.plan(1);

		t.is(fc.list().length, 0, 'should return empty array');
	});
	test('[list] list not empty collection', t => {
		const fc = new Fc();

		t.plan(2);

		fc.addFile(TEST_PATH.file1);
		t.deepEqual(fc.list(), [TEST_PATH.file1], 'should return file path within array');

		fc.rmFile(TEST_PATH.file1);
		t.is(fc.list().length, 0, 'should return 0');
	});
};
