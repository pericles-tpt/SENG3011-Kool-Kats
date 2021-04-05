
import axios from 'axios';

export async function getDisease(startDate, endDate, keyTerms, location = null) {
    
    var qParams=''
    qParams+='startDate='+startDate+'&';
    qParams+='endDate='+endDate+'&';
    qParams+='keyTerms='+keyTerms.toString();
    if (location != null) {
        qParams+='&location='+location
    }

    console.log('http://52.87.94.130:5000/disease?' + qParams)
    let response = await axios.get('http://52.87.94.130:5000/disease?' + qParams)

    return await response.data
    // do something with myJson
}

export async function getOccurrences(keyTerms, startDate = null, endDate = null) {

    var qParams=''
    var mydata ={}
    qParams+='keyTerms='+keyTerms.toString();
    if (startDate != null && endDate != null) {
        qParams+='&startDate='+startDate;
        qParams+='&endDate='+endDate;
    }

    let response = await axios.get('http://52.87.94.130:5000/occurrences?' + qParams)

    return response.data
    // do something with myJson
}

export async function getArticles(startDate, endDate, keyTerms, location) {

    var qParams=''
    var mydata ={}
    qParams+='startDate='+startDate+'&';
    qParams+='endDate='+endDate+'&';
    qParams+='keyTerms='+keyTerms.toString()+'&';
    qParams+='location='+location

    let response = await axios.get('http://52.87.94.130:5000/articles?' + qParams)

    return response.data
    // do something with myJson
}

export async function getPopularDiseases(startDate, endDate, location = null, numDiseases = null) {

    var qParams=''
    var mydata ={}
    qParams+='startDate='+startDate+'&';
    qParams+='endDate='+endDate;

    if (location != null){
        qParams+='&location='+location
    }
    if (numDiseases != null) {
        qParams+='&numDiseases='+numDiseases;
    }

    let response = await axios.get('http://52.87.94.130:5000/popularDiseases?' + qParams)

    return response.data
    // do something with myJson
}