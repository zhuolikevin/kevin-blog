---
layout: post
title: "Advanced Data Structure -- Union Find"
date: 2017-07-14 9:15:00 -0600
permalink: /:categories/:year/:month/:day/:title/
tags: English Techs Interview Algorithm
excerpt: Union Find is a very useful and easy to implement data structure to union sets or quick figure out whether two elements are in the same set
---

**Union Find** is a very useful and easy to implement data structure to union sets or quick figure out whether two elements are in the same set. It can be implemented with as simple as an *array*, thus makes it a great fit for technical coding interviews which takes no more than half hour for a problem. In this post, we will summarize the basic functionalities and implementation of **Union Find**.

## Functionality

When should we consider using a Union Find data structure when we meet an algorithm problem? There may be several senarios as listed below:

1. Weak connected components in a directed graph / connected components in an undirected graph

1. Determine if two elements in a same set

1. Determine if there are circles in an undirected graph

## Implementation

In java, we can implement a `UnionFind` class as followings.

```java
class UnionFind {
  int[] arr;
  UnionFind(int n) {
    this.arr = new int[n];
    // Initialize father as itself
    for (int i = 0; i < n; i++) {
      this.arr[i] = i;
    }
  }

  public void union(int i, int j) {
    int fatherI = find(i);
    int fatherJ = find(j);
    if (fatherI != fatherJ) {
      // Set the father of one set to be the father of another set
      arr[fatherI] = fatherJ;
    }
  }

  public int find(int i) {
    int father = arr[i];
    // Tracking all the way up the the big father
    while (father != arr[father]) {
      father = arr[father];
    }
    return father;
  }
}
```

As the codes shown above, we may want to analyze the time complexity of the algorithm.

### Find

For **find** operation, we track all the way up the the big father or root if we take the structure as a tree. So the worst case time complexity is `O(n)` when all nodes connected as a line like a linked list. The average complexity can be `O(logn)` if we have our structure as a balanced tree.

### Union

For **union** operation, we have two **find** operation to find the fathers of the two sets, and an `O(1)` operation to union them. So the time complexity is exactly the same as find with worst case `O(n)`.

### Compressed Find

`O(n)` for both operations is not so good, or somehow too bad. You may wonder if we can improve it? Fortunately, the answer is yes!

We can have a **Compressed Find** to make our time complexity for both operations to `O(1)` eventually.

```java
public int find(int i) {
  int father = arr[i];
  while (father != arr[father]) {
    father = arr[father];
  }

  // Set the fathers of all nodes along the way to be the big father
  int cur = i;
  while (cur != father) {
    int temp = arr[cur];
    arr[cur] = father;
    cur = temp;
  }

  return father;
}
```

The only thing we did is to set the fathers of all nodes along the way to be the "big father". This action flattens a long deep tree branch to multiple branches that is connected with the root directly. This may cause even more time at the first few operations, but eventually, when all nodes connected to the root one edge away, the time complexity can be just `O(1)`.
