function checkIfExist(arr: number[]): boolean {
  const doubles = {};
  const singles = {};
  for (let i = 0; i < arr.length; ++i) {
    const item = arr[i];
    if (doubles[item]) {
      return true;
    }
    if (singles[item * 2]) {
      return true;
    }
    doubles[item * 2] = true;
    singles[item] = true;
  }
  return false;
}
