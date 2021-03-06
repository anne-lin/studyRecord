/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if(n < 0){
        return 1/myPow(x,-n);
    }
    if(n == 0){
        return 1;
    }
    if(n == 1){
        return x;
    }
    return n & 1 == 1 ? x*myPow(x*x,n>>1) : myPow(x*x,n>>1);

    //有区别？
    if(n < 0){
        return 1/myPow(x,-n);
    }
    if(n == 0){
        return 1;
    }
    if(n == 1){
        return x;
    }
    return n % 2 == 0 ? myPow(x*x,n/2):x*myPow(x*x,Math.floor(n/2));
};
// @lc code=end

