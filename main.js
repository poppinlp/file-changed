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
    that.dataPath = path.normalize('./_timestamp.json');
    /* save files list data
     * {
     *   filepath: {
     *     ts: last change timestamp
     *     md5: md5 for file
     *   }
     * }
     */
    that.data = fs.existsSync(that.dataPath) ? JSON.parse(fs.readFileSync(that.dataPath, encoding)) : {};
}

Timestamp.prototype = {
    '_getMD5': function (filePath) {
        return fs.existsSync(filePath) ? crypto.createHash('md5').update(fs.readFileSync(filePath, encoding), 'utf8').digest('hex') : false;
    },
    '_getTS': function (filePath) {
        return fs.existsSync(filePath) ? fs.statSync(filePath).mtime.getTime() : false;
    },
    'check': function () {
        var that = this,
            data = that.data,
            res = [],
            item;

        for (item in data) {
           if (data.hasOwnProperty(item)) {
               if (that._getTS(item) !== data[item].ts) {
                   res.push(item);
               }
           }
        }
        return res;
    },
    'update': function () {
        var that = this,
            list = that.check(),
            len = list.length,
            item,
            res = true;

        while (len--) {
            item = list[len];
            if (fs.existsSync(item)) {
                that.data[item].ts = that._getTS(item);
                that.data[item].md5 = that._getMD5(item);
            } else {
                console.warn(chalk.red('>> File not found "' + item + '" occurred in update method.'));
                res = false;
            }
        }
        return res;
    },
    'addFile': function () {
        var that = this,
            len = arguments.length,
            res = true,
            item;

        while (len--) {
            item = arguments[len];
            if (fs.existsSync(item)) {
                if (that.data[item] === undefined) {
                    that.data[item] = {};
                }
            } else {
                console.warn(chalk.red('>> File not found "' + item + '" occurred in addFile method.'));
                res = false;
            }
        }
        return res;
    },
    'rmFile': function () {
        var that = this,
            len = arguments.length,
            res = true,
            item;

        while (len--) {
            item = arguments[len];
            if (that.data[item] !== undefined) {
                delete that.data[item];
            } else {
                console.warn(chalk.red('>> There\'s no file in collection named "' + item + '" occurred in rmFile method.'));
                res = false;
            }
        }
        return res;
    },
    'save': function () {
        fs.writeFileSync(this.dataPath, JSON.stringify(this.data), encoding);
        return true;
    },
    'get': function (file, type) {
        if (!file) return;

        var that = this;
        if (!that.data[file]) return false;

        file = that.data[file];
        if (type === 'md5') {
            return file.md5;
        } else {
            return file.ts;
        }
    }
};

module.exports = new Timestamp();
