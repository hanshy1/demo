import math
import matplotlib.pyplot as plt
import numpy as np

#二项分布概率
def binomial(n, k, p):
    cnk = math.factorial(n) / (math.factorial(k) * math.factorial(n-k))
    result = (cnk * math.pow(p, k) * math.pow((1-p), (n-k)))
    return result

#n次独立事件中，至少发生k次的概率
def cal(n, k, p):
    result = 0
    for i in range(0, k, 1):
        result += binomial(n, i, p)
    return (1 - result)

# 绘制图表
def showChart(p):
    arr = []
    n = 1
    while(cal(n, 1, p) < 0.80 and n <= 100):
        arr.append(cal(n, 1, p))
        n += 1
    
    plt.plot(range(1, len(arr) + 1, 1),arr, marker='o', linestyle='dashed')
    plt.grid(ls=':', color='blue')
    plt.xticks(np.linspace(1, len(arr), len(arr)))
    plt.show()

# 输入概率
showChart(0.06)
 


