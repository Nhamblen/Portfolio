# Noah Hamblen
# 4/18/23

import tkinter

top = tkinter.Tk()

canvas1 = tkinter.Canvas(width=160, height=160)
canvas1.pack()

entry1 = tkinter.Entry()
canvas1.create_window(80, 30, window=entry1)
label1 = tkinter.Label(top, text="Character Extractor").place(x=30, y=0)

def extractvowel():
    x1 = (entry1.get())
    stringvowel = tkinter.Label(text=x1.translate(str.maketrans('','','aeiouAEIOU')))
    canvas1.create_window(80, 53, window=stringvowel)

def extractconsonant():
    x1 = (entry1.get())
    stringconsonant = tkinter.Label(text=x1.translate(str.maketrans('','','bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ')))
    canvas1.create_window(80, 53, window=stringconsonant)

button1 = tkinter.Button(text='Extract Vowels', command=extractvowel)
canvas1.create_window(80, 80, window=button1)

button2 = tkinter.Button(text='Extract Consonants', command=extractconsonant)
canvas1.create_window(80, 110, window=button2)

top.mainloop()

input('\nPress enter to exit')
