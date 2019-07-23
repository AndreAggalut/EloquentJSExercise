// importing the script code
const SCRIPTS = require('./script.js');
/**
 *
 * @param {*} items
 * @param {*} groupName
 * The countBy function expects a collection (anything that we can loop over with for/of) and a function that computes a group name for a given element. It returns an array of objects, each of which names a group and tells you the number of elements that were found in that group.
 */
function countBy(items, groupName) {
  const counts = [];
  for (const item of items) {
    const name = groupName(item);
    const known = counts.findIndex(c => c.name === name);
    if (known === -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}
/**
 *
 * @param {*} code
 * We have a characterScript function and a way to correctly loop over characters.
 */
function characterScript(code) {
  for (const script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }
  return null;
}
/**
 *
 * @param {*} text
 * Write a function that computes the dominant writing direction in a string of text.
 * Remember that each script object has a direction property that can be
 *  "ltr" (left to right),
 * "rtl" (right to left), or "ttb" (top to bottom).
 * The dominant direction is the direction of a majority
 * of the characters that have a script associated with them.
 * The characterScript and countBy functions
 * defined earlier in the chapter are probably useful here.
 */
function dominantDirection(text) {
  // Why not use the direction instead of the name of the script
  const directions = countBy(text, char => {
    const script = characterScript(char.codePointAt(0));
    return script ? script.direction : 'none';
  });

  // Checks if we have anything at all
  const total = directions.reduce((n, { count }) => n + count, 0);
  if (total === 0) return 'No scripts found';

  // Uses a sorted reduce by comparing the largest on-going value
  const leadDirection = directions.reduce((a, b) =>
    a.count < b.count ? b : a
  );

  return leadDirection.name;
}

console.log(dominantDirection('Hello!'));
// → ltr
console.log(dominantDirection('Hey, مساء الخير'));
// → rtl
