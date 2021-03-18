from flask import Flask, json, request
import sys
import pychromeless.src.db_functions
from flask_cors import CORS, cross_origin

api = Flask(__name__)
cors = CORS(api)
api.config['CORS_HEADERS'] = 'Content-Type application/json'

@api.route('/articles', methods=['GET'])
@cross_origin()
def get_articles():
    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')
    keyTerms = request.args.get('keyTerms')
    location = request.args.get('location')
    #return (startDate + " " + endDate + " " + keyTerms + " " + location) 
    return (startDate + " " + endDate + " " + keyTerms + " " + location)
    #return json.dumps(pychromeless.src.db_functions.handle_get_articles('2019-01-01', '2021-01-01', 'France', None))

if __name__ == '__main__':
    api.run(host= '0.0.0.0')
    # Changed from app.run()
