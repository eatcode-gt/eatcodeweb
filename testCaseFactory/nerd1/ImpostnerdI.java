
//package aprpyo;

import java.io.*;
import java.util.*;

public class ImpostnerdI {

	public static void main(String[] args) throws IOException {

		ImpostnerdI obj = new ImpostnerdI();

		obj.doStuff();

	}

	class stnode {
		long n11, n10, n01, n00;
		// 11 = take both sides, 00 = take neither, etc.

		public stnode(long n11, long n10, long n01, long n00) {
			super();
			this.n11 = n11;
			this.n10 = n10;
			this.n01 = n01;
			this.n00 = n00;
		}
	}
	
	int n, q;
	int[] arr;
	stnode[] st; int len = 1;
	void init() {
		while (len <= arr.length) len *= 2;
		st = new stnode[len*2];
		for (int i = 0; i < st.length; i++) {
			st[i] = new stnode(0, 0, 0, 0);
		}
	}
	stnode m(stnode l, stnode r) {
		stnode ans = new stnode(0, 0, 0, 0);
		ans.n00 = Math.max(l.n01+r.n00, Math.max(l.n00+r.n10, l.n00+r.n00));
		ans.n10 = Math.max(l.n11+r.n00, Math.max(l.n10+r.n10, l.n10+r.n00));
		ans.n11 = Math.max(l.n11+r.n01, Math.max(l.n10+r.n11, l.n10+r.n01));
		ans.n01 = Math.max(l.n01+r.n01, Math.max(l.n00+r.n11, l.n00+r.n01));
		return ans;
	}
	void u(int pos, long val) {
		pos += len;
		st[pos] = new stnode(val, -1000000000000000L, -1000000000000000L, 0);
		pos /= 2;
		while (pos > 0) {
			stnode l = st[pos*2]; stnode r = st[pos*2+1];
			st[pos] = m(l, r);
			pos /= 2;
		}
	}
	stnode f(int a, int b) {
		a += len; b += len;
		stnode nodel = new stnode(0, 0, 0, 0),
				noder = new stnode(0, 0, 0, 0);
		while (a <= b) {
			if (a%2==1) {
				nodel = m(nodel, st[a]);
				a++;
			}
			if (b%2==0) {
				noder = m(st[b], noder);
				b--;
			}
			a/=2;b/=2;
		}
		return m(nodel, noder);
	}
	
	private void doStuff() throws IOException {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int n = Integer.parseInt(st.nextToken());
		int q = Integer.parseInt(st.nextToken());
		st = new StringTokenizer(br.readLine());
		arr = new int[n];
		init();
		for (int i = 0; i < n; i++) {
			arr[i] = Integer.parseInt(st.nextToken());
			u(i, arr[i]);
		}
		for (int i = 0; i < q; i++) {
			st = new StringTokenizer(br.readLine());
			int type = Integer.parseInt(st.nextToken());
			int n1 = Integer.parseInt(st.nextToken());
			int n2 = Integer.parseInt(st.nextToken());
			if (type == 1) {
				u(n1-1, n2);
			} else {
				stnode temp = f(n1-1, n2-1);
				System.out.println(Math.max(Math.max(temp.n00, temp.n01), Math.max(temp.n10, temp.n11)));
			}
		}
		br.close();

	}

}