from django.db import models

class Application(models.Model):

    STATUS_CHOICES = {
    "APL": "Applied",
    "INT": "Interview Booked",
    "SCS": "SUCCESSFUL",
    "UNS": "UNSUCCESSFUL"
    }
    
    date_applied = models.DateField()
    job_title = models.CharField(max_length = 32)
    employer = models.CharField(max_length = 32)
    notes = models.TextField()
    followed_up = models.BooleanField(default = False)
    status = models.CharField(max_length = 2, choices = STATUS_CHOICES, default="APL")

class Interview(models.Model):
    scheduled_time = models.DateTimeField()
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name = "interviews")