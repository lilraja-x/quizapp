from django.urls import path
from . import views

urlpatterns = [
    path('quiz/', views.quiz, name='quiz'),
    path('send_results_email/', views.send_results_email, name='send_results_email'),
]
