# Production 단계를 고려하여 초기화된 django project 폴더
## settings의 SECRET_KEY
```source/settings/__init__.py```의 ```SECRET_KEY```는 다른 폴더에서
```
django-admin startproject source .
```
를 실행하여 ```source/settings.py```를 새로 생성하고 해당 파일의 ```SECRET_KEY```를 가져오는 게 좋을 듯 하다.

# Requirements
## pip
### WebSocket
```
'channels[daphne]'
channels_redis
```