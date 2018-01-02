#include <stdio.h>

typedef struct Test {
    int a;
    int b;
    int c;
} Test;

struct Test *createList(int length) {
    Test array[length];
    Test *p;

    p = array;
    return p;
}