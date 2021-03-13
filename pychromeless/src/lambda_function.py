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
    #articles = get_articles(None, None, None)
    #print('diseases ' + str(diseases))
    #print("Space")
    #print('countries ' + str(countries))
    #print('Articles ' + str(articles))
    get_specific_disease(['Acute diarrhoeal syndrome', 'hepatitis'])


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
                            article_list = {}
                            # add the name of the dict as the name of the country
                            article_list['name'] = country_to_look[0].text
                            article_list['Articles'] = []
                            article_driver.get_url("https://www.who.int/csr/don/archive/year/{}/en/".format(from_time))
                            time.sleep(1)
                            article_driver.click_link(a_tag[0].text)
                            article_driver.get_url("{}".format(a_tag[0].get_attribute('href')))
                            time.sleep(1)
                            wrapper =  article_driver.find_name_byId('primary')
                            info = wrapper.find_elements_by_tag_name('span')
                            # Add article name and Information
                            for information in info:
                                article_list['Articles'].append(information.text)
                                print(information.text)
                            articles[country].append(article_list)
                else:
                    articles[country_to_look[0].text] = []
                    ## Get the articles within a time frame
                    if a_tag is not None:
                            article_list = {}
                            # add the name of the dict as the name of the country
                            article_list['name'] = country_to_look[0].text
                            article_list['Articles'] = []
                            article_driver.get_url("https://www.who.int/csr/don/archive/year/{}/en/".format(from_time))
                            time.sleep(1)
                            article_driver.click_link(a_tag[0].text)
                            article_driver.get_url("{}".format(a_tag[0].get_attribute('href')))
                            time.sleep(1)
                            wrapper =  article_driver.find_name_byId('primary')
                            info = wrapper.find_elements_by_tag_name('span')
                            # Add article name and Information
                            for information in info:
                                article_list['Articles'].append(information.text)
                                print(information.text)
                            articles[country_to_look[0].text].append(article_list)
            else:
                articles[items.text] = "n/a"

        ## Get Link, Save the info in the dict
        from_time += 1

    driver.close()
    article_driver.close()

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
