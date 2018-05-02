module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[get] get not exist file', t => {
		const fc = new Fc();

		t.plan(1);

		t.is(fc.get(TEST_PATH.notExist), false, 'should return false');
	});
	test('[get] get file timestamp', t => {
		const fc = new Fc(),
			ts = fc
				.addFile(TEST_PATH.file1)
				.update()
				.get(TEST_PATH.file1);

		t.plan(2);

		t.is(typeof ts, 'number', 'should be a number');
		t.is(new Date(ts).getTime(), ts, 'should return a timestamp');
	});
	test('[get] get file md5', t => {
		const fc = new Fc(),
			md5 = fc
				.addFile(TEST_PATH.file1)
				.update()
				.get(TEST_PATH.file1, 'md5');

		t.plan(2);

		t.is(typeof md5, 'string', 'should be a string');
		t.is(md5.length, 16, 'should have 16 chars');
	});
};
