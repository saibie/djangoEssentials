from django.shortcuts import render

# Create your views here.
def mainView(request):
    return render(request, 'main.html')

def page_not_found(request, exception):
    return render(request, 'common/404.html', {})

def internal_error(request, exception):
    return render(request, 'common/500.html', {})
