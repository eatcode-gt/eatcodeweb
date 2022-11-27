#include <cstdlib>
#include <iostream>
#include <ctime>

#define SIZE 30000

using namespace std;

int arr[2*SIZE+100];
int query[2*SIZE+100];

int main() {
    srand(time(0)); // use current time as seed for random generator
    for (int i=0;i<2*SIZE+1;i++) {
        arr[i] = i - 30000;
    }
    int n = rand() % (SIZE/2 -1) + 1;
    // int n = 3;
    for (int i=0;i<rand()%1000;i++) random_shuffle(arr, arr+2*SIZE+1);
    for (int i=0;i<n;i++){
        query[i*2] = arr[i];
        query[i*2 + 1] = arr[i];
    }
    query[2*n] = arr[n];
    for (int i=0;i<rand()%1000;i++) random_shuffle(query, query+2*n+1);
    printf("%d\n", 2*n+1);
    for (int i=0;i<2*n+1;i++) printf("%d ", query[i]);
    printf("\n");
}