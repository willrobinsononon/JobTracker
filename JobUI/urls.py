from django.urls import path
from JobUI.views import app

urlpatterns = [
    path('', app)
]
