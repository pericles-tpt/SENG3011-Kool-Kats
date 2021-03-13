import time
import json # STEPHEN: I added this
import datetime

from webdriver_wrapper import WebDriverWrapper
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


def lambda_handler(*args, **kwargs):

   
    #countries = get_countries()
    #diseases = get_diseases()
    #1996
    articles = get_articles(None, 2019, None)
    #print('diseases ' + str(diseases))
    #print("Space")
    #print('countries ' + str(countries))
    print('Articles ' + str(articles))
    #get_specific_disease(['Hepatitis', 'Acute diarrhoeal syndrome', 'fish'])
   # send_to_sql()

    return None

def get_diseases():
    driver = WebDriverWrapper()

    driver.get_url("https://www.who.int/csr/don/archive/disease/en/")

    element_list = driver.find_name('col_2-1_1')

    tags = element_list.find_elements_by_tag_name('a')

    diseases = []

    for items in tags:
        if len(items.text) > 1:
            diseases.append(items.text)
    
    diseases.append('Legionnaires')
    driver.close()

    return diseases

def get_countries():
    driver = WebDriverWrapper()

    driver.get_url("https://www.who.int/csr/don/archive/country/en/")

    element_list = driver.find_name('col_2-1_1')

    tags = element_list.find_elements_by_tag_name('a')

    countries = []

    for items in tags:
        if len(items.text) > 1 and items.text != "Back to Top":
            countries.append(items.text)
    
    driver.close()
    
    return countries

"""
    Country: If no country Specified then just return diseases from within a date frame
    - If a country is specified then return articles for that country within that frame

    Time frame:
    Default 2020 - 2020
"""
def get_articles(country = None, date_from = None, date_to = None):

    # Get articles relevant to country and date

    # if not country or date is chosen then get all articles
    # Disease Outbreak News
    diseases = get_diseases()
    if date_to is None:
        date_to = 2020
    if date_from is None:
        date_from = 2019
    else:
        date_from = date_from

    driver = WebDriverWrapper()
    articles = {}
    articles[country] = []
    article_driver = WebDriverWrapper()
    articles_for_sql = []

    from_time = date_from
    for from_time in range(date_from, date_to):
        driver.get_url("https://www.who.int/csr/don/archive/year/{}/en/".format(from_time))
        print(from_time)
        element_list = driver.find_name('col_2-1_1')
        tags = element_list.find_elements_by_tag_name('li')
        ## Search Title for Country if specified
        for items in tags:
            a_tag = items.find_elements_by_tag_name('a')
            country_to_look = items.find_elements_by_tag_name('span')
            if len(country_to_look) > 0:
                # Check it is the country you are looking for
                if country is not None:
                    if country.lower() in country_to_look[0].text.lower():
                        # Look for a link
                        if a_tag is not None:

                            ## Get name
                            d_name = ""
                            for disease_name in diseases:
                                if disease_name.lower() in country_to_look[0].text.lower():
                                    d_name = disease_name.lower()

                            article_list = {}
                            # add the name of the dict as the name of the country
                            article_list['name'] = d_name
                            article_list['Articles'] = []
                            article_driver.get_url("https://www.who.int/csr/don/archive/year/{}/en/".format(from_time))
                            time.sleep(1)
                            article_driver.click_link(a_tag[0].text)
                            article_list['date'] = a_tag[0].text
                            print('date ' + str(a_tag[0].text))
                            article_driver.get_url("{}".format(a_tag[0].get_attribute('href')))
                            article_list['url'] = a_tag[0].get_attribute('href')
                            time.sleep(1)
                            wrapper =  article_driver.find_name_byId('primary')
                            info = wrapper.find_elements_by_tag_name('span')
                            # Add article name and Information
                            for information in info:
                                article_list['Articles'].append(information.text)
                                #print(information.text)
                            articles[country].append(article_list)
                else:
                    country_name = country_to_look[0].text.split(" - ")
                    if len(country_name) > 1:
                        articles[country_name[1]] = []
                    else:
                        articles[country_name[0]] = []
                    ## Get the articles within a time frame
                    if a_tag is not None:
                        ## Get name
                            d_name = ""
                            for disease_name in diseases:
                                if disease_name.lower() in country_to_look[0].text.lower():
                                    d_name = disease_name.lower()
                            article_list = {}
                            # add the name of the dict as the name of the country
                            article_list['name'] = d_name
                            article_list['Articles'] = []
                            article_driver.get_url("https://www.who.int/csr/don/archive/year/{}/en/".format(from_time))
                            time.sleep(1)
                            article_driver.click_link(a_tag[0].text)
                            article_list['date'] = a_tag[0].text
                            article_driver.get_url("{}".format(a_tag[0].get_attribute('href')))
                            article_list['url'] = a_tag[0].get_attribute('href')
                            time.sleep(1)
                            wrapper =  article_driver.find_name_byId('primary')
                            info = wrapper.find_elements_by_tag_name('span')
                            # Add article name and Information
                            for information in info:
                                article_list['Articles'].append(information.text)
                               # print(information.text)
                            # Get name of Country
                            country_name = country_to_look[0].text.split(" - ")
                            if len(country_name) > 1:
                                articles[country_name[1]].append(article_list)
                            else:
                                articles[country_name[0]].append(article_list)
    # Here
    for k,v in articles.items():
        list_of_items = articles[k]
        ## Get each result
        # print(k)
        for occurence in list_of_items:
            #print(str(occurence))
            date = occurence['date']
            date = date.split(" ")
            day = date[0]
            month = month_string_to_number(date[1])
            year = date[2]
            cases = 1
            url = occurence['url']
            maintxt = occurence['Articles']
            now = datetime.datetime(int(year), int(month), int(day), 0, 0, 0)
            now.strftime('%Y-%m-%d %H:%M:%S')
            maintxt = "\n".join(maintxt)
            #flattened = [val for sublist in maintxt for val in sublist]

            articles_for_sql.append((str(k), str(occurence['name']), now, str(cases), str(url), str('Standard Text (MainText)')))

        ## Get Link, Save the info in the dict
        from_time += 1

    send_to_sql(articles_for_sql)

    driver.close()
    article_driver.close()

    return articles
    
