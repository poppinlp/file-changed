const
	fs = require('fs'),
	path = require('path'),
	crypto = require('crypto');
const
	glob = require('glob'),
	chalk = require('chalk');
const
	DEFAULT_DB_PATH = path.join(__dirname, '../_timestamp.json'),
	ENCODING = 'utf8';

const getMD5 = filePath => crypto
	.createHash('md5')
	.update(fs.readFileSync(filePath, {
		encoding: ENCODING
	}), ENCODING)
	.digest('hex').slice(0, 16);

const getTS = filePath => fs.statSync(filePath).mtime.getTime();

const loop = ({ targets, method, job }) => {
	for (const pattern of targets) {
		try {
			const files = glob.sync(pattern);

			if (files.length === 0) {
				console.warn(chalk.red(`>> [${method}] Pattern match no file: ${pattern}`));
				continue;
			}

			files.forEach(job);
		} catch (err) {
			console.warn(chalk.red(`>> [${method}] Pattern parse fail for ${pattern}: ${err.message}`));
		}
	}
};

module.exports = class {
	constructor(dbPath = DEFAULT_DB_PATH) {
		if (typeof dbPath !== 'string' || dbPath === '') {
			throw new Error('dbPath must be a valid string.');
		}

		this._dbPath = dbPath;
		/**
		 * {
		 *   filepath: {
		 *     ts: last change timestamp
		 *     md5: md5 for file
		 *   }
		 * }
		 */
		this._data = fs.existsSync(this._dbPath) ? JSON.parse(fs.readFileSync(this._dbPath, {
			encoding: ENCODING
		})) : {};
	}

	get(file, type) {
		if (file === undefined || this._data[file] === undefined) {
			return false;
		}

		return type === 'md5' ? this._data[file].md5 : this._data[file].ts;
	}

	list() {
		return Object.keys(this._data);
	}

	addFile(...args) {
		loop({
			targets: args,
			method: 'addFile',
			job: file => {
				if (this._data[file] === undefined) {
					this._data[file] = {};
				}
			}
		});

		return this;
	}

	rmFile(...args) {
		loop({
			targets: args,
			method: 'rmFile',
			job: file => {
				this._data[file] === undefined
					? console.warn(chalk.red(`>> [rmFile] No such file in collection: ${file}`))
					: delete this._data[file];
			}
		});

		return this;
	}

	check(...args) {
		const ret = [];

		loop({
			targets: args.length ? args : this.list(),
			method: 'check',
			job: file => {
				this._data[file] === undefined
					? console.warn(chalk.red(`>> [check] No such file in collection: ${file}`))
					: getTS(file) !== this._data[file].ts && ret.push(file);
			}
		});

		return ret;
	}

	update(...args) {
		loop({
			targets: args.length ? args : this.check(),
			method: 'update',
			job: file => {
				if (this._data[file] === undefined) {
					console.warn(chalk.red(`>> [update] No such file in collection: ${file}`));
				} else {
					this._data[file].ts = getTS(file);
					this._data[file].md5 = getMD5(file);
				}
			}
		});

		return this;
	}

	clean() {
		for (const key in this._data) {
			if (Object.prototype.hasOwnProperty.call(this._data, key) && !fs.existsSync(key)) {
				delete this._data[key];
			}
		}

		return this;
	}

	save() {
		fs.writeFileSync(this._dbPath, JSON.stringify(this._data), {
			encoding: ENCODING
		});

		return this;
	}
};
