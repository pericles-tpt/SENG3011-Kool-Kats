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
    str1 = 'This is a test'
    str = {
  "articles": [
    {
      "headline": "Yellow fever -Senegal",
      "url": "https://www.who.int/csr/don/29-december-2020-yellow-fever-senegal/en/",
      "location": {
        "country": "Senegal",
        "location": "Kidira"
      },
      "reports": [
        {
          "diseases": [
            "Yellow fever"
          ],
          "syndromes": [],
          "event_date": "2020-10-18 xx:xx:xx",
          "locations": [
            {
              "country": "Senegal",
              "location": "Tambacounda"
            },
            {
              "country": "Senegal",
              "location": "Kedougou"
            },
            {
              "country": "Senegal",
              "location": "Saraya"
            },
            {
              "country": "Senegal",
              "location": "Thilogne"
            }
          ]
        }
      ],
      "termsFound": [
        "Yellow fever"
      ],
      "main_text": "From October to December 2020, a total of seven confirmed cases of yellow fever (YF) have been reported from four health districts in three regions in Senegal. The outbreak consists of a cluster of four confirmed cases from three health zones in Kidira health district, Tambacounda region; one case in the neighbouring Kedougou health district, Kedougou region; one case in Saraya health district, Kedougou region; and one case in Thilogne health district, Matam region. In Tambacounda region, on 18 October 2020, a sample was collected from a 40 year-old female living in Kidira district during an investigation for West Nile virus infection. On 29 October, Institut Pasteur de Dakar (IPD) confirmed the case as yellow fever. On 31 October, IPD reported results of a second confirmed case of YF to national health authorities, following a notification by Bakel health zone, Kidira health district. The case was an 8 year-old boy whose illness began in Kidira health district and died on 31 October. On 12 November, IPD notified national health authorities about a third confirmed case, a 23 year-old male, who was detected by routine surveillance and died on 5 November. On 16 November, a fourth confirmed case, a 15 year-old boy from Kidira health district, was reported to national health authorities. The two deaths among the four cases reported in Kidira health district occurred at two hospitals: one at the Matam regional hospital and the other at the Tambacounda regional hospital. In Kedougou and Matam regions, three confirmed cases were reported in December 2020, whose samples were collected during various investigations. In Kedougou region, laboratory tests conducted by IPD revealed that out of the 16 samples received from region, there were: one confirmed case [polymerase chain reaction (PCR) and IgM positive] living in Saraya district; one confirmed case [IgM positive and confirmed by plaque reduction neutralization test (PRNT)] living in Kedougou district; and two presumptive cases (IgM positive and PRNT in progress). In Matam region, one case was confirmed as YF by IgM and PRNT. The case is a 90-year-old male from Thilogne health district, who is hospitalized in a private clinic in Dakar. The Strategic Tool for Assessing Risks (STAR), which was used prior to notification of the third case in Kidira health district, classified YF as 'low', where small outbreaks can be observed but likely not a large outbreak. Public health response. The Ministry of Health is coordinating a rapid response. Recommended response activities include immunization of the local population, enhanced surveillance, risk communication, community engagement and vector control. Additional potential support for vaccines and operational costs may be requested by the country.WHO risk assessment. The detection of YF cases in the Tambacounda and Kedougou regions demonstrates the possibility of sylvatic spread of YF to unvaccinated people in a rural area and emphasizes the importance of maintaining high population immunity in all countries located in areas at high risk for YF. Recent epidemiological studies have reported that the villages are in a savanna area with non-human primates. Permanent or temporary pools of water are observed at the outskirts of residential areas. Although mass vaccination took place in Senegal in 2007, the eastern part of the country is considered to be at high risk of endemic YF transmission. Unvaccinated individuals remain vulnerable to infection with YF due to the persistence of the disease in primates (sylvatic cycle), especially in rural areas. The two affected regions are also difficult to reach, making vaccination efforts challenging. Intensive care units in the regions are far from the district (186 km) with poor road conditions. Affected districts are rural, largely consisted of forests, making it difficult to control the vector and mitigate the combined sylvatic-urban cycle. The COVID-19 pandemic poses a risk of disruption to routine immunization activities due to the burden on health systems and declining immunization uptake due to physical distancing or community reluctance. Disruption of immunization services, even for brief periods, will increase the number of susceptible individuals and increase the likelihood of outbreaks of vaccine-preventable diseases. As of 27 December 2020, there were 18 523 confirmed cases of COVID-19 and 387 deaths reported in Senegal. WHO advice. YF is an acute viral haemorrhagic disease transmitted by infected mosquitoes and has the potential to spread rapidly and have serious public health consequences. There is no specific treatment, although the disease can be prevented with a single dose of YF vaccine, which confers lifelong immunity. Supportive care to treat dehydration, respiratory failure and fever, and antibiotic treatment for associated bacterial infections are recommended. Senegal is considered a high priority country by the Eliminate Yellow Fever Epidemics (EYE) strategy. The introduction of YF vaccination into routine vaccination took place in January 2005. Vaccination is the primary means of preventing and controlling YF. In urban centres, targeted vector control measures are also useful to stop transmission. WHO and partners will continue to support local authorities in implementing these interventions to control the current epidemic. WHO recommends YF vaccination for all international travelers aged 9-months or older traveling to Senegal. Senegal also requires a YF vaccination certificate for travelers aged 9-months or older from countries at risk of YF transmission and travelers who have transited more than 12 hours at an airport of a country that is at risk of transmitting YF. YF vaccination is safe, highly effective and offers protection for life. In accordance with the International Health Regulaions (2005), third edition, the validity of the international YF vaccination certificate extends to the life of the person vaccinated. A booster dose of YF vaccine cannot be required from international travelers as a condition of entry. WHO has published guidelines for vaccination activities during the COVID-19 pandemic and is currently developing specific operational guidelines for conducting mass vaccination campaigns in the context of COVID-19. Where conditions permit, the EYE strategy will support the rapid resumption of YF prevention activities. WHO encourages Member States to take all necessary measures to keep travelers well informed of risks and preventive measures, including vaccination. Travelers should also be aware of the signs and symptoms of YF and should consult a physician promptly when showing signs. Returning viremic travelers may pose a risk to the establishment of local YF transmission cycles in areas where the competent vector is present. WHO does not recommend any restrictions on travel and trade to Senegal based on the information available on this outbreak.",
      "date_of_publication": "2020-12-29 10:10:10"
    }
  ],
  "team": {
    "name": "KoolKats",
    "accessTime": 133,
    "serviceTime": 150,
    "dataSource": "WHO"
  }
}
    return json.dumps(str1)
    #return json.dumps(pychromeless.src.db_functions.handle_get_articles('2019-01-01', '2021-01-01', 'France', None))

if __name__ == '__main__':
    api.run(host= '0.0.0.0')
    # Changed from app.run()
