import java.util.Arrays;
import java.util.Scanner;

public class WTB {
    public static int countWays(int x, int y) {
        if (x < 0 || y < 0) {
            return 0;
        }
        if (ways[x][y] != -1) {
            return ways[x][y];
        }
        if (blocked[x][y]) {
            ways[x][y] = 0;
            return 0;
        }
        int val = (countWays(x - 1, y) + countWays(x, y - 1)) % 1000000007;
        ways[x][y] = val;
        return val;
    }

    static int[][] ways;
    static boolean[][] blocked;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y = sc.nextInt();
        int ob = sc.nextInt();
        ways = new int[x][y];
        for (int[] way : ways) {
            Arrays.fill(way, -1);
        }
        ways[0][0] = 1;
        blocked = new boolean[x][y];
        for (int i = 0; i < ob; i++) {
            blocked[sc.nextInt() - 1][sc.nextInt() - 1] = true;
        }
        System.out.println(countWays(x - 1, y - 1));
        sc.close();
    }
}
