#include <iostream>
#include <sstream>
#include <fstream>
#include <iomanip>
#include <string>
#include <cstdlib>
#include <cstdio>
#include <cstring>
#include <cmath>
#include <ctime>
#include <climits>
#include <cassert>
#include <vector>
#include <queue>
#include <stack>
#include <deque>
#include <set>
#include <map>
#include <bitset>
#include <utility>
#include <algorithm>

using namespace std;

int main(int argc, char* argv[])
{
    int n = (rand() % ((int)1e5)) + 1;
    int k = (rand() % ((int)2e5)) + 1;

    cout << n << " " << k << "\n";
    for (int i = 0; i < n-1; i++)
    {
        cout << (int)((rand() % ((int)2e9 + 1)) - 1e9) << " ";
    }
    cout << (int)((rand() % ((int)2e9 + 1)) - 1e9) << "\n";
    
            int n1 = (rand() % n) + 1;
            int n2 = (rand() % n) + 1;
            if (n2 < n1) swap(n1, n2);
            cout << "2 " << n1 << " " << n2 << "\n";
    for (int i = 1; i < k; i++)
    {
        if (rand() % 2 == 1) {
            n1 = (rand() % n) + 1;
            n2 = (rand() % n) + 1;
            if (n2 < n1) swap(n1, n2);
            cout << "1 " << n1 << " " << n2 << " " << (int)((rand() % ((int)2e9 + 1)) - 1e9) << "\n";
        } else {
            n1 = (rand() % n) + 1;
            n2 = (rand() % n) + 1;
            if (n2 < n1) swap(n1, n2);
            cout << "2 " << n1 << " " << n2 << "\n";
        }
    }
    
    return 0;
}