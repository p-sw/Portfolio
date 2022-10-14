FROM python:3.10.7-alpine3.15

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=portfolio.settings.prod

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY . /app/

RUN python manage.py collectstatic --noinput
RUN python manage.py migrate

EXPOSE 5000