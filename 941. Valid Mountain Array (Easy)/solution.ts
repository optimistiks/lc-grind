function validMountainArray(arr: number[]): boolean {
  if (arr.length < 3) {
    return false;
  }
  let peak: number | null = null;
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i + 1] === arr[i]) {
      return false;
    }
    if (peak !== null && arr[i + 1] > arr[i]) {
      return false;
    }
    if (peak === null && arr[i + 1] < arr[i]) {
      if (i !== 0) {
        peak = arr[i];
      } else {
        return false;
      }
    }
  }
  return peak !== null;
}
