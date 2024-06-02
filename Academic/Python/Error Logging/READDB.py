# Noah Hamblen


import sqlite3


def main():
    conn = sqlite3.connect('error_log.db')
    c = conn.cursor()

    print(c.execute('Select * from error_messages').fetchall())
    
    conn.close()


if __name__ == '__main__':
    main()


input('\nPress enter to exit')

