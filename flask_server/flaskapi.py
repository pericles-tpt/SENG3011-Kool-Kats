from flask import Flask, json
import sys
import pychromeless.src.db_functions

api = Flask(__name__)

@api.route('/articles', methods=['GET'])
def get_articles():
    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')
    keyTerms = request.args.get('keyTerms')
    location = request.args.get('location')
    return (startDate + " " + endDate + " " + keyTerms + " " + location) 
    #return json.dumps(pychromeless.src.db_functions.handle_get_articles('2019-01-01', '2021-01-01', 'France', None))

if __name__ == '__main__':
    api.run(host= '0.0.0.0')
    # Changed from app.run()
