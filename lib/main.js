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

const getMD5 = filePath => fs.existsSync(filePath)
	? crypto.createHash('md5').update(fs.readFileSync(filePath, {
		encoding: ENCODING
	}), ENCODING).digest('hex').slice(0, 16)
	: false;

const getTS = filePath => fs.existsSync(filePath)
	? fs.statSync(filePath).mtime.getTime()
	: false;

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
		for (const pattern of args) {
			try {
				const list = glob.sync(pattern);

				if (list.length === 0) {
					console.warn(chalk.red(`>> [addFile] Pattern match no file: ${pattern}`));
					continue;
				}

				list.forEach(file => {
					if (this._data[file] === undefined) {
						this._data[file] = {};
					}
				});
			} catch (e) {
				console.warn(chalk.red(`>> [addFile] Pattern parse fail for ${pattern}: ${e.message}`));
			}
		}

		return this;
	}

	rmFile(...args) {
		for (const pattern of args) {
			try {
				const list = glob.sync(pattern);

				if (list.length === 0) {
					console.warn(chalk.red(`>> [rmFile] Pattern match no file: ${pattern}`));
					continue;
				}

				list.forEach(file => {
					this._data[file] === undefined
						? console.warn(chalk.red(`>> [rmFile] No such file in collection: ${file}`))
						: delete this._data[file];
				});
			} catch (e) {
				console.warn(chalk.red(`>> [rmFile] Pattern parse fail for ${pattern}: ${e.message}`));
			}
		}

		return this;
	}

	check(...args) {
		const
			targets = args.length ? args : this.list(),
			ret = [];

		for (const pattern of targets) {
			try {
				const files = glob.sync(pattern);

				if (files.length === 0) {
					console.warn(chalk.red(`>> [check] Pattern match no file: ${pattern}`));
					continue;
				}

				files.forEach(file => {
					if (this._data[file] === undefined) {
						console.warn(chalk.red(`>> [check] No such file in collection: ${file}`));
					} else {
						getTS(file) !== this._data[file].ts && ret.push(file);
					}
				});
			} catch (err) {
				console.warn(chalk.red(`>> [check] Pattern parse fail for ${pattern}: ${err.message}`));
			}
		}

		return ret;
	}

	update(...args) {
		const targets = args.length ? args : this.check();

		for (const pattern of targets) {
			try {
				const files = glob.sync(pattern);

				if (files.length === 0) {
					console.warn(chalk.red(`>> [update] Pattern match no file: ${pattern}`));
					continue;
				}

				files.forEach(file => {
					if (fs.existsSync(file)) {
						this._data[file].ts = getTS(file);
						this._data[file].md5 = getMD5(file);
					} else {
						console.warn(chalk.red(`>> [update] Target file not found: ${file}`));
					}
				});
			} catch (err) {
				console.warn(chalk.red(`>> [update] Pattern parse fail for ${pattern}: ${err.message}`));
			}
		}

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
