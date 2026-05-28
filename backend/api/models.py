from django.db import models

class Application(models.Model):
    """Модель заявки на пробный урок"""
    SUBJECT_CHOICES = [
        ('Математика', 'Математика'),
        ('Русский язык', 'Русский язык'),
        ('Обществознание', 'Обществознание'),
        ('Физика', 'Физика'),
        ('Информатика', 'Информатика'),
        ('Английский язык', 'Английский язык'),
        ('Химия', 'Химия'),
        ('Биология', 'Биология'),
        ('История', 'История'),
        ('Литература', 'Литература'),
    ]
    
    GRADE_CHOICES = [
        ('9', '9 класс'),
        ('10', '10 класс'),
        ('11', '11 класс'),
    ]
    
    name = models.CharField(max_length=100, verbose_name='Имя')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES, verbose_name='Предмет')
    grade = models.CharField(max_length=2, choices=GRADE_CHOICES, verbose_name='Класс')
    brief = models.TextField(blank=True, verbose_name='Пожелания')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    
    def __str__(self):
        return f'{self.name} - {self.subject} ({self.created_at})'
    
    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        ordering = ['-created_at']


class Course(models.Model):
    """Модель курса"""
    title = models.CharField(max_length=200, verbose_name='Название')
    subject = models.CharField(max_length=50, verbose_name='Предмет')
    duration = models.CharField(max_length=50, verbose_name='Длительность')
    price = models.IntegerField(verbose_name='Стоимость')
    description = models.TextField(verbose_name='Описание')
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Курс'
        verbose_name_plural = 'Курсы'


class Teacher(models.Model):
    """Модель преподавателя"""
    name = models.CharField(max_length=100, verbose_name='ФИО')
    subjects = models.CharField(max_length=200, verbose_name='Предметы')
    experience = models.CharField(max_length=50, verbose_name='Опыт')
    bio = models.TextField(verbose_name='Биография')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Преподаватель'
        verbose_name_plural = 'Преподаватели'
