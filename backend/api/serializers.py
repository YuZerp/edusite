from rest_framework import serializers
from .models import Application, Course, Teacher

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'name', 'phone', 'subject', 'grade', 'brief', 'created_at']
        read_only_fields = ['id', 'created_at']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'