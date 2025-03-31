/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
      let p1 = 0;
      let p2 = n
      while(p1<=p2) {
          let mid = Math.floor(p1+(p2-p1)/2)
          if(isBadVersion(mid)) {
              return mid;
          } else {
              p1 = mid+1
          }
      }

  };
};