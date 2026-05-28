"use client";

import { useState } from "react";
import TeacherCard from "@/components/TeacherCard";
import RequestModal from "@/components/RequestModal";
import { teachers } from "@/data";

export default function TeachersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Наши преподаватели</h1>
            <div className="grid md:grid-cols-2 gap-6">
                {teachers.map((teacher) => (
                    <TeacherCard key={teacher.id} teacher={teacher} />
                ))}
            </div>
            <div className="text-center mt-12">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
                >
                    Записаться на пробный урок
                </button>
            </div>
            <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}