module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[constructor] no arguments', t => {
		t.notThrows(() => {
			const noop = new Fc();

			noop.list(); // For pass eslint
		}, 'should throw no error');
	});
	test('[constructor] validate arguments', t => {
		t.notThrows(() => {
			const noop = new Fc(TEST_PATH.customDbPath);

			noop.list(); // For pass eslint
		}, 'should throw no error');
	});
	test('[constructor] not validate arguments', t => {
		t.throws(() => {
			const noop = new Fc({});

			noop.list(); // For pass eslint
		}, 'dbPath must be a valid string.', 'should throw error');
	});
	test('[constructor] from exist db path', t => {
		t.notThrows(() => {
			const noop = new Fc(TEST_PATH.existDbPath);

			noop.list(); // For pass eslint
		}, 'should throw no error');
	});
};
