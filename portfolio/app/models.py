from django.db import models

# Create your models here.
class ProjectDependencies(models.Model):
    name = models.CharField(max_length=20, unique=True, primary_key=True)
    icon = models.ImageField(upload_to='icons')

class Projects(models.Model):
    title = models.CharField(max_length=50)
    short_description = models.CharField(max_length=100)
    dependencies = models.ManyToManyField(ProjectDependencies)
    start_commit = models.DateField()
    last_commit = models.DateField()
    finished = models.BooleanField(default=False)