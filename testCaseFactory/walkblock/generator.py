import random

x = random.randint(2, 1000)
y = random.randint(2, 1000)
dense = random.randint(1, 3)
o = random.randint(0, int(x*y/1000))
if dense == 3:
    o = random.randint(0, x*y)

print(str(x) + ' ' + str(y) + ' ' + str(o))
nums = list(range(x*y))
random.shuffle(nums)
for i in range(o):
    print(str(int(nums[i]/y) + 1) + ' ' + str(int(nums[i]%y) + 1))