from django.db import models


class Project(models.Model):
    href = models.CharField(max_length=20, unique=True, default='')
    title = models.CharField(max_length=20)
    short_description = models.CharField(max_length=100)
    start_commit = models.DateField()
    last_commit = models.DateField()

    def __str__(self):
        return str(self.title)

    def as_dictionary(self):
        return {
            "href": self.href,
            "title": self.title,
            "short_description": self.short_description,
            "start_commit": self.start_commit.strftime("%Y-%m-%d"),
            "last_commit": self.last_commit.strftime("%Y-%m-%d")
        }