from django.db import models

from markdown2 import markdown

class Project(models.Model):
    href = models.CharField(max_length=20, unique=True, default='')
    title = models.CharField(max_length=20)
    short_description = models.CharField(max_length=100)
    main_content = models.TextField(default="full description with **[markdown](https://commonmark.org)**")
    content_as_markdown = models.TextField(editable=False, default="")
    start_commit = models.DateField()
    last_commit = models.DateField()

    def __str__(self):
        return str(self.title)

    def save(self, *args, **kwargs):
        self.content_as_markdown = markdown(self.main_content, extras=[
            "footnotes",
            "nofollow",
            "target-blank-links",
            "strike"
        ])
        super(Project, self).save(*args, **kwargs)