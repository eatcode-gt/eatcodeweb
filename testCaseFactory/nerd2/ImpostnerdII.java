import java.io.*;
import java.util.*;

public class ImpostnerdII {

	public static void main(String[] args) throws IOException {

		ImpostnerdII obj = new ImpostnerdII();

		obj.doStuff();

	}
	long[] tree, lazy; int len;
	
	void init() {
		len = 1;
		while (len <= n) len *= 2;
		tree = new long[len*2];
		lazy = new long[len*2];
	}
	void upd(int pos, int cl, int cr, int l, int r, long val) {
		// check if lazy update needed first
		if (pos < lazy.length && lazy[pos] != 0) {
			tree[pos] += (cr-cl+1)*(lazy[pos]);
			if (pos < len) {
				lazy[pos*2] += lazy[pos];
				lazy[pos*2+1] += lazy[pos];
			}
			lazy[pos] = 0;
		}
		
		// current seg invalid
		if (cl > cr || cl > r || cr < l) return;
		
		// fully within range
		if (cl >= l && cr <= r) {
			tree[pos] += (cr-cl+1)*val;
			if (pos < len) {
				lazy[pos*2] += val;
				lazy[pos*2+1] += val;
			}
			return;
		}
		
		// partly within range
		int mid = (cl+cr)/2;
		upd(pos*2, cl, mid, l, r, val);
		upd(pos*2+1, mid+1, cr, l, r, val);
		tree[pos] = tree[pos*2]+tree[pos*2+1];
	}
	long query(int pos, int cl, int cr, int l, int r) {
		// current seg invalid
		if (cl > cr || cl > r || cr < l) return 0;
		
		// check if lazy update needed first
		if (pos < lazy.length && lazy[pos] != 0) {
			tree[pos] += (cr-cl+1)*(lazy[pos]);
			if (pos < len) {
				lazy[pos*2] += lazy[pos];
				lazy[pos*2+1] += lazy[pos];
			}
			lazy[pos] = 0;
		}
		
		// fully within range
		if (cl >= l && cr <= r) return tree[pos];

		// partly within range
		int mid = (cl+cr)/2;
		long a = query(pos*2, cl, mid, l, r);
		long b = query(pos*2+1, mid+1, cr, l, r);
		return a+b;
	}
	
	int n, q;
	private void doStuff() throws IOException {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		n = Integer.parseInt(st.nextToken());
		q = Integer.parseInt(st.nextToken());
		init();
		st = new StringTokenizer(br.readLine());
		for (int i = 0; i < n; i++) {
			int temp = Integer.parseInt(st.nextToken());
			upd(1, 1, n, i+1, i+1, temp);
		}
		for (int i = 0; i < q; i++) {
			st = new StringTokenizer(br.readLine());
			int type = Integer.parseInt(st.nextToken());
			if (type == 1) {
				int l = Integer.parseInt(st.nextToken());
				int r = Integer.parseInt(st.nextToken());
				int v = Integer.parseInt(st.nextToken());
				upd(1, 1, n, l, r, v);
			} else {
				int l = Integer.parseInt(st.nextToken());
				int r = Integer.parseInt(st.nextToken());
				System.out.println(query(1, 1, n, l, r));
			}
		}
		br.close();

	}

}