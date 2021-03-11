import time

from webdriver_wrapper import WebDriverWrapper
from selenium.webdriver.common.keys import Keys


def lambda_handler(*args, **kwargs):
    
    driver = WebDriverWrapper()
    #driver.get("https://www.python.org")

    ### Fill in with scrape code

    text = "Here it is me"
    driver.close()

    return text
