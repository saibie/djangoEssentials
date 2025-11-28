from django import template

register = template.Library()

@register.filter
def korean_weekday(value):
    # 요일 목록 (월, 화, 수, 목, 금, 토, 일)
    weekdays = ["월", "화", "수", "목", "금", "토", "일"]
    # value가 날짜 객체인지 확인
    if hasattr(value, 'weekday'):
        return weekdays[value.weekday()]
    return ""
