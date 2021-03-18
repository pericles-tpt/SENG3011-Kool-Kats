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

    return json.dumps(pychromeless.src.db_functions.handle_get_articles('2019-01-01', '2021-01-01', 'France', None))

@api.route('/disease', methods=['GET'])
@cross_origin()
def get_diseases():
    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')
    keyTerms = request.args.get('keyTerms')
    location = request.args.get('location')

    return json.dumps(pychromeless.src.db_functions.handle_get_diseases(startDate, endDate, location, keyTerms))

@api.route('/occurrences', methods=['GET'])
@cross_origin()
def get_occurences():
    keyTerms = request.args.get('keyTerms')
    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')

    return json.dumps(pychromeless.src.db_functions.handle_get_occurrences(startDate, endDate, keyTerms))

@api.route('/popularDiseases', methods=['GET'])
@cross_origin()
def get_popular_diseases():
    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')
    numDiseases = request.args.get('numDiseases')
    location = request.args.get('location')
    #return (startDate + " " + endDate + " " + keyTerms + " " + location) 
    #return (startDate + " " + endDate + " " + numDiseases + " " + location)
    return json.dumps(pychromeless.src.db_functions.handle_get_popular_diseases(startDate, endDate, location, numDiseases))


if __name__ == '__main__':
    api.run(host= '0.0.0.0')
    # Changed from app.run()
