from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

# Create your views here.
def mainView(
    request: HttpRequest
) -> HttpResponse:
    '''
    메인 페이지 렌더

    Args:
        request (HttpRequest)

    Returns:
        HttpResponse
    '''
    return render(request, "main.html")

def page_not_found(
    request: HttpRequest, 
    exception
) -> HttpResponse:
    '''
    404 에러 대표 페이지 렌더

    Args:
        request (HttpRequest)
        exception (_type_)

    Returns:
        HttpResponse
    '''
    return render(request, "404.html", {})

def internal_error(
    request: HttpRequest
) -> HttpResponse:
    '''
    500 에러 대표 페이지 렌더

    Args:
        request (HttpRequest)

    Returns:
        HttpResponse
    '''
    return render(request, "500.html", {})
