from typing import Callable
from backtasks.models import WaitingTask
import functools

class HydraBackTask(object):
    '''
    backtask decorator에 사용되기 위해 만들어짐.
    Callable func는 func(*args, **kwargs)를 하면 원하는 결과가 나오지만
    이 class를 활용한 backtask decorator를 통과하며
    func의 모듈, 이름, args, kwargs만 WaitingTask에 넘기는 허수아비로 변경하며
    실제 작동은 execute() method에게 넘겨줌.
    
    **func의 머리(__call__)를 잘랐지만 다른 곳(execute)에서 다시 자라리라.**
    '''
    def __init__(
        self,
        func: Callable,
    ) -> None:
        self.func = func
        functools.update_wrapper(self, func)
        
    def __call__(self, *args, **kwargs) -> None:
        name = '{}.{}'.format(self.func.__module__, self.func.__name__)
        params = repr((args, kwargs))
        wt = WaitingTask.objects.create(name=name, params=params)
        wt.save()
        
    def execute(self, *args, **kwargs):
        result = self.func(*args, **kwargs)
        return result

def backtask(
    func: Callable,
) -> Callable:
    '''
    Decorator.
    함수의 이름과 입력값을 WaitingTask에 저장하는 함수로 바꿔치기 하고,
    execute() method를 call했을 때만, 원본 함수 내용을 실행하도록 바꿈.
    background에서 실행될 함수를 선언하는 데에 사용.
    '''
    wrapper = HydraBackTask(func)
    return wrapper

