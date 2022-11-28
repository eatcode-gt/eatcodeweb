import java.io.*;
import java.util.*;

public class Wiring {

	public static void main(String[] args) throws IOException {

		Wiring obj = new Wiring();

		obj.doStuff();

	}
	
	int[] par, size;
	void init() {
		par = new int[n]; size = new int[n];
		for (int i = 0; i < n; i++) {
			par[i] = i; size[i] = 1;
		}
	}
	int f(int n) {
		if (par[n] != n) par[n] = f(par[n]);
		return par[n];
	}
	boolean m(int a, int b) {
		a = f(a); b = f(b);
		if (a == b) return false;
		if (size[a]+size[b]==n) return false;
		if (size[b] > size[a]) {
			int temp = b;
			b = a;
			a = temp;
		}
		par[b] = a;
		size[a] += size[b];
		return true;
	}
	
	class SortArr implements Comparator<int[]> {

		@Override
		public int compare(int[] o1, int[] o2) {
			return o1[2]-o2[2];
		}
		
	}

	int n, m;
	int[][] edges;
	private void doStuff() throws IOException {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		n = Integer.parseInt(st.nextToken());
		m = Integer.parseInt(st.nextToken());
		edges = new int[m][3];
		for (int i = 0; i < edges.length; i++) {
			st = new StringTokenizer(br.readLine());
			edges[i] = new int[] {
					Integer.parseInt(st.nextToken()),
					Integer.parseInt(st.nextToken()),
					Integer.parseInt(st.nextToken())
			};
		}
		br.close();
		
		Arrays.sort(edges, new SortArr());
		init();
		long ans = 0;
		for (int[] i : edges) {
			if (m(i[0]-1, i[1]-1)) ans += i[2];
		}

		System.out.println(ans);

	}

}