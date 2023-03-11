from sys import path_hooks
from django.urls import path
from .views import helloworldunc

urlpatterns = [
    path('helloworldapp/', helloworldunc),
]
