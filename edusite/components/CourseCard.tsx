import { Course } from '@/types';

interface CourseCardProps {
    course: Course;
    onRequest: () => void;
}

export default function CourseCard({ course, onRequest }: CourseCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="space-y-2 text-sm text-gray-500 mb-4">
                <p>📚 Длительность: {course.duration}</p>
                <p>💰 Стоимость: {course.price} ₽ / месяц</p>
            </div>
            <button
                onClick={onRequest}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Записаться на пробный урок
            </button>
        </div>
    );
}