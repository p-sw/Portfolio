from .base import *

from secrets import token_hex

SECRET_KEY = token_hex(50)

DEBUG = False
ALLOWED_HOSTS = []