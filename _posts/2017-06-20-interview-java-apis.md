---
layout: post
title: "Interview Java APIs"
date: 2017-06-20 14:10:00 -0600
permalink: /:categories/:year/:month/:day/:title/
tags: English Techs Note Interview
excerpt: This is a note for collection of Java APIs that may be useful in coding interviews.
---

1. Math

    - `Math.max(a, b)`
    - `Math.min(a, b)`
    - `Math.abs(a)`
    - `Math.sqrt(double a)`: return `double`
    - `Math.pow(double a, double b)`: return `double`
    - `Math.floor(double a)`: return `double`

1. Bit manipulation

    - Count binary 1s of an integer: `Integer.bitCount(int)`

1. `Array`

    - Sorting

        ```java
Arrays.sort(arr);
Arrays.sort(arr, new Comparator<Integer>() {
  @Override
  public int compare(int p, int q) {
          return p - q;  // Ascending
  }
});
        ```

1. `ArrayList`

    - Basic

        ```java
List<Integer> list = new ArrayList<>();
list.add(int a);
list.add(int index, int a);
list.remove(1);  // Remove element at index 1
list.remove(Integer.valueOf(1)) // Remove element with value 1
        ```

    - `ArrayList<String>` to `String[]`

        ```java
ArrayList<String> list = new ArrayList<>();
// ...
String[] arr = list.toArray(new String[list.size()]);
        ```

    - Sorting

        ```java
Collections.sort(list);
Collections.sort(list, Collections.reverseOrder());
Collections.sort(list, new Comparator<Integer>() {
  @Override
  public int compare(int p, int q) {
          return p - q;  // Ascending
  }
});
        ```

1. `String`

    - Index

        ```java
str.indexOf(int ch);
str.indexOf(int ch, int fromIndex);
str.indexOf(String str);
str.indexOf(String str, int fromIndex);
str.lastIndexOf(int ch);
str.lastIndexOf(int ch, int fromIndex);
str.lastIndexOf(String str);
str.lastIndexOf(String str, int fromIndex);
        ```

    - Split

        ```java
String[] parts = str.split("\\+");
        ```

    - `toCharArray()`

        Convert a string to char array. This is useful for string manipulation because `String` is immutable in Java.

        ```java
String s = "I am a coding dog.";
char[] chars = s.toCharArray(); // ['I', ' ', 'a', 'm', ... , 'g', '.']
// Some manipulation
// ...
return new String(chars); // Convert back to String
        ```

    - `StringBuilder` and `StringBuffer`

        ```java
StringBuilder sb = new StringBuilder();
sb.append("a");
sb.insert(0, "a");
sb.deleteCharAt(int index);
sb.reverse();
sb.toString();
        ```

        - Using `StringBuilder` is faster than "string plus" (e.g. `res = res + "b";`);
        - `StringBuilder` is faster than `StringBuffer` because `StringBuffer` is sychronized which is thread safe (thus more comlicated and slower as well).

1. `HashSet`

    - Initialization with pre-defined elements

        ```java
String[] elements = { "A", "B", "C", "D", "E" };
HashSet set = new HashSet(Arrays.asList(elements));
        ```

        But this may cause extra `n` space because we create another array.

1. `HashMap` & `HashTable`

    - `HashTable` is thread safe (like `StringBuffer`), so `HashMap` is faster.

1. `Stack` & `Queue`

    - Stack

        ```java
Stack<Integer> stack = new Stack<>();
stack.push(0);
int n = stack.pop();
int n = stack.peek();
stack.isEmpty();
stack.size();
        ```

    - Queue

        ```java
Queue<Integer> queue = new LinkedList<>();
queue.offer(0);
int n = queue.poll();
int n = queue.peek();
queue.isEmpty();
queue.size();
        ```

1. `PriorityQueue` (minHeap)

    - Basic

        ```java
Queue<Integer> pq = new PriorityQueue<>();
pq.offer(0);
int n = pq.poll();
int n = pq.peek();
pq.isEmpty();
pq.size();
        ```

    - Comparator

        ```java
Queue<Integer> pq = new PriorityQueue<>(int size, new Comparator<Integer>() {
  @Override
  public int compare(int p, int q) {
          return p - q;  // Ascending
  }
});
        ```

1. `Deque`

    ```java
Deque<Integer> deque = new LinkedList<>();
deque.offerFirst(0);
deque.offerLast(1);
int n = deque.pollFirst();
int n = deque.pollLast();
int n = deque.peekFirst();
int n = deque.peekLast();
    ```

1. `Random`

    ```java
Random rand = new Random();
// 0 <= i < n;
int i = rand.nextInt(n);
    ```

1. Conversions

    - `Character` to `Integer`: `Character.getNumericValue(char)`
    - `String` to `Integer`: `Integer.parseInt(String)`
    - `Integer` to `String`: `String.valueOf(int)`
    - `Character` to `String`: `String.valueof(char)`
    - `Integer` to `Character`: `Character.forDigit(int, 10)` or `(char)(int + '0')`
