#include <cstdlib>
#include <iostream>

#define SIZE 30000

int n;
int ans, in1;

int main() {
    scanf("%d", &n);
    for (int i=0;i<n;i++) {
        scanf("%d", &in1);
        ans^=in1;
    }
    printf("%d\n",ans);
}