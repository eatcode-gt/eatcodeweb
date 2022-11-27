max = 100010
mod = 1000000007


def sum(bit_tree, index):
    sum = 0
    index += 1
    while index > 0:
        sum = (sum + bit_tree[index]) % mod
        index -= (index & (-index))
    return sum


def update(bit_tree, n, index, val):
    index += 1
    while index <= n:
        bit_tree[index] = (bit_tree[index] + val) % mod
        index += (index & (-index))


if __name__ == '__main__':
    nums_count = int(input())
    nums = []
    for i in range(nums_count):
        nums.append(int(input()))
    pairs = []
    for i in range(nums_count):
        pairs.append((nums[i], i))
    pairs.sort(key=lambda pair: -pair[0])

    one_greater = [0] * max
    two_greater = [0] * max
    ans = 0
    for pair in pairs:
        ans = (ans + ((sum(two_greater, nums_count - 1) - sum(two_greater, pair[1] - 1) + mod) % mod)) % mod
        update(two_greater, nums_count, pair[1], (sum(one_greater, nums_count - 1) - sum(one_greater, pair[1] - 1) + mod) % mod)
        update(one_greater, nums_count, pair[1], 1)

    print(ans)
