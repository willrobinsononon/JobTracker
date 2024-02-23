from rest_framework import serializers
from JobAPI.models import Application, Interview
from django.contrib.auth.models import User

class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = ['scheduled_time', 'location']

class ApplicationSerializer(serializers.ModelSerializer):
    interviews = InterviewSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        fields = ['job_title', 'employer', 'notes', 'followed_up', 'status', 'interviews']

class UserSerializer(serializers.ModelSerializer):
    applications = ApplicationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['applications']