'use strict';

const
	fs = require('fs'),
	path = require('path'),
	crypto = require('crypto'),
	chalk = require('chalk'),

	defaultDbPath = path.join(__dirname, '../_timestamp.json'),
	encoding = {
		encoding: 'utf8'
	};

const getMD5 = filePath => fs.existsSync(filePath)
	? crypto.createHash('md5').update(fs.readFileSync(filePath, encoding), 'utf8').digest('hex').slice(0, 16)
	: false;

const getTS = filePath => fs.existsSync(filePath)
	? fs.statSync(filePath).mtime.getTime()
	: false;

module.exports = class {

	constructor(dbPath) {
		if (dbPath !== undefined && typeof dbPath !== 'string' || dbPath === '') {
			throw new Error('dbPath must be a valid string.');
		}

		const that = this;

		that._dbPath = dbPath || defaultDbPath;
		/**
		 * {
		 *   filepath: {
		 *     ts: last change timestamp
		 *     md5: md5 for file
		 *   }
		 * }
		 */
		that._data = fs.existsSync(that._dbPath) ? JSON.parse(fs.readFileSync(that._dbPath, encoding)) : {};
	}

	get(file, type) {
		const that = this;

		if (file === undefined || that._data[file] === undefined) return false;

		return type === 'md5' ? that._data[file].md5 : that._data[file].ts;
	}

	list() {
		return Object.keys(this._data);
	}

	addFile(...args) {
		const that = this;

		for (const item of args) {
			if (!fs.existsSync(item)) {
				console.warn(chalk.red(`>> [addFile] Target file not found: ${item}`));
				continue;
			}

			if (that._data[item] === undefined) {
				that._data[item] = {};
			}
		}

		return that;
	}

	rmFile(...args) {
		const that = this;

		for (const item of args) {
			if (that._data[item] === undefined) {
				console.warn(chalk.red(`>> [rmFile] No such file in collection: ${item}`));
				continue;
			}

			delete that._data[item];
		}

		return that;
	}

	check(...args) {
		const
			that = this,
			list = args.length ? args : that.list(),
			res = [];

		for (const item of list) {
			if (that._data[item] === undefined) {
				console.warn(chalk.red(`>> [check] No such file in collection: ${item}`));
				continue;
			}

			getTS(item) !== that._data[item].ts && res.push(item);
		}

		return res;
	}

	update(...args) {
		const
			that = this,
			list = args.length ? args : that.check();

		for (const item of list) {
			if (!fs.existsSync(item)) {
				console.warn(chalk.red(`>> [update] Target file not found: ${item}`));
				continue;
			}

			that._data[item].ts = getTS(item);
			that._data[item].md5 = getMD5(item);
		}

		return that;
	}

	clean() {
		const that = this;

		for (const item in that._data) {
			if (that._data.hasOwnProperty(item) && !fs.existsSync(item)) {
				delete that._data[item];
			}
		}

		return that;
	}

	save() {
		const that = this;

		fs.writeFileSync(that._dbPath, JSON.stringify(that._data), encoding);

		return that;
	}

};
