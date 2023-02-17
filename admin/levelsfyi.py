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


def insert_data(client: Client):
    file = open('./salaryData.json')

    data = json.load(file)
    companies = []

    num_companies = client.table('companies').select(
        "*", count="exact").execute().count

    for i in range(0, num_companies, 1000):
        c = client.table('companies').select(
            "id, company_name").range(i, i+1000).execute()
        companies = companies + c.data

    companies_dict = {}
    for c in companies:
        companies_dict[c['company_name']] = c['id']

    rows = []
    completed = 0
    datapoints = len(data)

    for item in data:
        row = {}

        dt = [int(i) for i in item['timestamp'].replace(
            '/', ' ').replace(':', ' ').split(' ')]
        dt_iso = datetime.datetime(
            dt[2], dt[0], dt[1], *dt[3:]).isoformat()
        row['created_at'] = dt_iso
        row['updated_at'] = dt_iso

        company_name = str(item['company']).strip().upper()
        row['company_id'] = companies_dict[company_name]

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

    print(f'COMPLETE. Pushed {datapoints} to levels table.')


def main():
    client = init_supabase_client()
    insert_data(client)


if __name__ == "__main__":
    main()
