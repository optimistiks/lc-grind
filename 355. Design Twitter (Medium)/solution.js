const MOST_RECENT = 10;
let TIME = 0;

var Twitter = function () {
  // map of sets
  this.follows = new Map();
  // map of arrays
  this.tweets = new Map();
};

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function (userId, tweetId) {
  this._initUser(userId);

  this.tweets.get(userId).push([tweetId, TIME++]);
};

/**
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function (userId) {
  this._initUser(userId);

  const NUM_RESULTS = 10;
  const results = [];

  // contains arrays of shape [tweetId, index, userId, time]
  // where index is the index of the tweet in the array of tweets of userId
  // used to be able to get the previous tweet by accessing it using index-1
  const tweetIdMaxHeap = new MaxPriorityQueue((item) => item[3]);

  // include the user id itself so the user's tweets are present in the feed
  const followees = [...this.follows.get(userId), userId];

  followees.forEach((userId) => {
    const tweets = this.tweets.get(userId);
    const index = tweets.length - 1;
    const tweet = tweets[index];
    if (tweet == null) {
      return;
    }
    const [tweetId, time] = tweet;
    tweetIdMaxHeap.push([tweetId, index, userId, time]);
  });

  while (results.length < NUM_RESULTS && tweetIdMaxHeap.size() > 0) {
    const [tweetId, index, userId] = tweetIdMaxHeap.dequeue();

    results.push(tweetId);

    const nextTweet = this.tweets.get(userId)[index - 1];
    if (nextTweet == null) {
      continue;
    }
    const [nextTweetId, time] = nextTweet;
    tweetIdMaxHeap.enqueue([nextTweetId, index - 1, userId, time]);
  }

  return results;
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function (followerId, followeeId) {
  this._initUser(followerId);
  this._initUser(followeeId);

  this.follows.get(followerId).add(followeeId);
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function (followerId, followeeId) {
  this._initUser(followerId);
  this._initUser(followeeId);

  this.follows.get(followerId).delete(followeeId);
};

Twitter.prototype._initUser = function (userId) {
  if (!this.follows.has(userId)) this.follows.set(userId, new Set());
  if (!this.tweets.has(userId)) this.tweets.set(userId, []);
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

/*
REACTO

Repeat

PostTweet(tweetId, userId)
   new tweet with tweetId, belongs to userId

follow(followerId, followeeId)
   followerId started following followeeId

unfollow(followerId, followeeId)
   followerId unfollowed followeeId

getNewsFeed(userId)
   return 10 most recent tweetIds of the given user news feed
   it should contain tweets of the users who the user followed, or the user himself

Example

Approach

should we build the news feed on demand, or pre-create them

someones feed may be represented by a heap
when a tweet is posted, check all followers of the user, and the user itself
if heap size is 10, pop the top (the least recent) (so min heap)

follow
        add followeeId to Set under followerId key
        (follows.get(followerId).add(followeeId))

        check if userId1 follows userId2
        follows.get(userId1).has(userId2)

        // add tweets of user followeeId to the feed of followerId
        // feed is a min heap ordered by createdAt
        // top of the heap is the oldest tweet
        // look at the last tweet of the new user
        // is it later than the oldest tweet 
        // pop the old tweet
        // push the latest tweet
        // see the oldest tweet again

unfollow 
    (follows.get(followerId).delete(followeeId))

postTweet
    tweets.get(userId).push(tweetId) // an array of tweets by userId

getNewsFeed


*/
