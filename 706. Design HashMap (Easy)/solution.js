var MyHashMap = function () {
  // Initialize the hash map with a prime number of key spaces to reduce collisions
  this.keySpace = 2069;
  // Create an array of buckets to store key-value pairs, using the initialized prime number
  this.bucket = Array.from({ length: this.keySpace }, () => new Bucket());
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
  // Calculate the hash key using modulo operation with the key space
  const hashKey = key % this.keySpace;
  // Update the bucket at the hashed key with the key-value pair
  this.bucket[hashKey].update(key, value);
};

/**
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
  // Calculate the hash key using modulo operation with the key space
  const hashKey = key % this.keySpace;
  // Return the value associated with the key from the corresponding bucket
  return this.bucket[hashKey].get(key);
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
  // Calculate the hash key using modulo operation with the key space
  const hashKey = key % this.keySpace;
  // Remove the key-value pair from the corresponding bucket
  this.bucket[hashKey].remove(key);
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */

class Bucket {
  constructor() {
    // Initialize an empty array to store key-value pairs
    this.bucket = [];
  }

  get(key) {
    // Iterate through each key-value pair in the bucket
    for (const [k, v] of this.bucket) {
      // If the key matches the provided key, return the corresponding value
      if (k === key) {
        return v;
      }
    }
    // If the key is not found, return -1
    return -1;
  }

  update(key, value) {
    // Flag to indicate whether the key is found in the bucket
    let found = false;
    // Iterate through each key-value pair in the bucket
    for (let i = 0; i < this.bucket.length; i++) {
      const [k, v] = this.bucket[i];
      // If the key matches the key of the current key-value pair
      if (key === k) {
        // Update the value of the key-value pair
        this.bucket[i] = [key, value];
        // Set the flag to true, indicating that the key is found
        found = true;
        break;
      }
    }

    // If the key is not found in the bucket, add it along with its value
    if (!found) {
      this.bucket.push([key, value]);
    }
  }

  remove(key) {
    // Iterate through each key-value pair in the bucket
    for (let i = 0; i < this.bucket.length; i++) {
      const [k, v] = this.bucket[i];
      // If the key matches the key of the current key-value pair
      if (key === k) {
        // Delete the key-value pair from the bucket
        this.bucket.splice(i, 1);
        // Exit the loop as the key has been removed
        break;
      }
    }
  }
}

function calculateHash(key) {
  const keyBase = 2069;
  return key % keyBase;
}
