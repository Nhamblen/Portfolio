#Noah Hamblen
#7/30/23

import random
import time
import sqlite3


#server function
def main():
    count = 24
    x = 0

    while x < count:
        y = random.randint(1, 6)
        
        if y == 6: #indicates an error has occured
            tValue = time.ctime()
            error = random.randint(1, 3) #indicates an error number
            errorListener(error, tValue)
        else:
            print(y)

        x += 1
        
        time.sleep(5)



def errorListener(err, ct):
    conn = sqlite3.connect('error_log.db')

    c = conn.cursor()

    createTable = """CREATE TABLE IF NOT EXISTS error_messages (
        error_date VARCHAR(30) not null primary key,
        error_category INTEGER not null)"""

    c.execute(createTable)

    c.execute("""INSERT INTO error_messages(error_date, error_category)VALUES (?,?)""",
                 (ct, err))

    conn.commit()
    conn.close()
    
    file = open('error_log.txt', 'a')
    print("Error Message:", str(err), "Date/Time:", str(ct))
    file.write("Error Message: " + str(err) + " Date/Time: " + str(ct) + "\n")
    file.close()
    

  

if __name__ == "__main__":
    main()
    

input('\nPress enter to exit')
