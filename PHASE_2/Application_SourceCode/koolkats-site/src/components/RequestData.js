import axios from "axios";

// Koolkats Functions
export async function getDisease(
  startDate,
  endDate,
  keyTerms,
  location = null
) {
  if (startDate === "") {
    startDate = "1997-01-01T00:00:00";
  }

  if (endDate === "") {
    endDate = "2022-01-01T00:00:00";
  }

  if (keyTerms === "") {
    keyTerms = "measles";
  }

  var qParams = "";
  qParams += "startDate=" + startDate + "&";
  qParams += "endDate=" + endDate + "&";
  qParams += "keyTerms=" + keyTerms.join("%2C");
  if (location !== null) {
    qParams += "&location=" + location;
  }

  let response = await axios.get("http://52.87.94.130:5000/disease?" + qParams);
  if (response.data.diseases) {
    return response.data.diseases;
  }
  var sample = [];
  for (var keyTerm in keyTerms) {
    sample.append({ name: keyTerm, cases: 0, occurrences: 0 });
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
  if (startDate !== null && endDate !== null) {
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

  // Putting some default values in here in case empty strings are passed in
  if (startDate === "") {
    startDate = "1997-01-01T00:00:00";
  }

  if (endDate === "") {
    endDate = "2022-01-01T00:00:00";
  }

  if (keyTerms === "") {
    keyTerms = "measles";
  }

  if (location === "") {
    location = "Australia";
  }

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

  if (location !== null) {
    qParams += "&location=" + location;
  }
  if (numDiseases !== null) {
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
  let response = {};
  try {
    response = await axios.get(
      "http://52.15.58.197:8000/v1/vaccination_percentage?country=" + location,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch {
    return "n/a";
  }

  return response.data;
  // do something with myJson
}

// Brick Walls API - Australian State Restrictions
export async function getStateRestrictionAus() {
  let response = await axios.get(
    "https://diseasereportapi.azurewebsites.net/restrictions" /*, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }*/
  );

  return response.data;
  // do something with myJson
}

// https://corona.lmao.ninja/ API
export async function getCOVIDCases(location, lastndays = "all") {
  let response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/" +
      location +
      "?lastdays=" +
      lastndays /*, {
          headers: {
              'Access-Control-Allow-Origin': '*'
          }
      }*/
  );

  return response.data;
  // do something with myJson
}

export async function getCOVIDCasesCountries(
  commaSeparatedLocationsString,
  lastndays = "all"
) {
  let response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/" +
      commaSeparatedLocationsString +
      "?lastdays=" +
      lastndays /*, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }*/
  );

  return response.data;
  // do something with myJson
}

// Utility Functions - For handling return json from above requests
export function crdInRange(
  json,
  country,
  startDate,
  endDate,
  casesRecoveredDeaths = 0
) {
  let entry = {};
  for (var i = 0; i < json.length; i++) {
    if (json[i].country == country) {
      entry = json[i];
      break;
    }
  }
  let cases = {};
  if (country.toLowerCase() === "all" || country.toLowerCase() === "world") {
    if (casesRecoveredDeaths === 0) {
      cases = json.cases;
    } else if (casesRecoveredDeaths === 1) {
      cases = json.recovered;
    } else if (casesRecoveredDeaths === 2) {
      cases = json.deaths;
    } else {
      return;
    }
  } else {
    if (casesRecoveredDeaths === 0) {
      cases = json[i].timeline.cases;
    } else if (casesRecoveredDeaths === 1) {
      cases = json[i].timeline.recovered;
    } else if (casesRecoveredDeaths === 2) {
      cases = json[i].timeline.deaths;
    } else {
      return;
    }
  }

  var startDateSplit = startDate.split("-");
  var endDateSplit = endDate.split("-");
  var sd =
    startDateSplit[1] +
    "/" +
    startDateSplit[2] +
    "/" +
    startDateSplit[0][2] +
    startDateSplit[0][3];
  var ed =
    endDateSplit[1] +
    "/" +
    endDateSplit[2] +
    "/" +
    endDateSplit[0][2] +
    endDateSplit[0][3];
  if (sd[0] === "0") {
    sd = sd.substring(1);
  }

  if (ed[0] === "0") {
    ed = ed.substring(1);
  }

  var s = 0;
  var e = 0;

  var sdInCases = false;
  try {
    for (const [date, cs] of Object.entries(cases)) {
      if (date === sd) {
        s = cs;
        sdInCases = true;
      }
    }
  } catch {
    console.log("error");
  }

  var edInCases = false;
  try {
    for (const [date, cs] of Object.entries(cases)) {
      if (date === ed) {
        e = cs;
        edInCases = true;
      }
    }
  } catch {
    console.log("error");
  }

  if (sdInCases === false) {
    s = Object.values(cases)[0];
  }

  if (sdInCases === false) {
    e = Object.values(cases)[Object.values(cases).length - 1];
  }

  return e - s;
}

export async function getWorldCOVIDVaccination() {
  let response = await axios.get(
    "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all"
  );
  return response.data;
  // do something with myJson
}
