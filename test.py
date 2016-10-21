import operator

def longest_mult(arr):
  tm = None
  m = 0
  tm1 = 1
  tm2 = 1
  fn = False
  for j in arr:
    if j < 0:
      tm = None
      tm1 *= j
      
      if not fn:
        fn = True
      
      elif fn:
        tm2 *= j
      
      
    elif j > 0:
      tm1 *= j
      
      if not tm:
        tm = j
      else:
        tm *= j
        
      if tm > m:
        m = tm
      
      if fn:
        tm2 *= j
      
      
    if tm1 > m:
        m = tm1

    if tm2 > m:
      m = tm2
        
  print m
  return m
  

def mul(arr):
  print reduce(operator.mul, arr)

  
arr = [1,2,3,-4,-9,-10,-110,5,6,7,8]
longest_mult(arr)
mul(arr)

arr = [-1,-2,-3,-4,-5]
longest_mult(arr)
mul([2,3,4,5])

arr = [-6,-2,-3,-4,-5]
longest_mult(arr)
mul([2,3,4,6])

arr = [-6,10,-2,10,-3,-4,-5]
longest_mult(arr)
mul([2,3,4,6, 10, 10])

arr = [0]
longest_mult(arr)



