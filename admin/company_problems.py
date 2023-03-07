import os
import json
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()


def init_supabase_client():
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    client: Client = create_client(url, key)
    return client


def insert_data(client: Client):


    num_problems = client.table('problems').select('id', count='exact').execute().count
    problems = []
    for n in range(0, num_problems, 1000):
        problems = problems + client.table('problems').select('id, question_title_slug').range(n, n+1000).execute().data
    problems_dict = {}
    for r in problems:
        problems_dict[str(r['question_title_slug']).strip()] = str(r['id']).strip()

    num_companies = client.table('companies').select('id', count='exact').execute().count
    companies = []
    for n in range(0, num_companies, 1000):
        companies = companies + client.table('companies').select('id, company_name').range(n, n+1000).execute().data
    companies_dict = {}
    for r in companies:
        companies_dict[r['company_name']] = r['id']

    company_problems = []

    with open('./company_problems.csv') as file:
        file.readline()
        for line in file:
            line = line.split(',')
            slug = line[0].split('/')[-2].strip()
            company = line[-2].upper().strip()

            problem_id = problems_dict.get(slug)
            company_id = companies_dict.get(company)

            if company_id == None:
                data = client.table('companies').insert({"company_name": company}).execute().data
                companies_dict[company] = data[0]['id']
                company_id = data[0]['id']

            company_problems.append({'problem_id': problem_id, 'company_id': company_id})

    batch_size = 5000
    for i in range(0, len(company_problems), batch_size):
        client.table('company_problems').insert(company_problems[i:i+batch_size]).execute()
        print(f'pushed rows {i}-{i+batch_size}')

    print(f'COMPLETE. Pushed {len(company_problems)} rows to company_problems table.')
    
    return

    companies = set()  # items to be inserted into companies table.

    # ---- Levels table code ----
    for item in data:
        companies.add(str(item['company']).strip().upper())

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
