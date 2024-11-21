/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  /*
    so the idea is
    we initialize union find as an array of account ids
    meaning each account is it's own parent
    we also prepare a map for emails
    now if we see an email for the first time
    we get a root level parent of it's account 
    and set it to a map like so
    { email: root level parent of the email's account }
    if we see an email for the second time (already exists in map)
    we union the parent of the second time email,
    and the parent that is in the map
    and we update the parent of the email in the map
    to a new root level parent 
    */

  const emails = {};

  const parents = Array.from({ length: accounts.length }).map(
    (_, index) => index
  );
  const ranks = [];

  const find = (v) => {
    if (parents[v] !== v) {
      parents[v] = find(parents[v]);
    }
    return parents[v];
  };

  const union = (a, b) => {
    const aParent = find(a);
    const bParent = find(b);
    if (aParent === bParent) {
      return;
    }
    const aParentRank = ranks[aParent] ?? 0;
    const bParentRank = ranks[bParent] ?? 0;
    if (aParentRank >= bParentRank) {
      parents[bParent] = aParent;
      ranks[aParent] = aParentRank + 1;
      ranks[bParent] = bParentRank;
    } else {
      parents[aParent] = bParent;
      ranks[aParent] = aParentRank;
      ranks[bParent] = bParentRank + 1;
    }
  };

  for (let i = 0; i < accounts.length; ++i) {
    const account = accounts[i];
    const name = account[0];
    for (let j = 1; j < account.length; ++j) {
      const email = account[j];
      // first email will be set to
      // email: accountId

      // second email will be set to
      // email2: accountId

      // third email to email3: accountId2
      // fourth email is again email2, but with accountId3
      // so we need to union accountid and accountid3
      // and update email parent
      if (emails[email] != null && accounts[emails[email]][0] === name) {
        union(emails[email], i);
        emails[email] = find(i);
      } else {
        emails[email] = find(i);
      }
    }
  }

  const mergedAccounts = Object.entries(
    Object.entries(emails).reduce((acc, [email, account]) => {
      const root = find(account);
      if (!acc[root]) {
        acc[root] = [];
      }
      acc[root].push(email);
      return acc;
    }, {})
  ).reduce((acc, [account, emails]) => {
    return [...acc, [accounts[account][0], ...emails.sort()]];
  }, []);

  return mergedAccounts;
};
