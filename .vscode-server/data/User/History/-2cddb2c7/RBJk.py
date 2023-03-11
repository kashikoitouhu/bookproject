from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView

from .views import SignupView

app_name = 'accounts'

urlpatterns = [
    path('login/', LogoutView.as_view(), name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('logout/', views.logout_view, name='logout'),
]
