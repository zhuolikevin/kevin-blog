---
layout: post
title: "Classic Algorithm -- Fisher-Yates Shuffle Algorithm"
date: 2017-08-18 14:15:00 -0500
permalink: /:categories/:year/:month/:day/:title/
tags: English Techs Interview Algorithm
excerpt: Fisher-Yates algorithm can be used to shuffle an array in O(n) time. We can also modify it to generate k numbers out of n within O(k) time
---

> Fisher-Yates algorithm can be used to shuffle an array in O(n) time. We can also modify it to generate k numbers out of n within O(k) time.

## Fisher-Yates Shuffle

The idea of **Fisher-Yates** shuffling is fairly straightforward. We keep randomly choosing a number from the beginning part of the array and put it to the end part. To be specific, we have a pointer scanning from end to head. In each iteration, we generate a random index, and swap the number at this index with the current tail of undetermined parts. The codes can be find below.

```java
class shuffle {
  public void shuffle(int[] nums) {
    Random rand = new Random();
    for (int i = nums.length - 1; i >= 0; i--) {
      int j = rand.nextInt(i + 1);
      int temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
    }
  }
}
```

The time complexity is `O(n)`. The proof of the algorithm can be find in [GeeksForGeeks](http://www.geeksforgeeks.org/shuffle-a-given-array/).

## Randomly Select k Numbers out of n

In most cases, we may not need to shuffle the whole array. Instead, we need to get parts of the array with equal probability for each elements but do not touch all the elements, i.e. in `O(k)` time if we just want k element.

The solution can be running partial Fisher-Yates algorithm. We keep generate numbers and "put it at the end of the array". Yes, we do not really swap them to the end this time. We can keep track of their mapping. Whenever we generate an index seen before, we can use its mapping. The codes can be find below.

```java
class RandomSelection {
  public int[] select(int[] nums, int k) {
    Random rand = new Random();
    int[] res = new int[k];
    Map<Integer, Integer> swap = new HashMap<>();
    int limit = nums.length;

    for (int i = 0; i < k; i++) {
      int originPosition = rand.nextInt(limit);
      // If we have seen originPosition before, we need to use its mapped position
      int swapPosition = swap.getOrDefault(originPosition, originPosition);
      limit--;
      // Update position mapping to the last available position
      swap.put(originPosition, swap.getOrDefault(limit, limit));

      res[i] = nums[swapPosition];
    }

    return res;
  }
}
```
[Source Codes](https://repl.it/KLTA/1)

This can also be used in *Mine Sweeper*, where you want to randomly position `k` mines among a matrix with `n` available slots in `O(k)` time.

### Useful Resources

- [GeeksForGeeks](http://www.geeksforgeeks.org/shuffle-a-given-array/)
