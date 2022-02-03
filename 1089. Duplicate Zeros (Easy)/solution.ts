/**
 Do not return anything, modify arr in-place instead.
 */
function duplicateZeros(arr: number[]): void {
  for (let i = 0; i < arr.length - 1; ++i) {
    if (arr[i] === 0) {
      shiftForward(arr, i + 1);
      arr[i + 1] = 0;
      ++i;
    }
  }
}

function shiftForward(arr: number[], index: number): void {
  for (let i = arr.length - 1; i >= index; --i) {
    arr[i] = arr[i - 1];
  }
}
