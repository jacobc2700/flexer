from dataclasses import field
from supabase import create_client, Client
from dotenv import load_dotenv
import os
from logging import Logger
import logging.config

from supabase import __version__
from supabase.lib.client_options import ClientOptions

load_dotenv()
DEFAULT_HEADERS = {"X-Client-Info": f"supabase-py/{__version__}"}
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
object = ClientOptions()
# object['schema'] = 'next_auth'
object.schema = 'next_auth'
auth_supabase: Client = create_client(url, key, object)

logging.config.dictConfig({
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {
            'format': '%(name)-12s %(levelname)-8s %(message)s'
        },
        'file': {
            'format': '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console'
        },
        # 'file': {
        #     'level': 'DEBUG',
        #     'class': 'logging.FileHandler',
        #     'formatter': 'file',
        #     # 'filename': './tmp/debug.log'
        # }
    },
    'loggers': {
        '': {
            'level': 'DEBUG',
            'handlers': ['console']
            # 'handlers': ['console', 'file']
        }
    }
})

# This retrieves a Python logging instance (or creates it)
logger: Logger = logging.getLogger(__name__)