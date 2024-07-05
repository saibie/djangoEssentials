from typing import Callable
import importlib

def import_function_by_string(
    module_function_string: str
) -> Callable:
    '''
    It imports a function from a string.

    Parameters
    ----------
    module_function_string : str
        A dot combinationed string of a function.
        ex) module_function_string = "example_module.example_function"

    Returns
    -------
    Callable
        The imported function.
    '''
    module_name, function_name = module_function_string.rsplit('.', 1)
    module = importlib.import_module(module_name)
    function = getattr(module, function_name)
    return function