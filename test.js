var path = require('path'),
    chalk = require('chalk'),
    fs = require('fs'),
    exec = require('sync-exec'),
    mochaBin = path.join(__dirname, 'node_modules/.bin/mocha'),
    jsonPath = path.join(__dirname, '_timestamp.json');

clearTest();
runTest('test');
clearTest();

function runTest(testFile) {
    var result = exec(mochaBin + ' ' + path.join(__dirname, 'test', testFile + '.js'));

    if (result.status === 0) {
        console.log(chalk.green(result.stdout));
    } else {
        console.warn(chalk.red(result.stdout));
    }
}

function clearTest() {
    fs.existsSync(jsonPath) && fs.unlinkSync(jsonPath);
}
