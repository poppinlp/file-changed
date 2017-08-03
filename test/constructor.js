module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[constructor] no arguments', t => {
		t.notThrows(() => {
			const noop = new Fc();

			noop.list(); // To pass eslint
		}, 'should throw no error');
	});
	test('[constructor] validate arguments', t => {
		t.notThrows(() => {
			const noop = new Fc(TEST_PATH.customDbPath);

			noop.list(); // To pass eslint
		}, 'should throw no error');
	});
	test('[constructor] not validate arguments', t => {
		t.throws(() => {
			const noop = new Fc({});

			noop.list(); // To pass eslint
		}, 'dbPath must be a valid string.', 'should throw error');
	});
};
