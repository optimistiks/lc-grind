/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
var findAllRecipes = function (recipes, ingredients, supplies) {
  // count dependencies of each recipe
  const deps = {};
  const adjList = [];

  // initialize adj list and deps map from recipes and supplies
  recipes.forEach((recipe) => {
    adjList[recipe] = [];
    deps[recipe] = 0;
  });
  supplies.forEach((supply) => {
    adjList[supply] = [];
  });

  // build the adj list
  recipes.forEach((recipe, index) => {
    ingredients[index].forEach((ingredient) => {
      if (!adjList[ingredient]) adjList[ingredient] = [];
      adjList[ingredient].push(recipe);
      deps[recipe] += 1;
    });
  });

  // start bfs from supplies
  // if some ingredient of some recipe is not present in the supplies,
  // the dependency count of that recipe will never reach 0
  const queue = [...supplies];
  while (queue.length > 0) {
    const item = queue.shift();
    adjList[item].forEach((child) => {
      // reduce the dependency count of each item that depends on this ingredient
      deps[child] -= 1;
      if (deps[child] === 0) {
        // if some dependency count is now 0, we can add it to the queue
        queue.push(child);
      }
    });
  }

  // the recipes we can cook is the recipes whose dependency count reached 0 during BFS
  return recipes.filter((recipe) => deps[recipe] === 0);
};
