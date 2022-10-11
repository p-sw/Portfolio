from django.shortcuts import render
from .models import Projects

# Create your views here.
def index(request):
    return render(request, 'app/index.html')

def about(request):
    return render(request, 'app/about.html')

def projects(request):
    all_projects = Projects.objects.all().order_by('start_commit')
    return render(request, 'app/projects.html', {
        "projects": all_projects
    })

def contact(request):
    return render(request, 'app/contact.html')