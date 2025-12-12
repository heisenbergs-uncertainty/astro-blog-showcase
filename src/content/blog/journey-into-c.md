---
title: 'Journey Into the C (Ep 1): Punished by Pointers'
description: 'My journey into the C programming language and how it is reminding me of the fundamentals of a computer.'
pubDate: '2025-12-12'
tags: ['coding', 'c', 'fundamentals']
---
I have officially been writing production code for over 7 years. While this may not seem like a long period of time to most, this is just about the longest I have done one thing in my entire life so its significant to me. I have shipped code in React, Go, Java, Rust, Node, and .NET, orchestrated multi-server Kubernetes clusters, and automated every process I can think of. Now I am picking up AI, learning to orchestrate multiple agents while maintaining code quality and correctness. 

Because of the vast landscape of technology I deal with I end up utilizing high level languages and frameworks that do a lot of the nitty-gritty hoopla for me. I just don't have the time for a lot of it. AI has become a good friend of mine, taking much of the rudimentary workload off of my shoulders and allowing me to focus on what is important. But the more I deal with AI, the more important it seems to me that I review my fundamentals to keep me grounded to the true functionality of a computer. 

Because I am a masochist, I decided that C was a good place to start for fundamentals. This lead me to the website [Exercism](https://exercism.io/). Exercism is a crowd-sourced code mentorship platform that is great for learning a language through hands on exercises. For example, the C track that I am working on has 84 different exercises varying from easy to hard, each which has a comprehensive set of tests, a readme, help files, links to helpful resources, and it can be submitted back to the site using the cli tool for approval. You can then read community solutions or submit your work to the community. Pretty nifty.

## The Length of an Array

In one of the exercises you are calculating the Hamming distance, which is just number of differences in two strings of the same length. If their length is not the same, return -1 AKA invalid. The Hamming distance is a metric for comparing two binary data strings. While it is primarily used for binary strings, it can also be applied to strings of equal length over any alphabet to count positions where corresponding symbols are different. It's a fundamental concept in information theory, coding theory, and bioinformatics. You can learn more about it on [Wikipedia](https://en.wikipedia.org/wiki/Hamming_distance) or [GeeksforGeeks](https://www.geeksforgeeks.org/hamming-distance-two-strings/), but that is a bit outside the scope of this article.

```md
GAGCCTACTAACGGGAT
CATCGTAATGACGGCCT
^ ^ ^  ^ ^    ^^
// Hamming Distance = 7
```

The straight forward solution is to use the `strlen()` function to compare sizes and then iterate through to compare differences in characters.

```c
int hamming_distance(char *s1, char *s2) {
    if (strlen(s1) != strlen(s2)) {
        return -1;
    }
    int distance = 0;
    for (int i = 0; i < strlen(s1); i++) {
        if (s1[i] != s2[i]) {
            distance++;
        }
    }
    return distance;
}
```

Since I am trying to dig deeper into C, I decided that I would write the strlen method myself. Working in higher level languages, it has been a long time since I had to write a method for the length of a data type. Thinking I was very clever and elegant, I wrote the following:

```c
// WRONG
size_t strlen(char *str) {
    return sizeof(str) / sizeof(str[0]);
}
```

And this is where C, a language created before I was born, smacked me in the face as the new-born software baby I am. On my 64-bit machine, the function will always return 8, no matter whether the array has 3 elements or 3 million. Welcome back to C.

## Pointer Decay

In C, when an array appears in almost any context other than as the direct operand of sizeof, &, or _Alignof, it silently “decays” into a pointer to its first element. The most common place this happens? Function parameters.

```c
size_t strlen(char arr[100]) {...} // looks like an array, but is a pointer
size_t strlen(char arr[]) {...} // same thing 
size_t strlen(char *arr) {...} // identical after translation
```

All three declarations are 100% equivalent after preprocessing. Inside the function, arr is just a uint8_t*. At that point sizeof(arr) is the size of a pointer (8 bytes on x86-64), not the size of whatever it points to. You may be like me and just think "well maybe I need to dereference the pointer" and try sizeof(&arr). In this case you, like myself, would just have a misunderstanding of pointers in C and would be creating a pointer-to-a-pointer and therefore getting the size of the pointer that is pointing at another pointer which would once again result in the size of a pointer, likely 8 bytes.

The C standard explicitly says this decay happens except in three narrow cases:

1. When the array is the operand of sizeof
2. When the array is the operand of & (address-of)
3. When the array is a string literal used to initialize another array

In every other context - including function calls - decay occurs, and the original size information is lost forever.

The only place the original sizeof trick works is in the exact scope where the array object was declared. Pass the data variable to any function and the magic disappears.

```c
int main() {
    uint8_t arr[100];
    size_t len = sizeof(arr) / sizeof(arr[0]);
    printf("%zu\n", len);
    // Prints 100
    return 0;
}
```

## The Solutions

After the initial embarrassment wore off, I dug into array decay and spent a decent period of time researching how c does it. This was a good refresher on some basic data structures in C. While I have written these in C++ and higher level languages like Python, for some reason C has a way of feeling extremely foreign to me which forces me to dig deeper into the language.

The following four methods work and their usage is dependant on what works best for you.

### Method 1: Explicit Array Size

This is considered the "C way" of doing it. It is the most explicit and clear way to handle array sizes.

```c
void some_process(uint8_t arr[], size_t len) {
    // Inside this function, arr is treated as a pointer (uint8_t*)
    // The 'len' parameter provides the actual size of the array
    for (size_t i = 0; i < len; i++) {
        // Access arr[i] safely
    }
}

int main() {
    uint8_t arr[100]; // An array of 100 uint8_t elements
    // Calculate the length using sizeof at the point where the array's true size is known
    some_process(arr, sizeof(arr) / sizeof(arr[0]));
    return 0;
}
```

**Why it works:** The length is computed once, at the only location where the compiler still knows the array’s true size (before it "decays" to a pointer when passed to a function), then explicitly passed down as a separate argument.

**Performance:** O(1) length access, very low overhead (just passing an additional argument).

**Safety:** Very safe, as long as the correct length is computed and passed. It allows for robust bounds checking within the function.

### Method 2: Sentinel Value - The C-String Way

This is the way C strings are handled. The null character `\0` is used to mark the end of the string. This is a common pattern in C and is used in many standard library functions.

```c
// For a string of unknown length
size_t sentinel_length(char *str) {
    size_t i = 0;
    while (str[i] != '\0') {
        i++;
    }
    return i;
}

// For an int array
size_t sentinel_length(int *arr) {
    size_t i = 0;
    while (arr[i] != 0x7FFFFFFF) {
        i++;
    }
    return i;
}

int main() {
    char str[] = "hello";
    size_t len = sentinel_length(str);
    printf("%zu\n", len);
    return 0;
}
```

**Why it works:** A reserved value marks the end, just like the null byte in "hello\0".

**Performance:** O(n) every time you need the length.

**Limitations:** Sentinel cannot appear in valid data; adds storage overhead.

The primary issue with this is that you will need to ensure that the sentinel value is not included in the data or else the methods will evaulate incorrectly. For example,

```c
char str[] = "he\0llo";
size_t len = sentinel_length(str); // Evaluates to 2 since we have a null character in the string
```

### Method 3: Length-prefixed arrays with flexible array members (C99)

```c
typedef struct {
    size_t len;
    uint8_t arr[];
} int_array_t;

int_array_t* create_int_array(size_t len) {
    int_array_t* arr = malloc(sizeof(int_array_t) + len * sizeof(uint8_t));
    arr->len = len;
    return arr;
}
size_t length(int_array_t *arr) {
    return arr->len;
}

int main() {
    int_array_t arr = { .len = 100 };
    size_t len = length(&arr);
    printf("%zu\n", len);
    return 0;
}
```

**Why it works:** The length is stored as a prefix, making it accessible without additional computation.

**Performance:** O(1) length access, zero overhead.

**Safety:** Impossible to get wrong if you remember to pass the length.

## Lessons Learned

Seven years in, a language older than I am reminded me - in under 30 seconds - that experience does not equal mastery. Just because I have spent years working on building scalable systems that utilize the high-speed libraries of these languages does not mean that understand it. Even if I do think I understand generally what my program does, do I actually know how it does it on a fundamental level? Could I or my software benefit from understanding it at a lower level?

My original implementation using isn’t wrong. In fact, it is actually the standard method. It’s just brutally contextual.

Real C forces explicitness because the penalty for sloppiness is buffer overflows, security bugs, and 3 a.m. debugging sessions.

Modern languages give us safety and convenience. C gives us truth - sometimes brutally.

I still reach for higher-level tools daily and by no-means am I a C-purist, but exercises like this are why I’ll never abandon the low-level world. They keep the illusions in check.

Next time you are writing in Go, Rust, Python, or JavaScript I want you pause when you come across some standard or non-standard library method that you use all the time and ask yourself if you actually know what it is doing under-the-hood. It may be exactly as you think and you can go one feeling smart, it could be a hyper-optimized method that teaches you something you didn't know before, or maybe it doesn't do exactly what you think it does and you could improve your software.