from rest_framework import serializers
from JobAPI.models import Application, Interview
from django.contrib.auth.models import User

class ChoiceField(serializers.ChoiceField):

    def to_representation(self, instance):
        return Application.STATUS_CHOICES[instance]

    def to_internal_value(self, data):
        for key, val in Application.STATUS_CHOICES.items():
            if val == data:
                return key

class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = ['id', 'scheduled_time', 'location', 'notes', 'application']

class ApplicationSerializer(serializers.ModelSerializer):
    interviews = InterviewSerializer(many=True, read_only=True)
    status = ChoiceField(choices=Application.STATUS_CHOICES)

    class Meta:
        model = Application
        fields = ['id', 'date_applied', 'job_title', 'employer', 'notes', 'followed_up', 'status', 'interviews']

class UserSerializer(serializers.ModelSerializer):
    applications = ApplicationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['applications']