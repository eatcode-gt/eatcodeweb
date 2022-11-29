n = int(input())

ans = str(n)[::-1] == str(n)

print(1 if ans else 0, end="")