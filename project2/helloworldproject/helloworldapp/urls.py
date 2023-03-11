from sys import path_hooks
from django.urls import path
from .views import helloworldfunc

urlpatterns = [
    path('helloworldapp/', helloworldfunc),
]
