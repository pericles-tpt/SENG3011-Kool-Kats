import time
import json # STEPHEN: I added this
import datetime

def handle_get_articles(date_start, date_end, country = None, disease = None):
    import pymysql
    db = pymysql.connect(host="database-1.cmae6p4l3uws.us-east-1.rds.amazonaws.com",user="admin",db="scrape_db" , password="koolkats", port=3306)
    cursor = db.cursor()

    # Creates the WHERE part of the query
    filters = []
    where_query = ''
    if country != None:
        filters.append('Country=\'' + country + '\'')
    elif disease != None:
        filters.append('Disease=\'' + disease + '\'')
    if len(filters) > 0:
        where_query = 'AND '
        for i in range(len(filters)):
            if i == 0:
                where_query += filters[i]
            else:
                where_query += ' AND ' + filters[i]

    try:
      query = "SELECT * FROM Articles WHERE Date >= '{}' AND Date <= '{}' {} ORDER BY Date;".format(date_start, date_end, where_query)
      print(query)
      cursor.execute(query)
    except:
      print("Oops we had an error")
      return

    response = []
    for (Country, Disease, Date, Cases, Url, MainText) in cursor:
        response.append({"headline": "test", "url": Url, "location": Country, "reports": ["a", "b", "c"], "termsFound": Disease, "main_text": MainText, "date_of_publication": str(Date)})

    
    return response


def send_to_sql(articles):
    import pymysql
   # import datetime

    # Open database connection
    db = pymysql.connect(host="database-1.cmae6p4l3uws.us-east-1.rds.amazonaws.com",user="admin",db="scrape_db" , password="koolkats", port=3306)

    
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    #print(str(articles))
    #query ="INSERT INTO Articles ({}, {}, {}, {});".format(str('IceLand'),str('Cold'),date,int(4)))
    #print(now)
    ## Get data
    ## Country

    ## Disease

    ## Date

    ## Cases

    ## Url
    query = "INSERT INTO Articles(Country, Disease, Date, Cases, Url, MainText) VALUES (%s, %s, %s, %s, %s, %s);"
    cursor.executemany(query, articles)
    ## MainText
    #query = 'INSERT INTO table_name(column,column_1,column_2,column_3)
    #VALUES(%s, %s, %s, %s)'                                                         
    #csv_data = csv.reader(file('file_name'))
    #my_data = []
    #for row in csv_data:
    #    my_data.append(tuple(row))
    #cursor.executemany(query, my_data)


    #query = "INSERT INTO Articles(Country, Disease, Date, Cases) VALUES (%s, %s, %s, %s);
    # execute SQL query using execute() method.
    #result = cursor.execute("SELECT * FROM Articles;")

    #db.commit()
    # Fetch a single row using fetchone() method.

    # disconnect from server
    db.close()