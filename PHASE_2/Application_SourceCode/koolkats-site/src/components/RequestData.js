import axios from "axios";

// Koolkats Functions
export async function getDisease(
  startDate,
  endDate,
  keyTerms,
  location = null
) {
  var qParams = "";
  qParams += "startDate=" + startDate + "&";
  qParams += "endDate=" + endDate + "&";
  qParams += "keyTerms=" + keyTerms.join('%2C');
  if (location != null) {
    qParams += "&location=" + location;
  }

  console.log("http://52.87.94.130:5000/disease?" + qParams);
  let response = await axios.get("http://52.87.94.130:5000/disease?" + qParams);
  if (response.data.diseases) {
      return response.data.diseases
  }
  var sample = []
  for (var keyTerm in keyTerms) {
    sample.append({name: keyTerm, cases: 0, occurrences: 0})
  }
  return sample;
  // do something with myJson
}

export async function getOccurrences(
  keyTerms,
  startDate = null,
  endDate = null
) {
  var qParams = "";
  var mydata = {};
  qParams += "keyTerms=" + keyTerms.toString();
  if (startDate != null && endDate != null) {
    qParams += "&startDate=" + startDate;
    qParams += "&endDate=" + endDate;
  }
  console.log(qParams);
  let response = await axios.get(
    "http://52.87.94.130:5000/occurrences?" + qParams
  );

  return response.data;
  // do something with myJson
}

export async function getArticles(startDate, endDate, keyTerms, location) {
  var qParams = "";
  var mydata = {};
  qParams += "startDate=" + startDate + "&";
  qParams += "endDate=" + endDate + "&";
  qParams += "keyTerms=" + keyTerms.toString() + "&";
  qParams += "location=" + location;

  let response = await axios.get(
    "http://52.87.94.130:5000/articles?" + qParams
  );

  return response.data;
  // do something with myJson
}

export async function getPopularDiseases(
  startDate,
  endDate,
  location = null,
  numDiseases = null
) {
  var qParams = "";
  var mydata = {};
  qParams += "startDate=" + startDate + "&";
  qParams += "endDate=" + endDate;

  if (location != null) {
    qParams += "&location=" + location;
  }
  if (numDiseases != null) {
    qParams += "&numDiseases=" + numDiseases;
  }

  let response = await axios.get(
    "http://52.87.94.130:5000/popularDiseases?" + qParams
  );

  return response.data;
  // do something with myJson
}

// SourDough API - Vaccination Percentage
export async function getVaccinationPercentage(location) {
  let response = await axios.get(
    "http://52.15.58.197:8000/v1/vaccination_percentage?country=" + location, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
  );

  return response.data;
  // do something with myJson
}

// Brick Walls API - Australian State Restrictions
export async function getStateRestrictionAus() {
  let response = await axios.get(
    "https://diseasereportapi.azurewebsites.net/restrictions"/*, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }*/
  );

  return response.data;
  // do something with myJson
}
