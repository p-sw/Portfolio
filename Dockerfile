FROM python:3.10.7

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=portfolio.settings.prod

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY ./portfolio /app/
COPY docker-entrypoint.sh /app

RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 5000
