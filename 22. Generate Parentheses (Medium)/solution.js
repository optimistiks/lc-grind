/*
Repeat, Example, Approach, Code, Test, and Optimize

Repeat
I'm given n pairs of parentheses (), as a number n
I need to return all combinations of well formed parentheses
as an array of strings


Example
I'm given n=2 it means 2 pairs ()()
combinations: ()(), (()): 2 combinations

I'm given n=3 it means 3 pairs ()()()
combinations: ()()(), ((())), (())(), ()(()), (()()): 5 combinations

Approach
???
should we operate on individual parentheses, or on pairs?
should we use a stack?
2 pairs means 2 open and 2 close parentheses
we start with stack with an opening p
then we can push another opening, or a closing
push opening, +1
some recursion is needed? like branching? backtracking?

at each iteration, we push either an opening p or a closing p into the stack
when there are no ps left, we have a combination, push it, then backtrack
we need counts of ps available, and balance

if balance === 0 we can only push opening p and only IF we have >0 closing p, increase balance
if balance > 0 we can push an opening bracket if we have balance+1 closing p, increase balance
                and we can push a closing bracket (decrease balance)

instead of balance, we can use left and right count
if left count < n, it means we still can add left parentheses
if left count > right count, it means we can also add right parentheses to cover the unmatched left

*/

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const combos = [];

  const genPRec = (combo, left, right) => {
    // base case: combo length is 2n. we know it's valid, since we don't visit invalid branches
    if (combo.length === 2 * n) {
      combos.push(combo.join(""));
      return;
    }

    if (left < n) {
      // we can still add open parentheses since we have n of them
      combo.push("(");
      genPRec(combo, left + 1, right);
      combo.pop();
    }

    if (left > right) {
      combo.push(")");
      // we have unmatched open parentheses, we can add closing ones
      genPRec(combo, left, right + 1);
      combo.pop();
    }
  };

  genPRec([], 0, 0);

  return combos;
};

/*
Test
test: n = 2
genPRec([], 0, 2, 2)
    not a base case
    not a balance >0 case
    balance =0 case: 
        genPRec(["("], 1, 1, 2)

genPRec(["("], 1, 1, 2)
    not a base case
    balance>0 case
        close=2, enough to cover balance(1)+1, so push another open p
        genPRec(["(", "("], 2, 0, 2)
        genPRec(["(", ")"], 0, 1, 1)

genPRec(["(", "("], 2, 0, 2)
    not a base case
    balance > 0 case
    close=2, not enough to cover balance(2)+1
    genPRec(["(", "(", ")"], 1, 0, 1)

genPRec(["(", "(", ")"], 1, 0, 1)
    not a base case
    balance > 0 case
    close = 1, not enough to cover balance(1)+1 case
    genPRec(["(", "(", ")", ")"], 0, 0, 0)

genPRec(["(", "(", ")", ")"], 0, 0, 0)
    base case

*/

/*
Optimize
call stack depth is the length of the combo, which is 2n, so essentially n (So memory is O(n))

If we create all possible combinations out of n pairs:
We are generating all possible strings of length 2n. At each character, we have two choices: choosing ( or ), which means there are a total of (2^2n) unique strings.

If we only generate valid combinations:
The number of valid combinations generated from n parentheses pairs is equal to the nth Catalan number. It is a proven fact and you should just learn it by heart.

Time complexity: O( 4^n / sqrt(n) ​)

When considering each valid string, it is important to note that we use a mutable instance (StringBuilder in Java, list in Python etc.). As a result, in order to add each instance of a valid string toanswer, we must first convert it to a string. This process brings an additional n factor in the time complexity.

*/
