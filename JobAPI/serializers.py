from rest_framework import serializers
from JobAPI.models import Application, Interview
from django.contrib.auth.models import User

class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = ['id', 'scheduled_time', 'location', 'notes']

class ApplicationSerializer(serializers.ModelSerializer):
    interviews = InterviewSerializer(many=True, read_only=True)
    status = serializers.CharField(source='get_status_display')

    class Meta:
        model = Application
        fields = ['id', 'date_applied', 'job_title', 'employer', 'notes', 'followed_up', 'status', 'interviews']

class UserSerializer(serializers.ModelSerializer):
    applications = ApplicationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['applications']