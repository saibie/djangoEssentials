## An initialized django project which is considered the production step
### SECRET_KEY in settings
It is better that the ```SECRET_KEY``` in ```source/settings/__init__.py``` is regenerated with in a new ```SECRET_KEY``` in ```source/settings.py``` which is generated executing the following command
```
django-admin startproject source .
```
in a new folder.
