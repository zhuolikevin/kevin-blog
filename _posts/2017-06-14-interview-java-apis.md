---
layout: post
title: "Interview Java APIs"
date: 2017-06-14 14:10:00 -0600
permalink: /:categories/:year/:month/:day/:title/
tags: English Techs Note
excerpt: This is a note for collection of Java APIs that may be useful in coding interviews.
---

1. `String`

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
public String reverseWords(String s) {
  String[] words = s.split(" ");
  StringBuilder res = new StringBuilder();
  for (String word: words) {
          res.append(new StringBuffer(word).reverse().toString() + " ");
  }
  return res.toString().trim();
}
        ```

1. `HashSet`

    - Initialization with pre-defined elements

        ```java
String[] elements = { "A", "B", "C", "D", "E" };
HashSet set = new HashSet(Arrays.asList(elements));
        ```

        But this may cause extra `n` space because we create another array.