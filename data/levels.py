import json
import requests
import pandas as pd

# download as json file
# solditems = requests.get('https://www.levels.fyi/js/salaryData.json')
# data = solditems.json()
# with open('companies.json', 'w') as f:
#     json.dump(data, f)

# convert json file to csv file
with open('companies.json', encoding='utf-8') as file:
    df = pd.read_json(file)

df.to_csv('companies.csv', encoding='utf-8', index=False)