app_name = 'app'

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('projects', views.projects, name='projects'),
    path('projects/<str:project_id>', views.get_project, name='get_project'),
    path('project-list', views.get_project_list, name='get_project_list'),
    path('contact', views.ContactView.as_view(), name='contact'),
    path('thanks', views.contact_success, name='thanks'),
]