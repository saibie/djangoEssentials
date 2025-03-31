Start-Process python -ArgumentList "exec_back.py" -NoNewWindow -RedirectStandardOutput "logs/exec_back.log" -RedirectStandardError "logs/exec_back_error.log" -PassThru
python manage.py runserver