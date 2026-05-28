from django.urls import path
from . import views

urlpatterns = [
    path('submit-request/', views.submit_application, name='submit-application'),
    path('courses/', views.get_courses, name='get-courses'),
    path('teachers/', views.get_teachers, name='get-teachers'),
]