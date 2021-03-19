#!/usr/bin/env python
from distutils.core import setup

# Run this command after editing this file: 'pip install --editable .'
setup(name='KoolKatsAPI',
      version='1.0',
      description='The koolest WHO API in town',
      author='Peri Telemachou, Stephen Comino, Weiting Han, Lachlan Stewart, Joanne Chen',
      author_email='z5214738@ad.unsw.edu.au',
      url='Coming soon...',
      package_dir={"./flask_server/": "./pychromeless/src/"},
      packages=setuptools.find_packages(where="./"),
      install_requires=[
        'selenium',
        'chromedriver-binary',
        'pymysql'
      ]
     )