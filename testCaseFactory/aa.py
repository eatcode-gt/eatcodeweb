n = int(input())
arr = input().strip().split(" ")
ans = 0
for i in arr:
    ans = ans ^ int(i)
print(ans)
