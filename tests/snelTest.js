/* eslint no-console: 0 */
'use strict';

function printColored(output, color) {
  const colors = {
    red:    '\x1b[31m',
    green:  '\x1b[32m',
  };

  const outputString = colors[color] + output + '\x1b[0m';
  console.log(outputString);
}

function printTestResults(expected, actual, testInput, desc) {
  if (expected === actual) {
    printColored('  ' + desc, 'green');
  } else {
    printColored('  ' + desc, 'red');
    console.log('    Expected: %s', expected);
    console.log('    Actual:   %s', actual);
    console.log('    Arguments:');
    console.log(testInput);
  }
  console.log();
}

function runTest(testCase) {
  const testFunc = testCase.testFunc;
  const funcArgs = testCase.funcArgs;
  const expected = testCase.expectedResult;
  const desc = testCase.desc;

  let result;
  // If the test function requires multiple arguments, it's an array
  if (typeof(testCase.funcArgs) === 'object') {
    result = testFunc.apply(this, funcArgs);
  } else {
    result = testFunc(funcArgs);
  }

  printTestResults(expected, result, funcArgs, desc);
}

function testCategory(category) {
  console.log(category.name);
  category.testCases.forEach(runTest);
}

function runAllTests(tests) {
  tests.forEach(testCategory);
}

module.exports = {
  test: runAllTests,
};
