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

    companies = set() # items to be inserted into companies table.

    # ---- Levels table code ---- 
    for item in data:
        companies.add(str(item['company']).strip().upper())

    file.close()

    rows = []

    for item in list(companies):
        rows.append({"company_name": item})

    batch_size = 5000
    for i in range(0, len(rows), batch_size):
        client.table('companies').insert(rows[i:i+batch_size]).execute()
        print(f'pushed rows {i}-{i+batch_size}')

    print(f'COMPLETE. Pushed {len(rows)} unique companies to companies table.')



def main():
    client = init_supabase_client()
    insert_data(client)


if __name__ == "__main__":
    main()