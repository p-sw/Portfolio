app_name = 'app'

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('projects', views.projects, name='projects'),
    path('contact', views.ContactView.as_view(), name='contact'),
    path('thanks', views.contact_success, name='thanks'),
]