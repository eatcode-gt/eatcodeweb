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
#include <random>

#define forn(i, n) for (int i = 0; i < int(n); i++)

using namespace std;

int main(int argc, char* argv[])
{

    int n = rand() % ((int)1e5 - 1) + 1;
    int k = rand() % ((int)1e5 - n) + n + 1;

    vector<int> p(n);
    forn(i, n)
        if (i > 0)
            p[i] = rand() % i;

    cout << n << " " << k << "\n";
    vector<int> perm(n);
    forn(i, n)
        perm[i] = i;
    random_device rd;
    shuffle(perm.begin() + 1, perm.end(), rd);
    vector<pair<int,int> > edges;

    for (int i = 1; i < n; i++)
        if (rand() % 2 == 1)
            edges.push_back(make_pair(perm[i], perm[p[i]]));
        else
            edges.push_back(make_pair(perm[p[i]], perm[i]));

    shuffle(edges.begin(), edges.end(), rd);

    for (int i = 0; i + 1 < n; i++)
        cout << (edges[i].first + 1) << " " << (edges[i].second + 1) << " " << ((rand() % ((int) 1e9)) + 1) << "\n";
    for (int i = 0; i < (k-(n-1)); i++) {
        cout << ((rand() % n) + 1) << " " << ((rand() % n) + 1) << " " << ((rand() % ((int) 1e9)) + 1) << "\n";
    }

    return 0;
}