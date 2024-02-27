from django.shortcuts import render
from JobAPI.models import Application, Interview
from JobAPI.serializers import ApplicationSerializer, InterviewSerializer, UserSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        return self.request.user.applications.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        

class InterviewViewSet(viewsets.ModelViewSet):
    #queryset = Interview.objects.all()
    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        applications = self.request.user.applications.all()
        return Interview.objects.filter(application__in=applications)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated,]