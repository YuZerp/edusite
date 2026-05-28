import { Teacher } from '@/types';

interface TeacherCardProps {
    teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-1">{teacher.name}</h3>
            <p className="text-blue-600 text-sm mb-2">
                Предметы: {teacher.subjects.join(", ")}
            </p>
            <p className="text-gray-500 text-sm mb-2">Опыт: {teacher.experience}</p>
            <p className="text-gray-700 mt-4">{teacher.bio}</p>
        </div>
    );
}