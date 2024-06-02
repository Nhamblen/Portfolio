# Noah Hamblen
# 5/14/23

import tkinter as tk
import sqlite3
import xml.etree.ElementTree as et
import csv


class GUI(tk.Frame):

    def __init__(self, parent):
        tk.Frame.__init__(self, parent)
        self.entry1 = tk.Entry(self)
        self.entry1.grid(column=0, row=1)
        self.entry2 = tk.Entry(self)
        self.entry2.grid(column=0, row=3)
        self.entry3 = tk.Entry(self)
        self.entry3.grid(column=0, row=5)
        self.entry4 = tk.Entry(self)
        self.entry4. grid(column=0, row=7)
        self.pack(fill=tk.BOTH, expand=True)

        tk.label1 = tk.Label(self, text="Employee ID").grid(column=0, row=0)
        tk.button1 = tk.Button(self, text="CSV", bg="pink", fg="black", command=self.EmployeeCSV).grid(column=1, row=1)

        tk.label2 = tk.Label(self, text="First Name").grid(column=0, row=2)
        tk.button2 = tk.Button(self, text="XML", bg="pink", fg="black", command=self.EmployeeXML).grid(column=1, row=2)

        tk.label3 = tk.Label(self, text="Last Name").grid(column=0, row=4)
        tk.button3 = tk.Button(self, text="DB", bg="pink", fg="black", command=self.EmployeeDB).grid(column=1, row=3)

        tk.label4 = tk.Label(self, text="Payrate").grid(column=0, row=6)

        for child in self.winfo_children():
            child.grid_configure(padx=5, pady=3)

    def EmployeeDB(self):
        conn = sqlite3.connect('EmployeeDB.db')
        c = conn.cursor()

        db1 = self.entry1.get()
        db2 = self.entry2.get()
        db3 = self.entry3.get()
        db4 = self.entry4.get()

        table = """CREATE TABLE IF NOT EXISTS EMPLOYEE (
            EmployeeID INTEGER not null primary key,
            FirstName VARCHAR(30),
            LastName VARCHAR(30),
            Payrate VARCHAR(30))"""
        c.execute(table)

        c.execute("""INSERT INTO EMPLOYEE(EmployeeID, FirstName, LastName, Payrate)VALUES (?,?,?,?)""",
                  (db1, db2, db3, db4))

        conn.commit()
        conn.close()

        print('\nData Inserted.')
        self.labelprint = tk.Label(self, text='Data Inserted.')
        self.labelprint.grid(column=0, row=8)
        self.labelprint.after(10000, self.labelprint.destroy)

    def EmployeeXML(self):
        tree = et.parse('EmployeeXML.xml')
        root = tree.getroot()

        xml1 = self.entry1.get()
        xml2 = self.entry2.get()
        xml3 = self.entry3.get()
        xml4 = self.entry4.get()

        emp = et.SubElement(root, 'Employee')

        eid = et.SubElement(emp, 'EmployeeID')
        eid.text = xml1
        first = et.SubElement(emp, 'FirstName')
        first.text = xml2
        last = et.SubElement(emp, 'LastName')
        last.text = xml3
        pay = et.SubElement(emp, 'Payrate')
        pay.text = xml4

        et.dump(root)
        tree.write('EmployeeXML.xml')

        print('\nData Inserted.')
        self.labelprint = tk.Label(self, text='Data Inserted.')
        self.labelprint.grid(column=0, row=8)
        self.labelprint.after(10000, self.labelprint.destroy)

    def EmployeeCSV(self):
        csv1 = self.entry1.get()
        csv2 = self.entry2.get()
        csv3 = self.entry3.get()
        csv4 = self.entry4.get()
        data = [csv1, csv2, csv3, csv4]

        with open('EmployeeCSV.csv', 'a', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(data)

        print('\nData Inserted.')
        self.labelprint = tk.Label(self, text='Data Inserted.')
        self.labelprint.grid(column=0, row=8)
        self.labelprint.after(10000, self.labelprint.destroy)


if __name__ == "__main__":
    mainWindow = tk.Tk()
    mainWindow.title("Insert Employee")
    GUI(mainWindow)
    mainWindow.mainloop()

input('\nPress enter to exit')
