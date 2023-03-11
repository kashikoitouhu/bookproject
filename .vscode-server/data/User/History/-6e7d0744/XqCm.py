from django.urls import path
from . import views

urlpatterns = [
    path('book/',views.ListBookView.as_view()),
    path('book/detail/', views.DetailBookView.as_view()),
]