def month_string_to_number(string):
    m = {
        'jan': 1,
        'feb': 2,
        'mar': 3,
        'apr':4,
         'may':5,
         'jun':6,
         'jul':7,
         'aug':8,
         'sep':9,
         'oct':10,
         'nov':11,
         'dec':12
        }
    s = string.strip()[:3].lower()

    try:
        out = m[s]
        return out
    except:
        raise ValueError('Not a month')

def get_specific_disease(diseases):
    # Returns  {disease: [{name, cases, article}], totalArticles: int, team:{name:'KoolKats', accessedTime:'', serviceTime:''}
    # Go to the articles
    driver = WebDriverWrapper()
    ret = {}
    ret['diseases'] = []
    exists = True
    for i in diseases:
        diseasef = i.lower().replace(' ', '_')
        driver.get_url("https://www.who.int/csr/don/archive/disease/{}/en/".format(diseasef))

        try:
            article_list = driver.find_name('col_2-1_1').find_elements_by_tag_name('li')
        except:
            exists = False
        
        if exists:
            article_list = driver.find_name('col_2-1_1').find_elements_by_tag_name('li')
            totalArticles = len(article_list)

            cases = 0
            name = diseasef
            for j in article_list:
                article_url = j.find_elements_by_tag_name('a')[0].get_attribute('href')
                # Go into article and count case numbers
                print(article_url)
                cases += get_articles_cases(article_url, i.lower().replace('_', ' '))
            ret['diseases'].append({"name": name, "cases": cases, "articles_found_in": totalArticles})

        exists = True

    print(json.dumps(ret))
    return json.dumps(ret)

# Very basic and slow atm: Looks for word 'cases' and checks if word before it is a number, if so adds it to ccount
# Maybe we could put a limit on the number of articles the user can request for this function?
# e.g. 'cholera' has 280 articles and took upwards of 15 minutes to complete this.
def get_articles_cases(url, disease_name_spaces):
    driver = WebDriverWrapper()
    ccount = 0
    driver.get_url(url)
    paragraph_list = driver.find_by_id("primary").find_elements_by_tag_name("p")

    for i in paragraph_list:
        if (len(i.find_elements_by_tag_name("span")) > 0):
            p_text = i.find_elements_by_tag_name("span")[0].get_attribute('innerHTML')
            words = p_text.split()
            n = 'a'
            for j in range(len(words)):
                stat = words[j-1].replace(',','')
                if 'cases' in words[j] and stat.isdigit():
                    ccount += int(stat)
                    # break # <-- This mightn't be the best idea but I'm a bit impatient
                elif 'cases' in words[j]:
                    found = True
                    for k in range(0, len(disease_name_spaces)):
                        if (words[j-k] != disease_name_spaces[len(disease_name_spaces)-1-k]):
                            found = False
                            #break
                    if j-len(disease_name_spaces)-1 >= 0:
                        print('Index of number should be ' + words[j-len(disease_name_spaces)-1])
                        found_stat = words[j-len(disease_name_spaces)-1].replace(',','')
                        if (found == True) and found_stat.isdigit():
                            ccount += int(found_stat)

    print(ccount)
    return ccount

def get_occurance_disease():
    print('jsdkjs')

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

    db.commit()
    # Fetch a single row using fetchone() method.

    # disconnect from server
    db.close()