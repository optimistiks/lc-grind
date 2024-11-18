/**
 * @param {string[]} paths
 * @return {string[][]}
 */
var findDuplicate = function (paths) {
  // each path
  // "root_directory/dir_1/dir_2/…/dir_m file_1.txt(file_1_content) file_2.txt(file_2_content) … file_n.txt(file_n_content)"
  const map = paths.reduce((map, path) => {
    const items = path.split(" ");
    // now items is an array, with directory at index 0, and the rest of the items are files with content
    const dir = items.shift();
    // now only files are in the array
    items.forEach((item) => {
      // using regex, separate file name from file content
      const [_, name, content] = item.match(/^(.+)\((.+)\)$/);
      if (!map.has(content)) {
        map.set(content, []);
      }
      map.get(content).push(`${dir}/${name}`);
    });
    return map;
  }, new Map());

  return Array.from(map.values()).filter((list) => list.length >= 2);
};
