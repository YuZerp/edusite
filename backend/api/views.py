from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Application, Course, Teacher
from .serializers import ApplicationSerializer, CourseSerializer, TeacherSerializer

@api_view(['POST'])
def submit_application(request):
    """Обработка заявки на пробный урок"""
    serializer = ApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': 'Заявка отправлена'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_courses(request):
    """Получение списка курсов"""
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_teachers(request):
    """Получение списка преподавателей"""
    teachers = Teacher.objects.all()
    serializer = TeacherSerializer(teachers, many=True)
    return Response(serializer.data)
