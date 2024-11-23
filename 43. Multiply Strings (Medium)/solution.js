/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (str1, str2) {
  const results = Array.from({ length: str1.length + str2.length }).fill(0);

  let smallStr = str1.length < str2.length ? str1 : str2;
  let bigStr = str1.length >= str2.length ? str1 : str2;

  for (let small = smallStr.length - 1; small >= 0; --small) {
    for (let big = bigStr.length - 1; big >= 0; --big) {
      let result = parseInt(smallStr[small]) * parseInt(bigStr[big]);

      result += results[small + big + 1];

      const ones = result % 10;
      const tens = Math.floor(result / 10);

      results[small + big + 1] = ones;
      results[small + big] += tens;
    }
  }

  while (results[0] === 0 && results.length > 1) {
    results.shift();
  }

  return results.join("");
};
