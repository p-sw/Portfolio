from django.db import models

# Create your models here.
class ProjectDependency(models.Model):
    name = models.CharField(max_length=20, unique=True, primary_key=True)
    icon = models.ImageField(upload_to='icons')
    
    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=50)
    short_description = models.CharField(max_length=100)
    dependencies = models.ManyToManyField(ProjectDependency)
    start_commit = models.DateField()
    last_commit = models.DateField()
    finished = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title