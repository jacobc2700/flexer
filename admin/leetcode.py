# pip install supabase
# pip install python-dotenv

import os
import json
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()


def init_supabase_client():
    url: str = os.environ.get('SUPABASE_URL')
    key: str = os.environ.get('SUPABASE_KEY')
    client: Client = create_client(url, key)
    return client


def insert_levelsfyi_data(client: Client):
    file = open('./leetcode.json')

    data = json.load(file)

    rows = []
    completed = 0
    datapoints = len(data['stat_status_pairs'])

    for line in data['stat_status_pairs']:
        row = {}

        row['question_id'] = int(line['stat']['question_id'])
        row['question_title'] = str(line['stat']['question__title'])
        row['question_title_slug'] = str(line['stat']['question__title_slug'])
        row['total_accepted'] = int(line['stat']['total_acs'])
        row['total_submitted'] = int(line['stat']['total_submitted'])
        row['frontend_question_id'] = int(line['stat']['frontend_question_id'])
        row['difficulty'] = int(line['difficulty']['level'])
        row['paid_only'] = bool(line['paid_only'])

        rows.append(row)
        completed += 1

        print(f'{completed}/{datapoints}')

    file.close()

    batch_size = 5000
    for i in range(0, len(rows), batch_size):
        client.table('problems').insert(rows[i:i+batch_size]).execute()
        print(f'pushed rows {i}-{i+batch_size}')

    print(f'COMPLETE. Pushed {datapoints} to database.')


def main():
    client = init_supabase_client()
    insert_levelsfyi_data(client)


if __name__ == '__main__':
    main()
