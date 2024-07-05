import os, django, importlib, time, ast, traceback
from typing import Callable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'source.settings')
django.setup()
import logging
from django.utils import timezone
from django.db.models import Q

logger = logging.getLogger()
logger.setLevel(logging.INFO)

handler = logging.StreamHandler()
logger.addHandler(handler)

from backtasks.models import WaitingTask, CompletedTask

# Server Start Step: Custom Area


# Repeatation Step
while True:
    time.sleep(1)
    wts = WaitingTask.objects.all()
    if wts:
        wt = WaitingTask.objects.order_by('made_at')[0]
        wt.execute()
    else:
        time.sleep(10)