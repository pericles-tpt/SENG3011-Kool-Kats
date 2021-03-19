from flask import Flask, json, request
import sys
import datetime
import pychromeless.src.db_functions
from flask_cors import CORS, cross_origin

api = Flask(__name__)
cors = CORS(api)
api.config['CORS_HEADERS'] = 'Content-Type application/json'

@api.route('/articles', methods=['GET'])
@cross_origin()
def get_articles():
    timeIn = datetime.datetime.now()

    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')
    keyTerms = request.args.get('keyTerms')
    location = request.args.get('location')

    startDate = startDate.replace("T", " ")
    endDate = endDate.replace("T", " ")

    j = pychromeless.src.db_functions.handle_get_articles(startDate, endDate, location, keyTerms)
    timeOut = datetime.datetime.now()

    j["debugInfo"] = {"name": "KoolKats", "accessTime": str(timeIn), "serviceTime": str(timeOut - timeIn), "dataSource": "WHO"}

    return json.dumps(j)

@api.route('/disease', methods=['GET'])
@cross_origin()
def get_diseases():
    timeIn = datetime.datetime.now()

    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')
    keyTerms = request.args.get('keyTerms')
    location = request.args.get('location')

    startDate = startDate.replace("T", " ")
    endDate = endDate.replace("T", " ")

    j = pychromeless.src.db_functions.handle_get_diseases(startDate, endDate, location, keyTerms)

    timeOut = datetime.datetime.now()

    j["debugInfo"] = {"name": "KoolKats", "accessTime": str(timeIn), "serviceTime": str(timeOut - timeIn), "dataSource": "WHO"}

    return json.dumps(j)

@api.route('/occurrences', methods=['GET'])
@cross_origin()
def get_occurences():
    timeIn = datetime.datetime.now()

    keyTerms = request.args.get('keyTerms')
    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')

    startDate = startDate.replace("T", " ")
    endDate = endDate.replace("T", " ")

    j = pychromeless.src.db_functions.handle_get_occurrences(keyTerms, startDate, endDate)

    timeOut = datetime.datetime.now()

    j["debugInfo"] = {"name": "KoolKats", "accessTime": str(timeIn), "serviceTime": str(timeOut - timeIn), "dataSource": "WHO"}
    return json.dumps(j)

@api.route('/popularDiseases', methods=['GET'])
@cross_origin()
def get_popular_diseases():
    timeIn = datetime.datetime.now()

    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')
    numDiseases = request.args.get('numDiseases')
    location = request.args.get('location')

    startDate = startDate.replace("T", " ")
    endDate = endDate.replace("T", " ")

    j = {"test": "1"}
    if numDiseases == None:
        j = pychromeless.src.db_functions.handle_get_popular_diseases(startDate, endDate, location)
    else:
        j = pychromeless.src.db_functions.handle_get_popular_diseases(startDate, endDate, location, numDiseases)
    timeOut = datetime.datetime.now()

    j["debugInfo"] = {"name": "KoolKats", "accessTime": str(timeIn), "serviceTime": str(timeOut - timeIn), "dataSource": "WHO"}

    return json.dumps(j)


if __name__ == '__main__':
    api.run(host= '0.0.0.0')
    # Changed from app.run()
