
// Java program to demonstrate lazy
// propagation in segment tree
import java.util.*;
import java.io.*;

public class Sushi {
    // Max tree size
    final static int MAX = 100010, MOD = 1000000007;

    long BITree[] = new long[MAX];

    /*
     * n --> No. of elements present in input array.
     * BITree[0..n] --> Array that represents Binary
     * Indexed Tree.
     * arr[0..n-1] --> Input array for which prefix sum
     * is evaluated.
     */

    // Returns sum of arr[0..index]. This function
    // assumes that the array is preprocessed and
    // partial sums of array elements are stored
    // in BITree[].
    long getSum(int index) {
        long sum = 0; // Initialize result

        // index in BITree[] is 1 more than
        // the index in arr[]
        index = index + 1;

        // Traverse ancestors of BITree[index]
        while (index > 0) {
            // Add current element of BITree
            // to sum
            sum = (sum + BITree[index]) % MOD;

            // Move index to parent node in
            // getSum View
            index -= index & (-index);
        }
        return sum;
    }

    // Updates a node in Binary Index Tree (BITree)
    // at given index in BITree. The given value
    // 'val' is added to BITree[i] and all of
    // its ancestors in tree.
    public void updateBIT(long n, int index,
            long val) {
        // index in BITree[] is 1 more than
        // the index in arr[]
        index = index + 1;

        // Traverse all ancestors and add 'val'
        while (index <= n) {
            // Add 'val' to current node of BIT Tree
            BITree[index] = (BITree[index] + val) % MOD;

            // Update index to that of parent
            // in update View
            index += index & (-index);
        }
    }

    static class Pair implements Comparable<Pair> {
        long a;
        int b;

        public Pair(long a, int b) {
            this.a = a;
            this.b = b;
        }

        @Override
        public int compareTo(Sushi.Pair o) {
            if (this.a < o.a) {
                return 1;
            }
            return -1;
        }

    }

    // Main function
    public static void main(String args[]) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long[] nums = new long[Integer.parseInt(br.readLine())];
        for (int i = 0; i < nums.length; i++) {
            nums[i] = Integer.parseInt(br.readLine());
        }

        Pair[] pairs = new Pair[nums.length];
        for (int index = 0; index < nums.length; index++) {
            pairs[index] = new Pair(nums[index], index);
        }
        Arrays.sort(pairs);

        Sushi oneGreater = new Sushi(), twoGreater = new Sushi();
        long ans = 0;
        for (Pair i : pairs) {
            ans = (ans + ((twoGreater.getSum(nums.length - 1) - twoGreater.getSum(i.b - 1) + MOD) % MOD)) % MOD;
            twoGreater.updateBIT(nums.length, i.b,
                    (oneGreater.getSum(nums.length - 1) - oneGreater.getSum(i.b - 1) + MOD) % MOD);
            oneGreater.updateBIT(nums.length, i.b, 1);
        }

        br.close();
        System.out.println(ans);
    }
}

// This code is contributed by Ranjan Binwani @ GeeksForGeeks