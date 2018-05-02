const fs = require('fs');

module.exports = ({ test, Fc, TEST_PATH }) => {
	test('[clean] return self', t => {
		const fc = new Fc();

		t.plan(1);

		t.deepEqual(fc.clean(), fc, 'should return self');
	});
	test('[clean] clean collection', t => {
		const fc = new Fc();

		t.plan(2);

		fs.writeFileSync(TEST_PATH.notExist, '');

		fc.addFile(TEST_PATH.file1, TEST_PATH.notExist);
		t.is(fc.clean().list().length, 2, 'should return 2');

		fs.unlinkSync(TEST_PATH.notExist);
		t.is(fc.clean().list().length, 1, 'should return 1');
	});
};
