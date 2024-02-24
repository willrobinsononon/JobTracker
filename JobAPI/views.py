from django.shortcuts import render
from JobAPI.models import Application, Interview
from JobAPI.serializers import ApplicationSerializer, InterviewSerializer, UserSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User

# Create your views here.

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class InterviewViewSet(viewsets.ModelViewSet):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer