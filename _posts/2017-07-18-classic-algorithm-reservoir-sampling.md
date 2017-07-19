---
layout: post
title: "Classic Algorithm -- Reservoir Sampling"
date: 2017-07-18 9:50:00 -0600
permalink: /:categories/:year/:month/:day/:title/
tags: English Techs Interview Algorithm
excerpt: Reservoir Sampling is used to handle problems of random sampling of k entries out of n elements with equal probability k/n
---

Reservoir Sampling is used to handle problems of random sampling of `k` entries out of an array of `n` elements with equal probability k/n. Usually, the `n` is unknown or extremely large, thus we can not feed the whole array into the memory.

## A naive way

If we do not care about the "large" n, and all elements can be stored in memory, how can we handle this? We can use an array `arr[]`, and continuously generate random index `i` from `0 ... n-1`, then we put `nums[i]` into `arr[]` by checking if it is already there. We need **k** iterations for k random numbers, and for each iteration, we need `O(k)` time to figure out whether we can use this number or not (i.e. to see if it is already selected). The total time complexity could be `O(k^2)`.


```java
class Sampling {
  public int[] naiveSampling(int[] nums, int k) {
    int[] arr = new int[k];
    Random rand = new Random();

    int i = 0;
    while (i < k) {
      int index = rand.nextInt(nums.length);

      // Check if we can use the new number
      boolean canUse = true;
      for (int j = 0; j < i; j++) {
        if (arr[j] == nums[index]) {
          canUse = false;
          break;
        }
      }

      // If we can use this number, we can continue to find next one
      if (canUse) {
        i++;
      }
    }
  }
}
```


## O(n) solution (Reservoir Sampling)

The naive way is time consuming when `k` is really large. It can not handle the case when `nums` can not be stored int the memory as well. So how can we improve it? This is the way we called *Reservoir Sampling*.

We can have an array called `reservoir[]`, initialized with the first `k` elements of `nums` (i.e. index from `0 ... k-1`). Then index `i` start from `k ... n-1`, we generate a random index `j` from `0 ... i`. Now we have `i > k - 1`, so the generated index `j` can be `0 <= j <= k - 1` (inside the reservoir) or `k <= j <= i` (outside the reservoir). If it is inside the reservoir, we have `reservoir[j] = nums[i]`. After `i` reaches `n`, we have our randomized `k` elements in `reservor[]`.

```java
class Sampling {
  public int[] reservoirSampling(int[] nums, int k) {
    // Initial reservoir
    int[] reservoir = new int[k];
    int i = 0;
    while (i < k) {
      reservoir[i] = nums[i];
    }

    Random rand = new Random();
    while (i < nums.length) {
      // 0 <= j < i + 1;
      int j = rand.nextInt(i + 1);

      // Update number in reservoir
      if (j < k) {
        reservoir[j] = nums[i];
      }
    }
  }
}
```

You may wonder why this algorithm guarantees the `k/n` probability for each randomized number. Feel free to check on [GeeksforGeeks](http://www.geeksforgeeks.org/reservoir-sampling/), which got a comprehensive proof.

### Useful Resources

- [Leetcode Post](https://discuss.leetcode.com/topic/53753/brief-explanation-for-reservoir-sampling)
- [GeeksforGeeks](http://www.geeksforgeeks.org/reservoir-sampling/)
