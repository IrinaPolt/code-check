#!/bin/bash

sleep 10

python manage.py makemigrations users
python manage.py makemigrations filemanagement

python manage.py migrate

python manage.py collectstatic --noinput

exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 4 --threads 4