/*
 * file-changed
 * https://github.com/poppinlp/file-changed
 *
 * Copyright (c) 2015 "PoppinLp" Liang Peng
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    chalk = require('chalk'),
    encoding = {
        encoding: 'utf8'
    };

function Timestamp () {
    var that = this;
    // save _timestamp.json file path
    that._dataPath = path.normalize(__dirname + '/../_timestamp.json');
    /* save files list data
     * {
     *   filepath: {
     *     ts: last change timestamp
     *     md5: md5 for file
     *   }
     * }
     */
    that._data = fs.existsSync(that._dataPath) ? JSON.parse(fs.readFileSync(that._dataPath, encoding)) : {};
}

Timestamp.prototype = {
    '_getMD5': function (filePath) {
        return fs.existsSync(filePath) ? crypto.createHash('md5').update(fs.readFileSync(filePath, encoding), 'utf8').digest('hex').slice(0, 16) : false;
    },
    '_getTS': function (filePath) {
        return fs.existsSync(filePath) ? fs.statSync(filePath).mtime.getTime() : false;
    },
    'check': function () {
        // if have arguments, do this for them, else do this for all.
        var that = this,
            list = arguments.length ? arguments : Object.keys(that._data),
            len = list.length,
            res = [],
            item;

        while (len--) {
            item = list[len];
            if (!that._data[item]) {
                console.warn(chalk.red('>> There\'s no file in collection named "' + item + '" occurred in check method.'));
            } else if (that._getTS(item) !== that._data[item].ts) {
                res.push(item);
            }
        }

        return res;
    },
    'update': function () {
        // if have arguments, do this for them, else do this for all.
        var that = this,
            list = arguments.length ? arguments : that.check(),
            len = list.length,
            item;

        while (len--) {
            item = list[len];
            if (fs.existsSync(item)) {
                that._data[item].ts = that._getTS(item);
                that._data[item].md5 = that._getMD5(item);
            } else {
                console.warn(chalk.red('>> File not found "' + item + '" occurred in update method.'));
            }
        }

        return that;
    },
    'addFile': function () {
        var that = this,
            len = arguments.length,
            item;

        while (len--) {
            item = arguments[len];
            if (fs.existsSync(item)) {
                if (that._data[item] === undefined) {
                    that._data[item] = {};
                }
            } else {
                console.warn(chalk.red('>> File not found "' + item + '" occurred in addFile method.'));
            }
        }

        return that;
    },
    'rmFile': function () {
        var that = this,
            len = arguments.length,
            item;

        while (len--) {
            item = arguments[len];
            if (that._data[item] !== undefined) {
                delete that._data[item];
            } else {
                console.warn(chalk.red('>> There\'s no file in collection named "' + item + '" occurred in rmFile method.'));
            }
        }

        return that;
    },
    'save': function () {
        var that = this;
        fs.writeFileSync(that._dataPath, JSON.stringify(that._data), encoding);
        return that;
    },
    'get': function (file, type) {
        if (!file) return;

        var that = this;
        if (!that._data[file]) return false;

        file = that._data[file];
        if (type === 'md5') {
            return file.md5;
        } else {
            return file.ts;
        }
    },
    'autoClean': function () {
        var data = this._data,
            item;

        for (item in data) {
            if (data.hasOwnProperty(item) && !fs.existsSync(item)) {
                delete data[item];
            }
        }
        return this;
    }
};

module.exports = new Timestamp();
