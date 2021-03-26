import time
import json # STEPHEN: I added this
import datetime
import pymysql
db = pymysql.connect(host="database-restore.cmae6p4l3uws.us-east-1.rds.amazonaws.com",user="admin",db="scrape_db" , password="koolkats", port=3306)

def handle_get_articles(date_start, date_end, country = None, keyTerms = None):
    global db
    cursor = db.cursor()

    # Creates the WHERE part of the query
    filters = []
    where_query = ''
    if country != None:
        filters.append('Country LIKE CONCAT(\'%\',\'' + country + '\',\'%\')')
    if keyTerms != None:
        keyTerms = keyTerms.split(',')
        disList = '('
        for i in keyTerms:
            t = i.strip()
            disList += ' DISEASE LIKE CONCAT(\'%\',\'' + t + '\',\'%\') OR'
        filters.append(disList.rstrip('OR') + ')')
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

    response = {"articles":[]}
    for (Country, Disease, Date, Cases, Url, MainText, Headline) in cursor:
        if (Headline == None):
            h = ""
        else:
            h = Headline
        response["articles"].append({"headline": h, "url": Url, "location": Country, "termFound": Disease, "main_text": MainText, "date_of_publication": str(Date)})

    
    return response

def handle_get_diseases(date_start, date_end, country = None, keyTerms = None):
    global db
    cursor = db.cursor()

    # Creates the WHERE part of the query
    filters = []
    where_query = ''
    if country != None:
        filters.append('Country LIKE CONCAT(\'%\',\'' + country + '\',\'%\')')
    if keyTerms != None:
        keyTerms = keyTerms.split(',')
        disList = '('
        for i in keyTerms:
            t = i.strip()
            disList += ' DISEASE LIKE CONCAT(\'%\',\'' + t + '\',\'%\') OR'
        filters.append(disList.rstrip('OR') + ')')
    if len(filters) > 0:
        where_query = 'AND '
        for i in range(len(filters)):
            if i == 0:
                where_query += filters[i]
            else:
                where_query += ' AND ' + filters[i]

    try:
      query = "SELECT DISEASE, SUM(CASES) AS CASES, COUNT(CASES) AS AF FROM Articles WHERE Date >= '{}' AND Date <= '{}' {} GROUP BY DISEASE ORDER BY CASES DESC;".format(date_start, date_end, where_query)
      print(query)
      cursor.execute(query)
    except:
      print("Oops we had an error")
      return

    tmpList = []
    for (Disease, Cases, af) in cursor:
        tmpList.append({"name": Disease, "cases": int(Cases), "occurrences": int(af)})

    query = "SELECT COUNT(*) AS TA FROM Articles;"
    cursor.execute(query)

    for i in cursor:
        ta = i[0]

    response = {"diseases":tmpList, "totalArticlesInDB": ta}
    
    return response

def handle_get_occurrences(keyTerms, startDate = None, endDate = None):
    global db
    cursor = db.cursor()

    keyTerms = keyTerms.split(',')
    disList = '('
    for i in keyTerms:
        t = i.strip()
        disList += ' DISEASE LIKE CONCAT(\'%\',\'' + t + '\',\'%\') OR'
    da = disList.rstrip('OR')
    da += ')'


    where_query = 'WHERE ' + da
    if (startDate != None and endDate != None):
        where_query += " AND Date >= '{}' AND Date <= '{}'".format(startDate, endDate) 

    try:
      query = "SELECT Country, Disease, COUNT(DISTINCT Url) AS Count FROM Articles " + where_query + " GROUP BY Country, Disease ORDER BY Count DESC;".format(where_query)
      print(query)
      cursor.execute(query)
    except:
      print("Oops we had an error")
      return

    response = {"locations":[]}
    for (Country, Disease, Count) in cursor:
        response["locations"].append({"name": Country, "disease": Disease, "occurrences": Count})
    
    return response

def handle_get_popular_diseases(startDate, endDate, country = None, numDiseases = 10):
    global db
    cursor = db.cursor()

    # Creates the WHERE part of the query
    where_query = "WHERE Date >= '{}' and Date <= '{}'".format(startDate, endDate)
    if country != None:
        where_query += ' AND Country LIKE CONCAT(\'%\',\'' + country + '\',\'%\')'
 
    try:
      query = "SELECT DISEASE, COUNT(DISTINCT URL) AS COUNT FROM Articles {} GROUP BY DISEASE ORDER BY COUNT DESC LIMIT {}".format(where_query, str(numDiseases+1))
      print(query)
      cursor.execute(query)
    except:
      print("Oops we had an error")
      return

    response = {"rankings": []}
    for (Disease, Cases) in cursor:
        if (Disease != ""):
            response["rankings"].append({"name": Disease, "occurrences": Cases})
    
    return response


def send_to_sql(articles):
    global db
   # import datetime

    # Open database connection

    
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
