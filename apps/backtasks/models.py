from django.db import models
from django.utils import timezone
from uuid import uuid4
import ast
from .utils.tools import import_function_by_string
import logging

logger = logging.getLogger('django')

# Create your models here.
class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=200)
    params = models.TextField()
    made_at = models.DateTimeField(auto_now_add=True)
    run_at = models.DateTimeField(null=True)
    
    class Meta:
        abstract = True

class WaitingTask(Task):
    def execute(self):
        '''
        WaitingTask의 name과 args, kwargs를 추출하고 해당 name의 함수를 찾아 직접 실행함.
        '''
        full_module = self.name
        args, kwargs = ast.literal_eval(self.params)
        func = import_function_by_string(full_module)
        func.execute(*args, **kwargs)
        
        ct = CompletedTask.objects.create(
            name=self.name,
            params=self.params,
            made_at=self.made_at,
            run_at=timezone.now())
        ct.save()
        logger.info('Task {} is completed.'.format(self.name))
        self.delete()

class CompletedTask(Task):
    pass
