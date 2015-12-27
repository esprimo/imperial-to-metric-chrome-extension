'use strict';

const intOrFloat = '([0-9]+(\\.[0-9]+)?)';
const unitSuffix = '([^a-zA-Z]|$)';

const toConvert = [
  { regex: new RegExp(intOrFloat + ' ?mi(les?)?' + unitSuffix, 'i'),    unit: 'km', multiplier: 1.60934  },
  { regex: new RegExp(intOrFloat + ' ?f(ee|oo)?t' + unitSuffix, 'i'),   unit: 'm',  multiplier: 0.3048   },
  { regex: new RegExp(intOrFloat + ' ?yards' + unitSuffix, 'i'),        unit: 'm',  multiplier: 0.9144   },
  { regex: new RegExp(intOrFloat + ' ?(pound|lb)s?' + unitSuffix, 'i'), unit: 'kg', multiplier: 0.453592 },
  { regex: new RegExp(intOrFloat + ' ?gallons?' + unitSuffix, 'i'),     unit: 'l',  multiplier: 3.78541  },
  { regex: new RegExp(intOrFloat + ' ?stones?' + unitSuffix, 'i'),      unit: 'kg', multiplier: 6.35029  },
  { regex: new RegExp(intOrFloat + ' ?in(ch(es)?)?' + unitSuffix, 'i'), unit: 'cm', multiplier: 2.54     },
];

function appendAfter(text, appendAfterRegex, toAppend) {
  const regex = new RegExp('(' + appendAfterRegex + ')');
  const updatedText = text.replace(regex, '$1 ' + toAppend);

  return updatedText;
}

function convert(originalAmount, multiplier) {
  let convertedAmount = originalAmount * multiplier;
  // round to two decimals
  convertedAmount = Math.round(convertedAmount * 100) / 100;

  return convertedAmount;
}

function convertText(text, matches, unitIndex) {
  // If 'text' would be for example "It's 12 feet away", 'fullTextMatch'
  // would be "12 feet" and 'originalAmount would be "12".
  const fullTextMatch   = matches[0];
  const originalAmount  = matches[1];

  const multiplier  = toConvert[unitIndex].multiplier;
  const unit        = toConvert[unitIndex].unit;

  // Acutal number convertion
  const convertedAmount = convert(originalAmount, multiplier);
  // Format converted value for output (always add a space after)
  const convertedString = `(${convertedAmount} ${unit}) `;
  // Insert converted value after the original one
  const convertedText = appendAfter(text, fullTextMatch, convertedString);

  return convertedText;
}

function convertSimpleUnits(text) {
  const len = toConvert.length;

  for (let i = 0; i < len; i++) {
    // Check it there is an imperial unit in 'text'
    // Use search first since it's faster. Even though we have to
    // regex search twice it's worth it since we usually don't match
    // and therefor want it to be fast when not matching.
    if (text.search(toConvert[i].regex) !== -1) {
      const matches = text.match(toConvert[i].regex);

      if (matches) {
        text = convertText(text, matches, i);
      }
    }
  }
  return text;
}

function feetAndInchesToMeter(text) {
  // Regex to match for example 7'11"
  const matches = text.match('([0-9]{0,3})\'([0-9][0-2]?)"');

  if (matches) {
    const original = matches[0];
    const feet = matches[1];
    const inches = matches[2];
    let meter = (feet * 0.3048) + (inches * 0.0254);

    // Round to two decimals
    meter = Math.round(meter * 100) / 100;

    // Append unit
    meter = meter + 'm';

    // Append the meter value after the original
    // 7'11" will for example become:  7'11 (2.41m)
    const regex = new RegExp('(' + original + ')');
    text = text.replace(regex, '$1 (' + meter + ')');
  }

  return text;
}

function handleText(textNode) {
  let text = textNode.nodeValue;

  text = convertSimpleUnits(text);

  // This one works a bit different and needs to be separate
  text = feetAndInchesToMeter(text);

  textNode.nodeValue = text;
}

function walk(node) {
  // I stole this function from here:
  // http://is.gd/mwZp7E

  let child;
  let next;

  switch (node.nodeType) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;
    default:
      break;
  }
}

// if module and module.exports is defined, we're running node, otherwise it's
// in the browser. node is for testing
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    convertSimpleUnits,
    feetAndInchesToMeter,
    toConvert,
  };
} else {
  walk(document.body);
}
