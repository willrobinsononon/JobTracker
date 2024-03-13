from django.db import models

class Application(models.Model):

    STATUS_CHOICES = {
    "APL": "Applied",
    "INT": "Interview Booked",
    "SCS": "Successful",
    "UNS": "Unsuccessful"
    }
    
    date_applied = models.DateField()
    job_title = models.CharField(max_length = 32)
    employer = models.CharField(max_length = 32)
    notes = models.TextField(blank=True)
    followed_up = models.BooleanField(default = False)
    status = models.CharField(max_length = 3, choices = STATUS_CHOICES, default="APL")
    owner = models.ForeignKey('auth.User', related_name='applications', on_delete=models.CASCADE)

class Interview(models.Model):
    scheduled_time = models.DateTimeField()
    location = models.CharField(max_length = 128)
    notes = models.TextField(blank=True)
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name = "interviews")

