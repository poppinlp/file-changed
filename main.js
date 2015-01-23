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
    chalk = require('chalk'),
    encoding = {
        encoding: 'utf8'
    };

function Timestamp () {
    this._init();
};

Timestamp.prototype = {
    '_init': function () {
        var that = this;
        that.dataPath = path.normalize('./_timestamp.json');
        that.data = fs.existsSync(that.dataPath) ? JSON.parse(fs.readFileSync(that.dataPath, encoding)) : {};
    },
    '_checkFileChanged': function (path, ts) {
        return fs.existsSync(path) ? (fs.statSync(path).mtime.getTime() === ts) : false;
    },
    'check': function () {
        var that = this,
            data = that.data,
            res = [],
            item;

        for (item in data) {
           if (data.hasOwnProperty(item)) {
               if (!that._checkFileChanged(item, data[item])) {
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
                that.data[list[len]] = fs.statSync(list[len]).mtime.getTime();
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
                    that.data[item] = '';
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
    }
};

module.exports = new Timestamp();
