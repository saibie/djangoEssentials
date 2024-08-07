from source.settings import *

ALLOWED_HOSTS = ['127.0.0.1']
DEBUG = False
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('127.0.0.1', 6379)],
        },
    },
}
STATIC_ROOT = BASE_DIR / "static_open/"
STATICFILES_DIRS = [BASE_DIR / "static/"]
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]
