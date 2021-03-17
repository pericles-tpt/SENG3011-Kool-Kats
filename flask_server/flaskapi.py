from flask import Flask, json
import sys
import pychromeless.src.db_functions

api = Flask(__name__)

test = {"a":True, "b":"hi","c":1,"d":[1,2,3,4,5]}

@api.route('/articles', methods=['GET'])
def get_articles():
    return json.dumps(pychromeless.src.db_functions.handle_get_articles('2019-01-01', '2019-12-31', None, 'measles'))

if __name__ == '__main__':
    app.run(host= '0.0.0.0')
    # Changed from app.run()
