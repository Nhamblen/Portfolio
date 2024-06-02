# Noah Hamblen
# 5/1/23

import sqlite3
conn = sqlite3.connect('shippers.db')
c = conn.cursor()

print ("\nEnter the values for a shipping company and it will be added to the database.", "\n")

try:
    stop = "y"
    while stop == "y" or stop == "Y":
    
        ship_id = input('Enter an ID: ')
        ship_name = input('Enter a name: ')
        ship_phone = input('Enter a phone number: ')
        c.execute("""INSERT INTO SHIPPERS(ID, NAME, PHONE)VALUES (?,?,?)""", (ship_id, ship_name, ship_phone))

        stop = input("Do you want to enter another company? (Y/N)")

except sqlite3.IntegrityError as e:
    print ("\nError occured:", e)
    
conn.commit ()
conn.close ()

input('\nPress enter to exit')
