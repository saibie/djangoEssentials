import markdown
from django import template
from django.utils.safestring import mark_safe

register = template.Library()


@register.filter
def mark(value):
    extensions = ["nl2br", "fenced_code", "sane_lists"]
    return mark_safe(markdown.markdown(value, extensions=extensions))


@register.filter
def order_by(queryset, order):
    return queryset.order_by(order)
