from source.settings import *

ALLOWED_HOSTS = ['127.0.0.1']
DEBUG = False
STATIC_ROOT = BASE_DIR / "static_open/"
STATICFILES_DIRS = [BASE_DIR / "static/"]
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]
