import time
import json # STEPHEN: I added this

from webdriver_wrapper import WebDriverWrapper
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

def lambda_handler(*args, **kwargs):

   
    #countries = get_countries()
    #diseases = get_diseases()
    #articles = get_articles("Australia", 2000, None)
    #print('diseases ' + str(diseases))
    #print("Space")
    #print('countries ' + str(countries))
    #print('Articles ' + str(articles))
    get_specific_disease(['Hepatitis', 'Acute diarrhoeal syndrome', 'fish'])


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

def get_articles(country = None, date_from = None, date_to = None):

    # Get articles relevant to country and date

    # if not country or date is chosen then get all articles
    # Disease Outbreak News
    if date_to is None:
        date_to = 2020
    if date_from is None:
        date_from = 2020
    else:
        date_from = date_from
    driver = WebDriverWrapper()

    articles = {}
    
    from_time = date_from
    for from_time in range(date_from, date_to):
        year = "https://www.who.int/csr/don/archive/year/{}/en/".format(from_time)
        print(year)
        driver.get_url("https://www.who.int/csr/don/archive/year/{}/en/".format(from_time))
        print (from_time)
        element_list = driver.find_name('col_2-1_1')
        tags = element_list.find_elements_by_tag_name('span')
        ## Search Title for Country if specified
        for items in tags:
            if country is not None:
                # Pull data
                if country.lower() in items.text.lower():
                    articles[items.text] = items.text
                    # Open Link
                    # Get Data!
            else:
                articles[items.text] = "n/a"

        ## Get Link, Save the info in the dict
        from_time += 1

    driver.close()
    return articles


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
            for i in article_list:
                article_url = i.find_elements_by_tag_name('a')[0].get_attribute('href')
                # Go into article and count case numbers
                cases += get_articles_cases(article_url)
            ret['diseases'].append({"name": name, "cases": cases, "articles_found_in": totalArticles})

        exists = True

    print(json.dumps(ret))
    return json.dumps(ret)


def get_articles_cases(url):
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
                if words[j] == 'cases' and words[j-1].isdigit():
                    ccount += int(words[j-1])
                    break # <-- This mightn't be the best idea but I'm a bit impatient

    return ccount



def get_occurance_disease():
    print('jsdkjs')
