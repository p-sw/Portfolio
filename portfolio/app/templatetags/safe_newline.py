from django import template

register = template.Library()


@register.filter
def safe_newline(value):
    return value.replace("\n", "\\n")
