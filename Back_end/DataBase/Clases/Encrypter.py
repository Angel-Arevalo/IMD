
class Encrypter: 

    def __init__(self, password): 

        self.modulus = 2491
        self.publicExponent = 37 
        self.privateExponent = 937 
        self.password = password

    def From_String_To_RSA(self):

        listOfNum=[]
        for letter in self.password: 
            letter = int.from_bytes(letter.encode(), 'big')
            listOfNum.append(letter)
        return listOfNum
    
    def RSA_Encrypt(self): 

        listOfNum = self.From_String_To_RSA()
        final_Password = ''
        for Nums in listOfNum: 
            final_Num = (Nums**self.publicExponent) % self.modulus
            final_Password = final_Password+str(hex(final_Num))+' '
        return final_Password
    

encriptador = Encrypter('hola')
print(encriptador.From_String_To_RSA())
print(encriptador.RSA_Encrypt())
