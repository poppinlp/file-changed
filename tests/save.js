const fs = require('fs');

module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[save] save to default path', t => {
		const fc = new Fc();

		t.plan(2);
		t.is(fs.existsSync(TEST_PATH.defaultDbPath), false, 'should not exist');
		fc.save();
		t.is(fs.existsSync(TEST_PATH.defaultDbPath), true, 'should exist');

		fs.unlinkSync(TEST_PATH.defaultDbPath);
	});
	test('[save] save to custom path', t => {
		const fc = new Fc(TEST_PATH.customDbPath);

		t.plan(2);
		t.is(fs.existsSync(TEST_PATH.customDbPath), false, 'should not exist');
		fc.save();
		t.is(fs.existsSync(TEST_PATH.customDbPath), true, 'should exist');

		fs.unlinkSync(TEST_PATH.customDbPath);
	});
};
