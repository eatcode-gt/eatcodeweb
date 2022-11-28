import java.io.*;
import java.util.*;

public class BerryPicking {

	public static void main(String[] args) throws IOException {

		BerryPicking obj = new BerryPicking();

		obj.doStuff();

	}
	
	int len = 1;
	void init() {
		while (len <= n) len *= 2;
		st = new long[len*2];
	}
	void uOne(int pos, long inc) {
		st[pos] += inc;
		pos /= 2;
		while (pos > 0) {
			st[pos] = st[pos*2]+st[pos*2+1];
			pos /= 2;
		}
	}
	void u(int pos, long inc) {
		pos += len;
		int rpos = pos+etSize[pos-len];
		uOne(pos, inc); uOne(rpos, -inc);
	}
	long fr(int b) {
		int a = len; b += len;
		long sum = 0;
		while (a <= b) {
			if (a%2==1) sum += st[a++];
			if (b%2==0) sum += st[b--];
			a/=2; b/=2;
		}
		return sum;
	}
	int[][] parent;
	int lca(int a, int b) {
		if (heights[reverseET[b]] > heights[reverseET[a]]) {
			int temp = b;
			b = a;
			a = temp;
		}
		while (heights[reverseET[a]] != heights[reverseET[b]]) {
			int dist = heights[reverseET[a]] - heights[reverseET[b]];
			int count = 0;
			while (dist/(1 << count) != 0) count++;
			a = parent[a][count-1];
		}
		if (a==b) return a;
		outer: while (true) {
			for (int i = 19; i >= 0; i--) {
				if (parent[a][i] != parent[b][i]) {
					a = parent[a][i];
					b = parent[b][i];
					continue outer;
				}
			}
			break;
		}
		return parent[a][0];
	}
	long f(int a, int b) {
		long alen = fr(reverseET[a]);
		long blen = fr(reverseET[b]);
		int lca = lca(a, b);
		return alen+blen-(2*fr(reverseET[lca]))+berries[lca];
	}
	
	int[] et, reverseET, etSize;
	long[] st;
	int count = 0;
	long[] berries;
	void findHeight(int node, int par, int hei) {
		et[count] = node; reverseET[node] = count; count++;
		heights[reverseET[node]] = hei;
		etSize[reverseET[node]] = 1;
		parent[node][0] = Math.max(par, 0);
		int cur = Math.max(par, 0), curCount = 0;
		while (true) {
			cur = parent[cur][curCount];
			if (cur==0) break;
			curCount++;
			parent[node][curCount] = cur;
		}
		for (int i : graph[node]) {
			if (i==par) continue;
			findHeight(i, node, hei+1);
			etSize[reverseET[node]] += etSize[reverseET[i]];
		}
	}

	int n, k;
	ArrayList<Integer>[] graph;
	int[] heights;
	@SuppressWarnings("unchecked")
	private void doStuff() throws IOException {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		n = Integer.parseInt(st.nextToken());
		k = Integer.parseInt(st.nextToken());
		graph = new ArrayList[n];
		for (int i = 0; i < graph.length; i++) {
			graph[i] = new ArrayList<>();	
		}
		for (int i = 0; i < graph.length-1; i++) {
			st = new StringTokenizer(br.readLine());
			int a = Integer.parseInt(st.nextToken())-1;
			int b = Integer.parseInt(st.nextToken())-1;
			graph[a].add(b); graph[b].add(a);
		}
		heights = new int[graph.length];
		et = new int[graph.length];
		reverseET = new int[graph.length];
		etSize = new int[graph.length];
		parent = new int[graph.length][20];
		findHeight(0, -1, 0);
		berries = new long[graph.length];
		for (int i = 0; i < n; i++) {
			berries[i] = Integer.parseInt(br.readLine());
		}
		init();
		for (int i = 0; i < berries.length; i++) {
			u(reverseET[i], berries[i]);
		}
		for (int i = 0; i < k; i++) {
			st = new StringTokenizer(br.readLine());
			int type = Integer.parseInt(st.nextToken());
			int n1 = Integer.parseInt(st.nextToken());
			int n2 = Integer.parseInt(st.nextToken());
			if (type == 1) {
				long inc = n2-berries[n1-1];
				u(reverseET[n1-1], inc);
				berries[n1-1] = n2;
			} else System.out.println(f(n1-1, n2-1));
		}
		br.close();

	}

}