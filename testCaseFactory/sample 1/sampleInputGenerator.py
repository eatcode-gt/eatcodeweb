import random

n = random.randint(1, 200000)
print(n)
x = list(range(1, n+1))
random.shuffle(x)
for i in x:
    print(i, end=" ")
print("")
