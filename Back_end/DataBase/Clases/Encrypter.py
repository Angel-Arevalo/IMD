class Encrypter:
    def __init__(self, password):
        self.modulus = 2491
        self.publicExponent = 37
        self.privateExponent = 1293
        self.password = password

    def From_String_To_RSA(self):
        listOfNum = []
        for letter in self.password:
            letter = int.from_bytes(letter.encode(), 'big')
            listOfNum.append(letter)
        return listOfNum

    def RSA_Encrypt(self):
        listOfNum = self.From_String_To_RSA()
        final_Password = ''
        for Nums in listOfNum:
            final_Num = (Nums ** self.publicExponent) % self.modulus
            final_Password = final_Password + str(hex(final_Num)) + ' '
        return final_Password

    def RSA_Decrypt(self, ciphertext):
        
        encrypted_nums = ciphertext.split()
        decrypted_message = ''
        for encrypted_num_str in encrypted_nums:
            encrypted_num = int(encrypted_num_str, 16)
            decrypted_num = (encrypted_num ** self.privateExponent) % self.modulus
            decrypted_message += chr(decrypted_num)

        return decrypted_message

en = Encrypter('Hola')
encrypted_message = en.RSA_Encrypt()
print("Encrypted:", encrypted_message)

# Now decrypt the ciphertext
decrypted_message = en.RSA_Decrypt(encrypted_message)
print("Decrypted:", decrypted_message)
