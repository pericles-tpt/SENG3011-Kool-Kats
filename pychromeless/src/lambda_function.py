import time

from webdriver_wrapper import WebDriverWrapper
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

def lambda_handler(*args, **kwargs):

   
    countries = get_countries()
    diseases = get_diseases()
    articles = get_articles("Moldova", 2000, None)
    print('diseases ' + str(diseases))
    print("Space")
    print('countries ' + str(countries))
    print('Articles ' + str(articles))


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
        date_from = str(2020)
    else:
        date_from = date_from
    driver = WebDriverWrapper()

    articles = {}
    from_time = int(date_from)
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
                if country.lower() in items.text:
                    articles[items.text] = items.text
            else:
                articles[items.text] = "n/a"

        ## Get Link, Save the info in the dict
        from_time += 1

    driver.close()
    return articles
    ## Diseases
    # Sars! and then Articles

