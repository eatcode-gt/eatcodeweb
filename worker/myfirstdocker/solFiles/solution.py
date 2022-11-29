def isPalindrome(x):
    y = str(x)
    lst = list(y)
    m = len(lst)
    if (x < 0):
        return 0
    elif (x == 0):
        return 1
    else:
        flag = 1
        for x in range((m+1)//2):
            if (lst[x] != lst[m-1-x]):
                return 0
        if (flag > 0):
            return 1


print(isPalindrome(int(input()))
