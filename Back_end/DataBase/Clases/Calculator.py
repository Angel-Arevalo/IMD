import math

class Calculator:
    def __init__(self, kwargs):

        for attr in kwargs.keys():
            self.__dict__[attr] = kwargs[attr]

    def sumatoria(self):

        summation = sum(list(self.__dict__.values()))
        return summation

    def valorMedio(self):

        summation = self.sumatoria()
        quantity = len(list(self.__dict__.values()))
        averageValue = 1 / quantity * summation

        return averageValue

    def desviacionEstandard(self):

        quantity = len(list(self.__dict__.values()))
        averageValue = self.valorMedio()
        summationOfDeviation = sum((x - averageValue) ** 2 for x in list(self.__dict__.values()))
        standardDeviationToThePowerOfTwo = summationOfDeviation / (quantity - 1)
        standardDeviation = math.sqrt(standardDeviationToThePowerOfTwo)

        return standardDeviation

    def desviacionEstandardMedia(self):

        quantity = len(list(self.__dict__.values()))
        standardDeviation = self.desviacionEstandard()
        rootOfQuantity = math.sqrt(quantity)
        averageStandardDeviation = standardDeviation / rootOfQuantity

        return averageStandardDeviation

    def porcentajeDeError(self):

        averageValue = self.valorMedio()
        averageStandardDeviation = self.desviacionEstandardMedia()
        percentageError = (averageStandardDeviation / averageValue) * 100

        return percentageError


    def errorAbsoluto(self, key):

        selectedValue = self.__dict__.get(key)
        averageValue = self.valorMedio()
        absoluteError = selectedValue - averageValue

        return absoluteError

    def errorRelativo(self, key):

        selectedValue = self.__dict__.get(key)
        averageValue = self.valorMedio()
        absoluteError = selectedValue - averageValue
        relativeError = absoluteError / averageValue

        return relativeError

    def porcentajeDeErrorRelativo(self, key):

        relativeErrorPercentage = self.errorRelativo(key) * 100
        return relativeErrorPercentage

