module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[constructor] no arguments', t => {
		t.notThrows(() => {
			new Fc(); // eslint-disable-line no-new
		}, 'should throw no error');
	});
	test('[constructor] validate arguments', t => {
		t.notThrows(() => {
			new Fc(TEST_PATH.customDbPath); // eslint-disable-line no-new
		}, 'should throw no error');
	});
	test('[constructor] not validate arguments', t => {
		t.throws(
			() => {
				new Fc({}); // eslint-disable-line no-new
			},
			'dbPath must be a valid string.',
			'should throw error'
		);
	});
	test('[constructor] from exist db path', t => {
		t.notThrows(() => {
			new Fc(TEST_PATH.existDbPath); // eslint-disable-line no-new
		}, 'should throw no error');
	});
};
