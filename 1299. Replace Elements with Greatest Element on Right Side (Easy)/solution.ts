function replaceElements(arr: number[]): number[] {
  let max = -1;
  for (let i = arr.length - 1; i >= 0; --i) {
    const el = arr[i];
    arr[i] = max;
    if (el > max) {
      max = el;
    }
  }
  return arr;
}
