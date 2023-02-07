# pip install supabase
# pip install python-dotenv

import os
import json
import datetime
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()


def init_supabase_client():
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    client: Client = create_client(url, key)
    return client


def insert_levelsfyi_data(client: Client):
    file = open('./salaryData.json')

    data = json.load(file)

    rows = []
    completed = 0
    datapoints = len(data)

    for item in data:
        row = {}

        dt = [int(i) for i in item['timestamp'].replace(
            '/', ' ').replace(':', ' ').split(' ')]
        row['timestamp'] = datetime.datetime(
            dt[2], dt[0], dt[1], *dt[3:]).isoformat()
        row['company'] = str(item['company'])
        row['level'] = str(item['level'])
        row['title'] = str(item['title'])
        row['yearly_compensation'] = int(item['totalyearlycompensation'])
        row['location'] = str(item['location'])
        row['years_of_experience'] = int(item['yearsofexperience'])
        row['years_at_company'] = int(item['yearsatcompany'])
        row['tag'] = str(item['tag'])
        row['base_salary'] = int(item['basesalary'])
        row['stock_grant_value'] = int(item['stockgrantvalue'])
        row['bonus'] = int(item['bonus'])
        row['gender'] = str(item['gender']).upper() if item['gender'].upper(
        ) == "MALE" or item['gender'].upper() == "FEMALE" else "UNSPECIFIED"
        row['notes'] = str(item['otherdetails'])

        rows.append(row)
        completed += 1

        print(f'{completed}/{datapoints}')

    file.close()

    batch_size = 5000
    for i in range(0, len(rows), batch_size):
        client.table('levels').insert(rows[i:i+batch_size]).execute()
        print(f'pushed rows {i}-{i+batch_size}')

    print(f'COMPLETE. Pushed {datapoints} to database.')


def main():
    client = init_supabase_client()
    insert_levelsfyi_data(client)


if __name__ == "__main__":
    main()
