def add(a, b):
  a = 9
  for _ in range(1000000000000):
    a = a*b
    b = 1+a
  return a;
  
