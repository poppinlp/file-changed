# CHANGELOG

* 1.3.0
  * Update dependencies to fix security issue.
  * Add prettier to format.
* 1.2.1
  * Update test coverage to 100%.
  * Update npm publish tar to ignore some files.
* 1.2.0
  * Support glob for `check` and `update`.
  * Reconstruct test case.
* 1.1.2
  * Remove shrinkwrap file in publish package.
* 1.1.0
  * Support glob for `addFile` and `rmFile`.
* 1.0.0 [BREAK CHANGE]
  * This package will export a class now, you should `new` a instance to use it.
  * The constructor accepts a file path to store change database.
  * Rename `autoClean` to `clean`.
  * Reconstruct by es2015 syntax.
  * Add `eslint` for dev js lint.
  * Use `ava` as test framework instead of `mocha`.
  * Only test last stable and last LTS node version for CI.
* 0.1.0
  * Init.
