# Noah Hamblen
# 5/1/23

import sqlite3
conn = sqlite3.connect('shippers.db') # Create connection object
c = conn.cursor() # Get a cursor object -- which works with tables

tableString = """CREATE TABLE SHIPPERS (
ID INTEGER not null primary key,
NAME VARCHAR(30),
PHONE VARCHAR(30))"""

c.execute(tableString) # Create a table

## Insert rows of data into the table
c.execute("INSERT INTO SHIPPERS VALUES (1,'Speedy Express','503-555-9831')")
c.execute("INSERT INTO SHIPPERS VALUES (2,'United Package','503-555-3199')")
c.execute("INSERT INTO SHIPPERS VALUES (3,'Federal Shipping','503-555-9931')")
c.execute("INSERT INTO SHIPPERS VALUES (4,'Hermes Parcel','503-555-2123')")


c.execute("SELECT * FROM SHIPPERS")
records1 = c.fetchall()
print(records1, "\n")

c.execute("DELETE FROM SHIPPERS WHERE ID = 3")
c.execute("SELECT * FROM SHIPPERS")
records2 = c.fetchall()
print(records2, "\n")

c.execute("UPDATE SHIPPERS SET NAME = 'Hermes Parcel and Shipping' WHERE ID = 4")
c.execute("SELECT * FROM SHIPPERS")
records3 = c.fetchall()
print(records3, "\n")

c.execute("INSERT INTO SHIPPERS VALUES (5,'Noahs Shipping','402-889-1210')")
c.execute("SELECT * FROM SHIPPERS")
records4 = c.fetchall()
print(records4, "\n")


conn.commit() # Save (commit) the changes
conn.close()

input('\nPress enter to exit')
