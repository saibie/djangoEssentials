from src.settings import *

# ALLOWED_HOSTS = ['saibie.asuscomm.com',
#                  'saibie1677.hopto.org',
#                  'saibie1677.synology.me',
#                  '*.saibie1677.synology.me',
#                  '192.168.219.160',
#                  '127.0.0.1']
DEBUG = False
STATIC_ROOT = BASE_DIR / 'static_open/'
STATICFILES_DIRS = [BASE_DIR / 'static/']
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]
