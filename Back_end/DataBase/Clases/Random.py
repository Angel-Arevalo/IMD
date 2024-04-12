from random import choice

def function(lamda, x):
    return lamda * x * (1 - x)


def Randomizer():
    r = 0
    x = []

    while r < 4:
        pop = 0.5
        for _ in range(1000):
            pop = function(r, pop)
        for _ in range(64):
            x.append(r)
            pop = function(r, pop)
        r += 0.0001
        if len(x) > 10000:
            break
    
    return choice(x)*1000000//10

print(Randomizer())
