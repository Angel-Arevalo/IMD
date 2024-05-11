from math import sqrt

class Calculator:

    def __init__(self, rawData):

        self.rawData = rawData
        self.allGrades = []

        # Aqui creo una lista con todas las notas de todos los estudiantes, ejemplo: [3.3, 4.4, 5.6, 7.6, 4.0, 9.0, 7.9, 9.8, 4.0, 9.0, 5.9, 9.8]
        for i in range (len(rawData)): 
            for j in  range (len(rawData[i])):
                for k in range(len(rawData[i][j])):
                    if (isinstance(rawData[i][j][k], int) or isinstance(rawData[i][j][k], float)) and rawData[i][j][k] != -1:
                        self.allGrades.append(rawData[i][j][k])

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
    
    def valorUnico(self, name = '', world = 1, grade = 1): 

        selectedName = []
        for i in  range (len(self.rawData)):
            for j in range (len(self.rawData[i])):
                if self.rawData[i][j][0] == name:
                    selectedName.append(self.rawData[i][j][1:])

        if len(selectedName) > 0:
            return selectedName[world-1][grade-1]
        
        else: 
            return -1

    def errorAbsoluto(self, name = '', world = 1, grade = 1):

        if self.valorUnico(name, world, grade) >= 0: 
            selectedValue = self.valorUnico(name, world, grade)
        else: 
            selectedValue = self.valorMedio()
        averageValue = self.valorMedio()
        absoluteError = selectedValue - averageValue

        if absoluteError < 0: 
            absoluteError *=-1
        return absoluteError

    def errorRelativo(self, name = '', world = 1, grade = 1):

        if self.valorUnico(name, world, grade) >= 0: 
            selectedValue = self.valorUnico(name, world, grade)
        else: 
            selectedValue = self.valorMedio()
        averageValue = self.valorMedio()
        absoluteError = selectedValue - averageValue
        relativeError = absoluteError / averageValue

        return relativeError

    def porcentajeDeErrorRelativo(self, name = '', world = 1, grade = 1):

        relativeErrorPercentage = self.errorRelativo(name, world, grade) * 100
        return relativeErrorPercentage

'''
calculadora1 = Calculator([[['Jorge', 4.5, 4, 5, -1, -1], ['Jorge', 2.5, 5, 6, -1, -1], ['Jorge', 5, -1, -1, -1, -1], ['Jorge', -1, -1, -1, -1, -1]], [['Arielito', 3.4, -1, -1, -1, -1], ['Arielito', -1, -1, -1, -1, -1], ['Arielito', -1, -1, -1, -1, -1], ['Arielito', -1, -1, -1, -1, -1]]])
print(f''' ''''

SUMATORIA: {calculadora1.sumatoria()}
VALOR MEDIO: {calculadora1.valorMedio()}
DESVIACION STANDARD: {calculadora1.desviacionEstandard()}
DESVIACION STANDARD MEDIA:{calculadora1.desviacionEstandardMedia()}
PORCENTAJE DE ERROR: {calculadora1.porcentajeDeError()}
ERROR ABSOLUTO: {calculadora1.errorAbsoluto()}
ERROR RELATIVO: {calculadora1.errorRelativo()}
PORCEMTAJE DE ERROR RELATIVO: {calculadora1.porcentajeDeErrorRelativo()}

''' ''')

Para utilizar los errores hay que especificar el usuario, mundo y numero de nota del respectivo mundo. 

'''
