n = int(input())
arr = list(map(int, input().strip().split(" ")))

# arr = []
# for _ in range(n):
#     arr.append(int(input()))
arr.sort()
for i in arr:
    print(i, end=" ")
