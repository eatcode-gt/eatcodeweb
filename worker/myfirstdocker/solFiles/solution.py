nums = list(map(int, input().strip().split(" ")))
target = int(input())

seen = dict()

for i, n in enumerate(nums):
    if target-n in seen:
        print(sort([seen[target-n], i]))
        break
    else:
        seen[n] = i