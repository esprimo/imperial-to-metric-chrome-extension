'use strict';

const snelTest = require('./snelTest.js');
const convertStuff = require('../content_script.js');
const feetAndInchesToMeter = convertStuff.feetAndInchesToMeter;
const toConvert = convertStuff.toConvert;

function regexMatch(text, regex) {
  regex = new RegExp(regex);
  const match = regex.exec(text);
  return (match) ? match[2] : null;
}

const testObjects = [
  {
    name: 'Feet and inches',
    testCases: [
      {
        desc: 'Convert feet and inches to meter',
        testFunc: feetAndInchesToMeter,
        funcArgs: '7\'11"',
        expectedResult: '7\'11" (2.41m)',
      },
      {
        desc: 'Falls back to feet + inches when inches is above 12',
        testFunc: feetAndInchesToMeter,
        funcArgs: '7\'13"',
        expectedResult: '7\'13"',
      },
      {
        desc: 'Returns the feet if no inches are specified',
        testFunc: feetAndInchesToMeter,
        funcArgs: '7\'',
        expectedResult: '7\'',
      },
    ],
  },
  {
    name: 'Stones',
    testCases: [
      {
        desc: 'Don\'t match stoneage as stones',
        testFunc: regexMatch,
        funcArgs: [
          '125 stoneage on the run',
          toConvert[5].regex,
        ],
        expectedResult: null,
      },
      {
        desc: 'Match with suffixed +',
        testFunc: regexMatch,
        funcArgs: [
          'From 315lbs+ BF 49%',
          toConvert[3].regex,
        ],
        expectedResult: '315',
      },
      {
        desc: 'Match correct if <number><space><number>',
        testFunc: regexMatch,
        funcArgs: [
          'I do 5x4 310 lbs per day',
          toConvert[3].regex,
        ],
        expectedResult: '310',
      },
    ],
  },
  {
    name: 'Feet',
    testCases: [
      {
        desc: 'Match integer feet regex correctly',
        testFunc: regexMatch,
        funcArgs: [
          'It is 123 feet to town',
          toConvert[1].regex,
        ],
        expectedResult: '123',
      },
      {
        desc: 'Match floating point feet correctly',
        testFunc: regexMatch,
        funcArgs: [
          'It is 123.5 feet to town',
          toConvert[1].regex,
        ],
        expectedResult: '123.5',
      },
      {
        desc: 'Match mixed case feet',
        testFunc: regexMatch,
        funcArgs: [
          'Some people write like this: 20 Feet',
          toConvert[1].regex,
        ],
        expectedResult: '20',
      },
      {
        desc: 'Match foot as feet',
        testFunc: regexMatch,
        funcArgs: [
          '120 foot long',
          toConvert[1].regex,
        ],
        expectedResult: '120',
      },
      {
        desc: 'Match abbreviation ft as feet',
        testFunc: regexMatch,
        funcArgs: [
          '120 ft long',
          toConvert[1].regex,
        ],
        expectedResult: '120',
      },
    ],
  },
  {
    name: 'Miles',
    testCases: [
      {
        desc: 'Match miles regex correctly',
        testFunc: regexMatch,
        funcArgs: [
          'It is 123 miles to town',
          toConvert[0].regex,
        ],
        expectedResult: '123',
      },
      {
        desc: 'Match floating point miles correctly',
        testFunc: regexMatch,
        funcArgs: [
          'It is 123.5 miles to town',
          toConvert[0].regex,
        ],
        expectedResult: '123.5',
      },
      {
        desc: 'Match mixed case miles',
        testFunc: regexMatch,
        funcArgs: [
          'Some people write like this: 20 Miles',
          toConvert[0].regex,
        ],
        expectedResult: '20',
      },
      {
        desc: 'Don\'t match milestones as miles',
        testFunc: regexMatch,
        funcArgs: [
          'We have reach 5 milestones this year',
          toConvert[0].regex,
        ],
        expectedResult: null,
      },
    ],
  },
];

snelTest.test(testObjects);
