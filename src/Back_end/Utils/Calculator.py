from math import sqrt

class Calculator:

    def __init__(self, RawData):

        self.dict = {}
        self.allGrades = []

        # Aqui creo un diccionario con la llave por noimbre y una lista de notas como valor, ejemplo: {'Alex': [3.3, 4.4, 5.6, 7.6], 'Juan': [4.0, 9.0, 7.9, 9.8], 'Juana': [4.0, 9.0, 5.9, 9.8]}
        for i in range(len(RawData)):
            tupleRawData = RawData.pop(0)
            key = tupleRawData[0]
            grades = list(tupleRawData[1:])

            self.dict[key] = grades

        # Aqui creo una lista con todas las notas de todos los estudiantes, ejemplo: [3.3, 4.4, 5.6, 7.6, 4.0, 9.0, 7.9, 9.8, 4.0, 9.0, 5.9, 9.8]
        for attr in self.dict.keys(): 
            for grade in range(len(self.dict[attr])):

                self.allGrades.append(self.dict[attr][grade])


        print(self.dict)
        print(self.allGrades)

    def sumatoria(self):

        summation = sum(list(self.allGrades))
        return summation

    def valorMedio(self):

        summation = self.sumatoria()
        quantity = len(list(self.allGrades))
        averageValue = 1 / quantity * summation

        return averageValue

    def desviacionEstandard(self):

        quantity = len(list(self.allGrades))
        averageValue = self.valorMedio()
        summationOfDeviation = sum((x - averageValue) ** 2 for x in list(self.allGrades))
        standardDeviationToThePowerOfTwo = summationOfDeviation / (quantity - 1)
        standardDeviation = sqrt(standardDeviationToThePowerOfTwo)

        return standardDeviation

    def desviacionEstandardMedia(self):

        quantity = len(list(self.allGrades))
        standardDeviation = self.desviacionEstandard()
        rootOfQuantity = sqrt(quantity)
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


calculadora1 = Calculator([("Ariel", 3.3, 4.4, 5.6, 7.6), ("Juan", 4.0, 9.0, 7.9, 9.8), ("Juana", 4.0, 9.0, 5.9, 9.8)])
print(calculadora1.desviacionEstandardMedia())

