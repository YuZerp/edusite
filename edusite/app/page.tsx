"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import RequestModal from "@/components/RequestModal";  // ← добавить
import { courses } from "@/data";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");

    const handleRequest = (subject?: string) => {
        setSelectedSubject(subject || "");
        setIsModalOpen(true);
    };

    return (
        <>
            <HeroSection onRequest={() => handleRequest()} />
            
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Наши курсы</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onRequest={() => handleRequest(course.subject)}
                        />
                    ))}
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Почему выбирают нас?</h2>
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                        <div className="p-6">
                            <div className="text-4xl mb-3">🎓</div>
                            <h3 className="text-xl font-bold mb-2">Опытные преподаватели</h3>
                            <p className="text-gray-600">Эксперты ЕГЭ со стажем от 5 лет</p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl mb-3">📊</div>
                            <h3 className="text-xl font-bold mb-2">Индивидуальный подход</h3>
                            <p className="text-gray-600">Программа под каждого ученика</p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl mb-3">🏆</div>
                            <h3 className="text-xl font-bold mb-2">Высокие результаты</h3>
                            <p className="text-gray-600">90+ баллов у 85% выпускников</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Добавить модальное окно */}
            <RequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                preselectedSubject={selectedSubject}
            />
        </>
    );
}