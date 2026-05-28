from django.core.management.base import BaseCommand
from api.models import Course, Teacher

class Command(BaseCommand):
    help = 'Заполняет базу данных начальными данными'

    def handle(self, *args, **kwargs):
        # Курсы
        courses_data = [
            {'title': 'Подготовка к ЕГЭ по математике', 'subject': 'Математика', 'duration': '8 месяцев', 'price': 4500, 'description': 'Интенсивная подготовка к профильному ЕГЭ'},
            {'title': 'Подготовка к ЕГЭ по русскому языку', 'subject': 'Русский язык', 'duration': '8 месяцев', 'price': 4200, 'description': 'Сочинения, изложения, тестовая часть'},
            {'title': 'Подготовка к ОГЭ по математике', 'subject': 'Математика', 'duration': '6 месяцев', 'price': 3800, 'description': 'Базовый курс для успешной сдачи ОГЭ'},
            {'title': 'Подготовка к ЕГЭ по обществознанию', 'subject': 'Обществознание', 'duration': '8 месяцев', 'price': 4200, 'description': 'Теория, практика, разбор сложных тем'},
        ]
        
        for course_data in courses_data:
            Course.objects.get_or_create(title=course_data['title'], defaults=course_data)
        
        # Преподаватели
        teachers_data = [
            {'name': 'Анна Сергеевна Иванова', 'subjects': 'Математика, Физика', 'experience': '10 лет', 'bio': 'Эксперт ЕГЭ, кандидат физико-математических наук'},
            {'name': 'Мария Владимировна Петрова', 'subjects': 'Русский язык, Литература', 'experience': '8 лет', 'bio': 'Эксперт по проверке сочинений ЕГЭ'},
        ]
        
        for teacher_data in teachers_data:
            Teacher.objects.get_or_create(name=teacher_data['name'], defaults=teacher_data)
        
        self.stdout.write(self.style.SUCCESS('База данных успешно заполнена!'))