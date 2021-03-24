import pymysql
# import datetime

# Open database connection
db = pymysql.connect(host="database-1.cmae6p4l3uws.us-east-1.rds.amazonaws.com",user="admin",db="scrape_db" , password="koolkats", port=3306)
cursor = db.cursor()

# Get all articles to go through
query = "SELECT * FROM Articles;"
cursor.execute(query)
db.commit()

countries = ['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan',
'Bahamas','Latin America','the Americas','Regions of the Americas, Europe and Africa','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil',
'Brunei Darussalam','Côte d\'Ivoir','African Meningitis Belt','West Africa','Central Africa','Democratic Republic of the Horn of Africa','Bulgaria','Tanzania','Zaire','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cape Verde','Central African Republic','Chad','Chile',
'China','Colombia','Comoros','Congo','Cook Islands','Costa Rica','Côte d\'Ivoire','Croatia','Cuba','Cyprus','Czech Republic',
'Democratic People\'s Republic of Korea','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt',
'El Salvador','Equatorial Guinea','Eritrea','Estonia','Ethiopia','Federated States of Micronesia','Fiji','Finland','France','Gabon','Gambia','Georgia',
'Germany','Tadjikistan','Guadeloupe','Hong Kong','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia',
'Iran (Islamic Republic of)','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan',
'Lao People\'s Democratic Republic','Latvia','Lebanon','Lesotho','Liberia','Libyan Arab Jamahiriya','Lithuania','Luxembourg','Madagascar','Malawi',
'Malaysia','Maldives','Mali','Gaza','Great Lakes Region','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Monaco','Mongolia','Morocco','Mozambique','Myanmar','Namibia',
'Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','Niue','Norway','occupied Palestinian territory','Oman','Pakistan','Palau',
'Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Republic of Korea','Republic of Moldova','Romania','Russian Federation',
'Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal',
'Serbia and Montenegro','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Sudan','Spain','Sri Lanka',
'Sudan','Suriname','Swaziland','Sweden','Switzerland','Syrian Arab Republic','Tajikistan','Thailand','The former Yugoslav Republic of Macedonia','Timor-Leste','Togo',
'Tonga','Trinidad And Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom', 'Kosovo', 'South America',
'United Republic of Tanzania','United States of America','Uruguay','Uzbekistan','Vanuatu','Venezuela','Viet Nam','Yemen','Zambia','Zimbabwe']

countries_l = []

for i in countries:
    countries_l.append(i.lower())

tup = []

for j in cursor:
    for k in range(len(countries_l)):
        if 'the United States' in j[0]:
            tup.append(('United States of America', j[4]))
        if  'Côte dÎvoire' in j[0] or 'Côte d\'Ivoir' in j[0] or 'Cõte d\'Ivoire' in j[0]:
            tup.append(('Côte d\'Ivoire', j[4]))
        if 'United Kingdom of Great Britain and Northern Ireland' in j[0] or ' United Kingdom' in j[0] or 'UK' in j[0]:
            tup.append(('United Kingdom', j[4]))
        if 'in Africa' in j[0]:
            tup.append((' African Region', j[4]))
        if 'in Asia' in j[0]:
            tup.append(('Asia', j[4]))
        if 'European Commision' in j[0] or 'in Europe' in j[0]:
            tup.append((' European Region', j[4]))
        if countries_l[k] in j[0].lower():
            tup.append((countries[k], j[4]))
            # UPDATE THIS SQL ENTRY!

cursor.executemany("UPDATE Articles SET Country = %s WHERE Url = %s ", tup)
db.commit()
db.close()
