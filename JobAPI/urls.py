from rest_framework import routers
from JobAPI.views import ApplicationViewSet, InterviewViewSet, UserViewSet
from django.urls import path, include



router = routers.DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='Application')
router.register(r'interviews', InterviewViewSet, basename='Interview')
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls))
]